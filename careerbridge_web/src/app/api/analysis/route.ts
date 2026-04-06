import { NextResponse } from 'next/server';
import { buildLocalAnalysisReport } from '@/lib/analysis-engine';
import { createEmptyAnalysisSession, type AnalysisSession } from '@/lib/analysis-session';

const DEFAULT_BASE_URL = 'https://free.v36.cm/v1';
const DEFAULT_MODEL = 'gpt-4o-mini';

type AiResponsePayload = {
  summary?: string;
  strengths?: string[];
  resumeGaps?: string[];
  highlights?: string[];
  suitableRoles?: string[];
  nextSteps?: Array<{
    action?: string;
    priority?: 'high' | 'medium' | 'low';
    timeEstimate?: string;
    resource?: string;
  }>;
};

function extractJson(text: string) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i);
  const raw = fencedMatch?.[1] ?? text;
  return JSON.parse(raw) as AiResponsePayload;
}

async function enrichWithAi(session: AnalysisSession) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) return null;

  const baseUrl = (process.env.AI_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
  const model = process.env.AI_MODEL || DEFAULT_MODEL;
  const localReport = buildLocalAnalysisReport(session);

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: '你是台灣青年求職平台的職涯分析助手。請根據提供資料輸出 JSON，不能有其他文字。',
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: '請補強這份分析摘要，回傳 JSON 格式：summary, strengths, resumeGaps, highlights, suitableRoles, nextSteps。',
            constraints: {
              summary: '1 句，60 字內',
              strengths: '3 到 5 項',
              resumeGaps: '3 到 5 項',
              highlights: '3 項',
              suitableRoles: '3 到 5 項',
              nextSteps: '3 項，每項含 action、priority、timeEstimate，可選 resource',
            },
            session,
            localReport,
          }),
        },
      ],
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`AI upstream error: ${response.status}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('AI response is empty');
  }

  return {
    payload: extractJson(content),
    providerLabel: `${model} @ ${baseUrl}`,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const session = createEmptyAnalysisSession(body?.session as Partial<AnalysisSession>);
    const localReport = buildLocalAnalysisReport(session);

    try {
      const ai = await enrichWithAi(session);

      if (ai) {
        return NextResponse.json({
          report: {
            ...localReport,
            summary: ai.payload.summary || localReport.summary,
            strengths: ai.payload.strengths?.length ? ai.payload.strengths : localReport.strengths,
            resumeGaps: ai.payload.resumeGaps?.length ? ai.payload.resumeGaps : localReport.resumeGaps,
            highlights: ai.payload.highlights?.length ? ai.payload.highlights : localReport.highlights,
            suitableRoles: ai.payload.suitableRoles?.length ? ai.payload.suitableRoles : localReport.suitableRoles,
            nextSteps: ai.payload.nextSteps?.length
              ? ai.payload.nextSteps.map((step) => ({
                  action: step.action || '整理下一步',
                  priority: step.priority || 'medium',
                  timeEstimate: step.timeEstimate || '30 分鐘',
                  resource: step.resource,
                }))
              : localReport.nextSteps,
          },
          provider: {
            mode: 'live',
            label: ai.providerLabel,
          },
        });
      }
    } catch (error) {
      return NextResponse.json({
        report: localReport,
        provider: {
          mode: 'fallback',
          label: error instanceof Error ? error.message : 'AI unavailable',
        },
      });
    }

    return NextResponse.json({
      report: localReport,
      provider: {
        mode: 'fallback',
        label: 'AI_API_KEY 尚未設定，使用本地分析',
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: '無法解析分析資料',
      },
      { status: 400 }
    );
  }
}
