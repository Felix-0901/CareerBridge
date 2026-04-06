'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
  ArrowRight, Target, FileText, AlertTriangle, TrendingUp,
  CheckCircle, Sparkles, Edit3, Calendar, BriefcaseBusiness
} from 'lucide-react';
import { buildLocalAnalysisReport, type AnalysisReport } from '@/lib/analysis-engine';
import {
  createEmptyAnalysisSession,
  loadAnalysisSession,
  type AnalysisSession,
} from '@/lib/analysis-session';
import styles from './page.module.css';

export default function AnalysisPage() {
  const [session, setSession] = useState<AnalysisSession | null>(null);
  const [report, setReport] = useState<AnalysisReport>(buildLocalAnalysisReport(null));
  const [provider, setProvider] = useState<{ mode: string; label: string }>({
    mode: 'fallback',
    label: '使用本地示範資料',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = loadAnalysisSession() ?? createEmptyAnalysisSession();
    setSession(storedSession);

    let cancelled = false;

    async function loadReport() {
      try {
        const response = await fetch('/api/analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session: storedSession }),
        });

        if (!response.ok) {
          throw new Error('analysis request failed');
        }

        const data = await response.json();
        if (!cancelled) {
          setReport(data.report);
          setProvider(data.provider ?? { mode: 'fallback', label: '使用本地分析' });
        }
      } catch {
        if (!cancelled) {
          setReport(buildLocalAnalysisReport(storedSession));
          setProvider({ mode: 'fallback', label: '分析服務暫時不可用，已切回本地分析' });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadReport();

    return () => {
      cancelled = true;
    };
  }, []);

  const topJobs = report.recommendedJobs.slice(0, 3);
  const isExploreMode = session?.source === 'explore';

  return (
    <div className={styles.container}>
      <div className="page-container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="section-label">{report.modeLabel}</span>
          <h1>你的職涯輪廓</h1>
          <p className={styles.headerDesc}>
            {report.summary}
          </p>
        </motion.div>

        <motion.div
          className={`card ${styles.insightBanner}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className={styles.insightCopy}>
            <h3>{isExploreMode ? '探索完成後，現在就能直接開始投遞規劃' : '分析結果已更新'}</h3>
            <p>
              {isExploreMode
                ? '這份是依照你剛完成的探索結果建立的初步分析，下一步可直接看推薦職缺；想讓匹配更準，再補上履歷即可。'
                : '這份分析已依你目前提供的資料重算，推薦職缺、技能差距與下一步行動會同步更新。'}
            </p>
          </div>
          <div className={styles.insightMeta}>
            <span className={`tag ${provider.mode === 'live' ? 'tag-success' : 'tag-warning'}`}>
              {provider.mode === 'live' ? 'AI 已連線' : loading ? '分析中' : '本地 fallback'}
            </span>
            <span className={styles.providerLabel}>{provider.label}</span>
            {isExploreMode && (
              <Link href="/upload" className="btn btn-secondary btn-sm">
                補上履歷
              </Link>
            )}
          </div>
        </motion.div>

        <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            {/* Radar Chart */}
            <motion.div
              className={`card ${styles.radarCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3><Target size={20} /> 能力雷達圖</h3>
              <div className={styles.chartWrap}>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={report.radarData}>
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'var(--color-text-light)', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="var(--color-primary)"
                      fill="var(--color-primary)"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              className={`card ${styles.skillsCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3><CheckCircle size={20} /> 你的技能標籤</h3>
              <div className={styles.tags}>
                {report.skills.map((skill, i) => (
                  <span key={i} className="tag tag-primary">{skill}</span>
                ))}
              </div>
            </motion.div>

            {/* Resume Completeness */}
            <motion.div
              className={`card ${styles.completeCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.completeHeader}>
                <h3><FileText size={20} /> 履歷完成度</h3>
                <span className={styles.completePercent}>{report.resumeCompleteness}%</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 'var(--space-lg)' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${report.resumeCompleteness}%` }}
                />
              </div>
              <h5 style={{ marginBottom: 'var(--space-sm)' }}>
                <AlertTriangle size={16} color="var(--color-warning)" /> 待改善項目
              </h5>
              <ul className={styles.gapList}>
                {report.resumeGaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
              <Link href="/resume" className="btn btn-sm btn-secondary" style={{ marginTop: 'var(--space-md)' }}>
                <Edit3 size={14} /> 前往優化履歷
              </Link>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className={styles.rightCol}>
            {/* Strengths */}
            <motion.div
              className={`card ${styles.strengthCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3><Sparkles size={20} /> 你的優勢</h3>
              <div className={styles.strengthList}>
                {report.strengths.map((s, i) => (
                  <div key={i} className={styles.strengthItem}>
                    <CheckCircle size={16} color="var(--color-cta)" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Suitable Roles */}
            <motion.div
              className={`card ${styles.rolesCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h3><Target size={20} /> 適合的職務方向</h3>
              <div className={styles.rolesList}>
                {report.suitableRoles.map((role, i) => (
                  <div key={i} className={styles.roleItem}>
                    <span className={styles.roleRank}>#{i + 1}</span>
                    <span>{role}</span>
                  </div>
                ))}
              </div>
              <div className={styles.recommendedJobList}>
                {topJobs.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`} className={styles.recommendedJobItem}>
                    <div>
                      <strong>{job.title}</strong>
                      <p>{job.company}</p>
                    </div>
                    <span className={styles.recommendedScore}>{job.personalizedScore}%</span>
                  </Link>
                ))}
              </div>
              <Link href="/jobs" className="btn btn-sm btn-primary" style={{ marginTop: 'var(--space-md)', width: '100%' }}>
                直接查看推薦職缺 <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Highlights */}
            <motion.div
              className={`card ${styles.highlightCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h3><TrendingUp size={20} /> 經歷亮點</h3>
              <div className={styles.highlightList}>
                {report.highlights.map((h, i) => (
                  <div key={i} className={styles.highlightItem}>
                    <div className={styles.highlightDot} />
                    <p>{h}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              className={`card card-featured ${styles.nextStepsCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <h3><Calendar size={20} /> 建議下一步</h3>
              <div className={styles.stepsList}>
                {report.nextSteps.map((step, i) => (
                  <div key={i} className={styles.nextStepItem}>
                    <div className={styles.nextStepPriority}>
                      <span className={`tag tag-${step.priority === 'high' ? 'danger' : step.priority === 'medium' ? 'warning' : 'primary'}`}>
                        {step.priority === 'high' ? '優先' : step.priority === 'medium' ? '建議' : '選做'}
                      </span>
                    </div>
                    <div className={styles.nextStepInfo}>
                      <p className={styles.nextStepAction}>{step.action}</p>
                      <span className={styles.nextStepTime}>預估 {step.timeEstimate}</span>
                      {step.resource && (
                        <span className={styles.nextStepResource}>→ {step.resource}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="btn btn-sm btn-secondary" style={{ marginTop: 'var(--space-md)' }}>
                <BriefcaseBusiness size={14} /> 查看求職進度
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
