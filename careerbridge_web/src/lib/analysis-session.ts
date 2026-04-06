export type AnalysisSource = 'demo' | 'explore' | 'upload' | 'manual';
export type UserTypeId = 'highschool' | 'college' | 'fresh';
export type JobGoalId = 'internship' | 'parttime' | 'fulltime';

export interface AnalysisPreferences {
  industry: string;
  commute: string;
  schedule: string;
}

export interface ManualProfileInput {
  education: string;
  experience: string;
  skills: string;
  projects: string;
}

export interface AnalysisSession {
  source: AnalysisSource;
  createdAt: string;
  userType: UserTypeId | '';
  selectedInterests: string[];
  selectedSkills: string[];
  jobGoal: JobGoalId | '';
  preferences: AnalysisPreferences;
  manualData: ManualProfileInput;
  uploadedFileName: string | null;
}

export const ANALYSIS_SESSION_KEY = 'careerbridge.analysis-session.v1';

export function createEmptyAnalysisSession(
  partial: Partial<AnalysisSession> = {}
): AnalysisSession {
  return {
    source: partial.source ?? 'demo',
    createdAt: partial.createdAt ?? new Date().toISOString(),
    userType: partial.userType ?? '',
    selectedInterests: partial.selectedInterests ?? [],
    selectedSkills: partial.selectedSkills ?? [],
    jobGoal: partial.jobGoal ?? '',
    preferences: {
      industry: partial.preferences?.industry ?? '',
      commute: partial.preferences?.commute ?? '',
      schedule: partial.preferences?.schedule ?? '',
    },
    manualData: {
      education: partial.manualData?.education ?? '',
      experience: partial.manualData?.experience ?? '',
      skills: partial.manualData?.skills ?? '',
      projects: partial.manualData?.projects ?? '',
    },
    uploadedFileName: partial.uploadedFileName ?? null,
  };
}

export function mergeAnalysisSession(
  base: AnalysisSession | null,
  patch: Partial<AnalysisSession>
): AnalysisSession {
  const current = base ?? createEmptyAnalysisSession();

  return {
    ...current,
    ...patch,
    createdAt: patch.createdAt ?? new Date().toISOString(),
    selectedInterests: patch.selectedInterests ?? current.selectedInterests,
    selectedSkills: patch.selectedSkills ?? current.selectedSkills,
    preferences: {
      ...current.preferences,
      ...patch.preferences,
    },
    manualData: {
      ...current.manualData,
      ...patch.manualData,
    },
    uploadedFileName:
      patch.uploadedFileName === undefined ? current.uploadedFileName : patch.uploadedFileName,
  };
}

export function loadAnalysisSession(): AnalysisSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(ANALYSIS_SESSION_KEY);
    if (!raw) return null;
    return createEmptyAnalysisSession(JSON.parse(raw) as Partial<AnalysisSession>);
  } catch {
    return null;
  }
}

export function saveAnalysisSession(session: AnalysisSession) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ANALYSIS_SESSION_KEY, JSON.stringify(session));
}

export function clearAnalysisSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ANALYSIS_SESSION_KEY);
}
