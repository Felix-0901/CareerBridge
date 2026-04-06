'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search, MapPin, Clock, Building2, ArrowRight, Bookmark, Shield
} from 'lucide-react';
import { getMatchCategoryLabel, getScoreColor } from '@/lib/utils';
import { personalizeJobs } from '@/lib/analysis-engine';
import { loadAnalysisSession, type AnalysisSession } from '@/lib/analysis-session';
import { loadSavedJobs, saveSavedJobs, toggleSavedJob } from '@/lib/saved-jobs';
import styles from './page.module.css';

const tabs = [
  { id: 'all', label: '全部' },
  { id: 'high-match', label: '最適合' },
  { id: 'high-growth', label: '高成長' },
  { id: 'low-barrier', label: '低門檻' },
  { id: 'need-improvement', label: '補強後可投' },
];

const typeFilters = ['全部', '實習', '兼職', '正職'];

function JobsPageContent() {
  const searchParams = useSearchParams();
  const urlActiveTab = searchParams.get('tab');
  const urlTypeFilter = searchParams.get('type');
  const urlOfficialOnly = searchParams.get('official') === '1';
  const [activeTabOverride, setActiveTabOverride] = useState<string | null>(null);
  const [typeFilterOverride, setTypeFilterOverride] = useState<string | null>(null);
  const [officialOnlyOverride, setOfficialOnlyOverride] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [session] = useState<AnalysisSession | null>(() => loadAnalysisSession());
  const [savedIds, setSavedIds] = useState<string[]>(() => loadSavedJobs());

  const activeTab = activeTabOverride ?? (urlActiveTab && tabs.some((tab) => tab.id === urlActiveTab) ? urlActiveTab : 'all');
  const typeFilter = typeFilterOverride ?? (urlTypeFilter && typeFilters.includes(urlTypeFilter) ? urlTypeFilter : '全部');
  const showOfficialOnly = officialOnlyOverride ?? urlOfficialOnly;

  const personalizedJobs = useMemo(() => personalizeJobs(session), [session]);

  const filteredJobs = useMemo(() => {
    let result = [...personalizedJobs];

    if (activeTab !== 'all') {
      result = result.filter(j => j.category === activeTab);
    }
    if (typeFilter !== '全部') {
      result = result.filter(j => j.type === typeFilter);
    }
    if (showOfficialOnly) {
      result = result.filter(j => j.isOfficialResource);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.industry.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => b.personalizedScore - a.personalizedScore);
  }, [activeTab, personalizedJobs, searchQuery, showOfficialOnly, typeFilter]);

  const handleToggleSave = (jobId: string) => {
    const nextIds = toggleSavedJob(savedIds, jobId);
    setSavedIds(nextIds);
    saveSavedJobs(nextIds);
  };

  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className={styles.header}>
          <span className="section-label">個人化推薦</span>
          <h1>職缺推薦</h1>
          <p className={styles.headerDesc}>
            根據你的能力與興趣，AI 為你篩選最適合的機會
          </p>
        </div>

        <div className={styles.contextBanner}>
          <div>
            <strong>{session ? '已依你的最近一次分析重新排序' : '目前顯示示範推薦排序'}</strong>
            <p>
              {session
                ? '探索、手動輸入或上傳履歷後，這裡會直接沿用你的條件，不需要重新篩一次。'
                : '完成探索或分析後，職缺排序會改成你的個人化結果。'}
            </p>
          </div>
          {!session && (
            <Link href="/onboarding" className="btn btn-secondary btn-sm">
              先做快速探索
            </Link>
          )}
        </div>

        {/* Search & Filters */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              className={`input ${styles.searchInput}`}
              placeholder="搜尋職缺、公司或產業..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="job-search-input"
            />
          </div>
          <div className={styles.filterGroup}>
            {typeFilters.map(t => (
              <button
                key={t}
                className={`${styles.filterBtn} ${typeFilter === t ? styles.filterActive : ''}`}
                onClick={() => setTypeFilterOverride(t)}
              >
                {t}
              </button>
            ))}
            <button
              className={`${styles.filterBtn} ${showOfficialOnly ? styles.filterActive : ''}`}
              onClick={() => setOfficialOnlyOverride(!showOfficialOnly)}
            >
              <Shield size={14} /> 官方資源
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTabOverride(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className={styles.results}>
          <p className={styles.resultCount}>找到 {filteredJobs.length} 個職缺</p>
          <div className={styles.jobList}>
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/jobs/${job.id}`} className={styles.jobCard}>
                  <div className={styles.jobLeft}>
                    <div className={styles.jobMeta}>
                      <span className={`tag tag-${job.type === '實習' ? 'primary' : job.type === '兼職' ? 'warning' : 'success'}`}>
                        {job.type}
                      </span>
                      {job.isOfficialResource && (
                        <span className="tag tag-info">
                          <Shield size={10} /> 官方
                        </span>
                      )}
                      <span className={`tag ${styles.categoryTag}`}>
                        {getMatchCategoryLabel(job.category)}
                      </span>
                    </div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <p className={styles.jobCompany}>{job.company}</p>
                    <p className={styles.jobPlain}>{job.plainDescription}</p>
                    <div className={styles.jobDetails}>
                      <span><MapPin size={14} /> {job.location}</span>
                      <span><Clock size={14} /> {job.workSchedule}</span>
                      <span><Building2 size={14} /> {job.industry}</span>
                    </div>
                    <div className={styles.jobSkills}>
                      {job.requiredSkills.slice(0, 4).map((s, idx) => (
                        <span key={idx} className={styles.skillPill}>{s}</span>
                      ))}
                      {job.requiredSkills.length > 4 && (
                        <span className={styles.skillMore}>+{job.requiredSkills.length - 4}</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.jobRight}>
                    <div
                      className={styles.scoreCircle}
                      style={{ '--score-color': getScoreColor(job.personalizedScore || 0) } as React.CSSProperties}
                    >
                      <svg width="72" height="72" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="30" fill="none" stroke="var(--color-border-light)" strokeWidth="4" />
                        <circle
                          cx="36" cy="36" r="30" fill="none"
                          stroke={getScoreColor(job.personalizedScore || 0)}
                          strokeWidth="4"
                          strokeDasharray={`${(job.personalizedScore || 0) * 1.885} 188.5`}
                          strokeLinecap="round"
                          transform="rotate(-90 36 36)"
                        />
                      </svg>
                      <span className={styles.scoreText}>{job.personalizedScore}</span>
                    </div>
                    <span className={styles.scoreLabel}>匹配度</span>
                    <div className={styles.jobActions}>
                      <button
                        className={`${styles.actionBtn} ${savedIds.includes(job.id) ? styles.actionBtnSaved : ''}`}
                        aria-label={savedIds.includes(job.id) ? '取消收藏' : '收藏'}
                        aria-pressed={savedIds.includes(job.id)}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleToggleSave(job.id);
                        }}
                      >
                        <Bookmark size={16} />
                      </button>
                      <ArrowRight size={16} className={styles.arrowIcon} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          {filteredJobs.length === 0 && (
            <div className={styles.emptyState}>
              <h3>目前沒有符合條件的職缺</h3>
              <p>可以先清掉篩選條件，或回到探索頁重新調整興趣與技能。</p>
              <div className={styles.emptyActions}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setActiveTabOverride('all');
                    setTypeFilterOverride('全部');
                    setSearchQuery('');
                    setOfficialOnlyOverride(false);
                  }}
                >
                  清除篩選
                </button>
                <Link href="/onboarding" className="btn btn-primary">
                  重新探索
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JobsPageFallback() {
  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className={styles.header}>
          <span className="section-label">個人化推薦</span>
          <h1>職缺推薦</h1>
          <p className={styles.headerDesc}>正在整理你的推薦職缺...</p>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<JobsPageFallback />}>
      <JobsPageContent />
    </Suspense>
  );
}
