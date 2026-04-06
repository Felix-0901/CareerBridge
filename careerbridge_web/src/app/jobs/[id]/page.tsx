'use client';

import { use, useMemo, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Clock, Building2, DollarSign, Star, Shield,
  CheckCircle, XCircle, TrendingUp, Edit3, MessageSquare,
  Bookmark, ExternalLink, ChevronRight
} from 'lucide-react';
import { getJobById } from '@/data/jobs';
import { getScoreColor, getScoreLabel } from '@/lib/utils';
import { loadAnalysisSession, type AnalysisSession } from '@/lib/analysis-session';
import { loadSavedJobs, saveSavedJobs, toggleSavedJob } from '@/lib/saved-jobs';
import { personalizeJobs } from '@/lib/analysis-engine';
import styles from './page.module.css';

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = getJobById(id);
  const [session] = useState<AnalysisSession | null>(() => loadAnalysisSession());
  const [savedIds, setSavedIds] = useState<string[]>(() => loadSavedJobs());

  const personalizedJob = useMemo(
    () => (job ? personalizeJobs(session).find((item) => item.id === job.id) ?? null : null),
    [job, session]
  );
  if (!job) return notFound();

  const displayScore = personalizedJob?.personalizedScore ?? job.matchScore ?? 0;
  const scoreDimensions = [
    { label: '技能吻合度', score: personalizedJob?.skillMatch || job.skillMatch || 0, weight: '35%' },
    { label: '經歷相關度', score: personalizedJob?.experienceMatch || job.experienceMatch || 0, weight: '25%' },
    { label: '興趣吻合度', score: personalizedJob?.interestMatch || job.interestMatch || 0, weight: '15%' },
    { label: '條件可行性', score: personalizedJob?.feasibilityMatch || job.feasibilityMatch || 0, weight: '15%' },
    { label: '履歷完成度', score: personalizedJob?.resumeReadiness || job.resumeReadiness || 0, weight: '10%' },
  ];

  const handleToggleSave = () => {
    const nextIds = toggleSavedJob(savedIds, job.id);
    setSavedIds(nextIds);
    saveSavedJobs(nextIds);
  };

  return (
    <div className={styles.container}>
      <div className="page-container">
        <Link href="/jobs" className={styles.backLink}>
          <ArrowLeft size={18} /> 回到職缺列表
        </Link>

        <div className={styles.layout}>
          {/* Main Content */}
          <div className={styles.mainCol}>
            {/* Title Section */}
            <motion.div
              className={`card ${styles.titleCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.titleMeta}>
                <span className={`tag tag-${job.type === '實習' ? 'primary' : job.type === '兼職' ? 'warning' : 'success'}`}>
                  {job.type}
                </span>
                {job.isOfficialResource && (
                  <span className="tag tag-info"><Shield size={10} /> {job.officialSource}</span>
                )}
                {job.beginnerFriendly && (
                  <span className="tag tag-success"><Star size={10} /> 新手友善</span>
                )}
              </div>
              <h1 className={styles.jobTitle}>{job.title}</h1>
              <p className={styles.company}>{job.company}</p>
              <div className={styles.details}>
                <span><MapPin size={15} /> {job.location}</span>
                <span><Clock size={15} /> {job.workSchedule}</span>
                <span><Building2 size={15} /> {job.industry}</span>
                <span><DollarSign size={15} /> {job.salary}</span>
              </div>
              <div className={styles.titleActions}>
                <Link
                  href={job.isOfficialResource ? '/resources' : `/resume?job=${job.id}`}
                  className="btn btn-primary"
                >
                  <ExternalLink size={16} /> {job.isOfficialResource ? '前往官方資源' : '先準備投遞'}
                </Link>
                <button className="btn btn-secondary" onClick={handleToggleSave}>
                  <Bookmark size={16} /> {savedIds.includes(job.id) ? '已收藏' : '收藏'}
                </button>
              </div>
            </motion.div>

            {/* Plain Description */}
            <motion.div
              className={`card ${styles.descCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3>白話版工作內容</h3>
              <p className={styles.plainDesc}>{job.plainDescription}</p>
              <div className={styles.growthNote}>
                <TrendingUp size={16} color="var(--color-cta)" />
                <span>成長性：{job.growthPotential}</span>
              </div>
            </motion.div>

            {/* Skill Comparison */}
            <motion.div
              className={`card ${styles.skillCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>技能落差分析</h3>
              <div className={styles.skillGroups}>
                <div className={styles.skillGroup}>
                  <h5 className={styles.skillGroupTitle}>
                    <CheckCircle size={16} color="var(--color-cta)" /> 你已具備的技能
                  </h5>
                  <div className={styles.skillTags}>
                    {job.requiredSkills.slice(0, Math.ceil(job.requiredSkills.length * 0.6)).map((s, i) => (
                      <span key={i} className="tag tag-success">{s}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <h5 className={styles.skillGroupTitle}>
                    <XCircle size={16} color="var(--color-danger)" /> 需要補強的技能
                  </h5>
                  <div className={styles.skillTags}>
                    {job.requiredSkills.slice(Math.ceil(job.requiredSkills.length * 0.6)).map((s, i) => (
                      <span key={i} className="tag tag-danger">{s}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <h5 className={styles.skillGroupTitle}>加分條件</h5>
                  <div className={styles.skillTags}>
                    {job.bonusSkills.map((s, i) => (
                      <span key={i} className="tag tag-warning">{s}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <h5 className={styles.skillGroupTitle}>軟實力</h5>
                  <div className={styles.skillTags}>
                    {job.softSkills.map((s, i) => (
                      <span key={i} className="tag tag-primary">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Cards */}
            <div className={styles.actionCards}>
              <Link href="/resume" className={`card card-hover ${styles.actionCard}`}>
                <Edit3 size={24} color="var(--color-primary)" />
                <div>
                  <h4>針對此職缺優化履歷</h4>
                  <p>AI 會根據這份職缺的要求，給你具體的修改建議</p>
                </div>
                <ChevronRight size={20} />
              </Link>
              <Link href="/interview" className={`card card-hover ${styles.actionCard}`}>
                <MessageSquare size={24} color="var(--color-primary)" />
                <div>
                  <h4>準備面試</h4>
                  <p>查看針對此職缺的常見面試題與回答建議</p>
                </div>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Match Score */}
            <motion.div
              className={`card card-featured ${styles.scoreCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <h3>匹配度</h3>
              <div className={styles.mainScore}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-border-light)" strokeWidth="6" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke={getScoreColor(displayScore)}
                    strokeWidth="6"
                    strokeDasharray={`${displayScore * 3.267} 326.7`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className={styles.mainScoreText}>
                  <span className={styles.mainScoreValue}>{displayScore}</span>
                  <span className={styles.mainScoreLabel}>{getScoreLabel(displayScore)}</span>
                </div>
              </div>
              {session && (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
                  這個匹配度已依你最近一次的探索或分析結果重新計算。
                </p>
              )}
              <div className={styles.dimensions}>
                {scoreDimensions.map((d, i) => (
                  <div key={i} className={styles.dimension}>
                    <div className={styles.dimHeader}>
                      <span className={styles.dimLabel}>{d.label}</span>
                      <span className={styles.dimScore}>{d.score}</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${d.score}%`,
                          background: getScoreColor(d.score),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Resource Suggestion */}
            {job.isOfficialResource && (
              <motion.div
                className={`card ${styles.resourceCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Shield size={20} color="var(--color-info)" />
                <h4>此為官方青年資源</h4>
                <p>此職缺來自{job.officialSource}，享有政府相關支持與保障。</p>
                <Link href="/resources" className="btn btn-sm btn-secondary" style={{ marginTop: 'var(--space-sm)' }}>
                  了解更多資源
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
