export function getScoreColor(score: number): string {
  if (score >= 80) return 'var(--color-cta)';
  if (score >= 60) return 'var(--color-secondary)';
  if (score >= 40) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return '高度匹配';
  if (score >= 60) return '中度匹配';
  if (score >= 40) return '需補強';
  return '落差較大';
}

export function getMatchCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'high-match': '最適合你',
    'high-growth': '高成長潛力',
    'low-barrier': '低門檻切入',
    'need-improvement': '補強後可投',
  };
  return labels[category] || category;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays} 天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 週前`;
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    saved: '已收藏',
    applied: '已投遞',
    interview: '面試中',
    offered: '已錄取',
    rejected: '未錄取',
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    saved: 'var(--color-text-muted)',
    applied: 'var(--color-info)',
    interview: 'var(--color-warning)',
    offered: 'var(--color-cta)',
    rejected: 'var(--color-danger)',
  };
  return colors[status] || 'var(--color-text-muted)';
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
