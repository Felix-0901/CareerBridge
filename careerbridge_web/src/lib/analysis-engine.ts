import { jobs, type Job } from '@/data/jobs';
import {
  createEmptyAnalysisSession,
  type AnalysisSession,
  type JobGoalId,
  type UserTypeId,
} from '@/lib/analysis-session';

export interface DerivedNextStep {
  action: string;
  priority: 'high' | 'medium' | 'low';
  timeEstimate: string;
  resource?: string;
}

export interface PersonalizedJob extends Job {
  personalizedScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  fitReasons: string[];
}

export interface AnalysisReport {
  summary: string;
  modeLabel: string;
  profileLabel: string;
  skills: string[];
  interests: string[];
  radarData: Array<{ subject: string; value: number; fullMark: number }>;
  strengths: string[];
  suitableRoles: string[];
  resumeCompleteness: number;
  resumeGaps: string[];
  highlights: string[];
  nextSteps: DerivedNextStep[];
  recommendedJobs: PersonalizedJob[];
}

const interestKeywords: Record<string, string[]> = {
  '科技業': ['資訊科技', '前端', '數據', '科技', '軟體', '智慧城市'],
  '設計創意': ['設計', 'UI', 'UX', '創意', 'Figma'],
  '行銷廣告': ['行銷', '社群', '內容', '品牌', '廣告'],
  '金融業': ['金融', '數據', '分析'],
  '媒體傳播': ['影片', '媒體', '內容', '傳播', '剪輯'],
  '教育培訓': ['教育', '課程', '教學'],
  '社會服務': ['公共服務', '服務', '青年', '公益'],
  '非營利組織': ['非營利', '社群', '公益'],
  '政府機關': ['政府', '公共服務', '就業服務'],
  '新創企業': ['新創', '科技', '創業'],
};

const jobGoalToType: Record<JobGoalId, Job['type']> = {
  internship: '實習',
  parttime: '兼職',
  fulltime: '正職',
};

const userTypeLabels: Record<UserTypeId, string> = {
  highschool: '高中生',
  college: '大學生',
  fresh: '社會新鮮人',
};

const modeLabels: Record<AnalysisSession['source'], string> = {
  demo: '示範模式',
  explore: '探索分析',
  upload: '履歷上傳分析',
  manual: '手動資料分析',
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalizeValue(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

function splitManualSkills(value: string) {
  return value
    .split(/[\n,，、/]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function includesLoosely(source: string, target: string) {
  const normalizedSource = normalizeValue(source);
  const normalizedTarget = normalizeValue(target);
  return normalizedSource.includes(normalizedTarget) || normalizedTarget.includes(normalizedSource);
}

export function getSessionSkills(session: AnalysisSession) {
  return Array.from(
    new Set([
      ...session.selectedSkills,
      ...splitManualSkills(session.manualData.skills),
    ])
  );
}

export function getSessionInterests(session: AnalysisSession) {
  const items = [...session.selectedInterests];
  if (session.preferences.industry) items.push(session.preferences.industry);
  return Array.from(new Set(items.filter(Boolean)));
}

function hasRelevantInterest(job: Job, interests: string[]) {
  const haystack = `${job.title} ${job.company} ${job.industry} ${job.plainDescription}`;
  return interests.some((interest) => {
    const keywords = interestKeywords[interest] ?? [interest];
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}

export function personalizeJobs(session: AnalysisSession | null): PersonalizedJob[] {
  const activeSession = session ?? createEmptyAnalysisSession();
  const skills = getSessionSkills(activeSession);
  const interests = getSessionInterests(activeSession);
  const wantedType = activeSession.jobGoal ? jobGoalToType[activeSession.jobGoal] : null;

  return jobs
    .map((job) => {
      const matchedSkills = job.requiredSkills.filter((required) =>
        skills.some((skill) => includesLoosely(skill, required))
      );
      const missingSkills = job.requiredSkills.filter((required) =>
        !skills.some((skill) => includesLoosely(skill, required))
      );
      const bonusMatches = job.bonusSkills.filter((required) =>
        skills.some((skill) => includesLoosely(skill, required))
      );
      const reasons: string[] = [];
      let score = job.matchScore ?? 60;

      if (matchedSkills.length > 0) {
        reasons.push(`已具備 ${matchedSkills.slice(0, 2).join('、')} 等核心技能`);
      }

      if (wantedType) {
        if (job.type === wantedType) {
          score += 8;
          reasons.push(`符合你目前想找的${job.type}類型`);
        } else {
          score -= 8;
        }
      }

      if (hasRelevantInterest(job, interests)) {
        score += 8;
        reasons.push('與你選擇的興趣領域相近');
      }

      score += matchedSkills.length * 5;
      score += bonusMatches.length * 2;
      score -= missingSkills.length * 2;

      if (activeSession.preferences.commute === 'remote') {
        if (job.location.includes('遠端') || job.workSchedule.includes('遠端')) {
          score += 5;
          reasons.push('通勤偏好與遠端條件吻合');
        } else {
          score -= 5;
        }
      }

      if (activeSession.preferences.schedule === 'weekday' && job.workSchedule.includes('週一至週五')) {
        score += 3;
      }

      if (activeSession.preferences.schedule === 'flexible' && job.workSchedule.includes('彈性')) {
        score += 3;
      }

      if (activeSession.userType !== 'fresh' && job.beginnerFriendly) {
        score += 3;
      }

      if (!reasons.length) {
        reasons.push('與你目前條件有一定重疊，可作為下一步練習目標');
      }

      return {
        ...job,
        personalizedScore: clamp(Math.round(score), 35, 98),
        matchedSkills,
        missingSkills,
        fitReasons: reasons.slice(0, 3),
      };
    })
    .sort((a, b) => b.personalizedScore - a.personalizedScore);
}

function getProfileLabel(userType: AnalysisSession['userType']) {
  return userType ? userTypeLabels[userType] : '青年求職者';
}

function buildRadarData(skills: string[], interests: string[], session: AnalysisSession) {
  const scores = {
    technical: 35,
    communication: 40,
    planning: 35,
    design: 30,
    analysis: 35,
    leadership: 32,
  };

  skills.forEach((skill) => {
    const normalized = normalizeValue(skill);
    if (['python', 'javascript', 'typescript', 'react', 'html', 'css', 'sql', 'excel'].some((item) => normalized.includes(item))) {
      scores.technical += 9;
    }
    if (['溝通', '文案', '簡報', '客服', '社群'].some((item) => skill.includes(item))) {
      scores.communication += 8;
    }
    if (['專案', '活動', 'notion', 'jira', '企劃'].some((item) => skill.includes(item) || normalized.includes(item))) {
      scores.planning += 8;
    }
    if (['figma', 'canva', '設計', 'photoshop', 'illustrator'].some((item) => normalized.includes(item) || skill.includes(item))) {
      scores.design += 9;
    }
    if (['數據', '分析', 'excel', 'sql', 'python'].some((item) => normalized.includes(item) || skill.includes(item))) {
      scores.analysis += 9;
    }
    if (['領導', '協調', '主動', '社團'].some((item) => skill.includes(item))) {
      scores.leadership += 7;
    }
  });

  if (session.manualData.experience) {
    scores.communication += 6;
    scores.planning += 6;
  }

  if (session.manualData.projects) {
    scores.analysis += 5;
    scores.leadership += 5;
  }

  if (interests.includes('設計創意')) scores.design += 8;
  if (interests.includes('科技業')) scores.technical += 8;
  if (interests.includes('行銷廣告')) scores.communication += 8;
  if (interests.includes('金融業')) scores.analysis += 8;

  return [
    { subject: '技術能力', value: clamp(scores.technical, 35, 95), fullMark: 100 },
    { subject: '溝通表達', value: clamp(scores.communication, 35, 95), fullMark: 100 },
    { subject: '活動企劃', value: clamp(scores.planning, 35, 95), fullMark: 100 },
    { subject: '設計能力', value: clamp(scores.design, 30, 95), fullMark: 100 },
    { subject: '分析能力', value: clamp(scores.analysis, 30, 95), fullMark: 100 },
    { subject: '領導能力', value: clamp(scores.leadership, 30, 95), fullMark: 100 },
  ];
}

export function buildLocalAnalysisReport(session: AnalysisSession | null): AnalysisReport {
  const activeSession = session ?? createEmptyAnalysisSession();
  const skills = getSessionSkills(activeSession);
  const interests = getSessionInterests(activeSession);
  const recommendedJobs = personalizeJobs(activeSession);
  const topJobs = recommendedJobs.slice(0, 3);
  const aggregatedMissingSkills = Array.from(
    new Set(topJobs.flatMap((job) => job.missingSkills))
  ).slice(0, 4);
  const resumeCompleteness = clamp(
    38 +
      (activeSession.uploadedFileName ? 18 : 0) +
      (activeSession.manualData.education ? 12 : 0) +
      (activeSession.manualData.experience ? 12 : 0) +
      (activeSession.manualData.skills ? 10 : 0) +
      (activeSession.manualData.projects ? 8 : 0) +
      (activeSession.selectedInterests.length > 0 ? 6 : 0) +
      (activeSession.selectedSkills.length > 0 ? 8 : 0),
    42,
    92
  );
  const strengths = Array.from(
    new Set([
      ...skills.slice(0, 4),
      ...topJobs.flatMap((job) => job.fitReasons),
    ])
  ).slice(0, 5);
  const suitableRoles = Array.from(
    new Set(topJobs.map((job) => job.title.replace(/實習生|助理|專員/g, '').trim() || job.title))
  ).slice(0, 4);
  const resumeGaps = [
    !activeSession.manualData.experience && !activeSession.uploadedFileName ? '尚未提供完整經歷內容，履歷亮點不足' : '',
    !activeSession.manualData.projects ? '可補上專題、競賽或作品集，提高說服力' : '',
    aggregatedMissingSkills[0] ? `若想投遞理想職缺，建議先補強 ${aggregatedMissingSkills[0]}` : '',
    aggregatedMissingSkills[1] ? `履歷中可更明確呈現 ${aggregatedMissingSkills[1]} 的證據與成果` : '',
  ].filter(Boolean);
  const highlights = [
    topJobs[0] ? `目前最適合的方向是「${topJobs[0].title}」，匹配度約 ${topJobs[0].personalizedScore}%` : '已建立初步探索輪廓',
    interests[0] ? `你的興趣集中在 ${interests.slice(0, 2).join('、')}，方向相對明確` : '建議先補選感興趣的產業，推薦會更精準',
    skills[0] ? `目前最可直接拿來應用的能力包含 ${skills.slice(0, 3).join('、')}` : '目前技能標記偏少，建議補充實際會用的工具與能力',
  ];
  const nextSteps: DerivedNextStep[] = [
    {
      action: topJobs[0] ? `先查看「${topJobs[0].title}」與另外 2 個高匹配職缺` : '先完成探索，建立第一版推薦清單',
      priority: 'high',
      timeEstimate: '20 分鐘',
    },
    {
      action: aggregatedMissingSkills[0]
        ? `優先補強 ${aggregatedMissingSkills[0]}，再投遞高分職缺`
        : '把現有經歷改寫成可量化的履歷內容',
      priority: 'high',
      timeEstimate: '1.5 小時',
      resource: 'TYS 履歷健診',
    },
    {
      action: activeSession.source === 'explore'
        ? '上傳履歷或補充更多經歷，讓分析從探索版升級成完整版'
        : '根據這份分析調整履歷與自我介紹',
      priority: 'medium',
      timeEstimate: '30 分鐘',
    },
  ];

  return {
    summary: activeSession.source === 'explore'
      ? `已根據你剛完成的探索結果建立初步分析。你現在可以直接查看推薦職缺，之後再上傳履歷會更精準。`
      : activeSession.source === 'upload'
        ? `已根據你上傳的資料建立分析輪廓。若 API Key 已設定，系統會優先使用 AI 進一步整理優勢與下一步。`
        : activeSession.source === 'manual'
          ? `已根據你手動填寫的學歷、經歷與技能建立分析報告。`
          : '目前顯示的是示範分析資料；完成探索或上傳履歷後，推薦會依你的條件即時重算。',
    modeLabel: modeLabels[activeSession.source],
    profileLabel: getProfileLabel(activeSession.userType),
    skills: skills.length ? skills : ['社群經營', '文案撰寫', 'Canva'],
    interests: interests.length ? interests : ['行銷廣告', '科技業'],
    radarData: buildRadarData(skills, interests, activeSession),
    strengths,
    suitableRoles: suitableRoles.length ? suitableRoles : ['內容企劃', '社群行銷', '活動企劃'],
    resumeCompleteness,
    resumeGaps: resumeGaps.length ? resumeGaps : ['可補上量化成果與作品集連結'],
    highlights,
    nextSteps,
    recommendedJobs: recommendedJobs.slice(0, 6),
  };
}
