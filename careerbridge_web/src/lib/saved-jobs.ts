const SAVED_JOBS_KEY = 'careerbridge.saved-jobs.v1';

export function loadSavedJobs(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(SAVED_JOBS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function saveSavedJobs(jobIds: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(jobIds));
}

export function toggleSavedJob(jobIds: string[], jobId: string): string[] {
  return jobIds.includes(jobId)
    ? jobIds.filter((id) => id !== jobId)
    : [...jobIds, jobId];
}
