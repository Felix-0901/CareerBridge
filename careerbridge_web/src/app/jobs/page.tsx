'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, MapPin, Clock, Building2,
  ArrowRight, Bookmark, Star, Shield
} from 'lucide-react';
import { jobs } from '@/data/jobs';
import { getScoreColor, getMatchCategoryLabel, formatDate } from '@/lib/utils';
import styles from './page.module.css';

const tabs = [
  { id: 'all', label: '全部' },
  { id: 'high-match', label: '最適合' },
  { id: 'high-growth', label: '高成長' },
  { id: 'low-barrier', label: '低門檻' },
  { id: 'need-improvement', label: '補強後可投' },
];

const typeFilters = ['全部', '實習', '兼職', '正職'];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOfficialOnly, setShowOfficialOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

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

    return result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, [activeTab, typeFilter, searchQuery, showOfficialOnly]);

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
                onClick={() => setTypeFilter(t)}
              >
                {t}
              </button>
            ))}
            <button
              className={`${styles.filterBtn} ${showOfficialOnly ? styles.filterActive : ''}`}
              onClick={() => setShowOfficialOnly(!showOfficialOnly)}
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
              onClick={() => setActiveTab(tab.id)}
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
                      style={{ '--score-color': getScoreColor(job.matchScore || 0) } as React.CSSProperties}
                    >
                      <svg width="72" height="72" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="30" fill="none" stroke="var(--color-border-light)" strokeWidth="4" />
                        <circle
                          cx="36" cy="36" r="30" fill="none"
                          stroke={getScoreColor(job.matchScore || 0)}
                          strokeWidth="4"
                          strokeDasharray={`${(job.matchScore || 0) * 1.885} 188.5`}
                          strokeLinecap="round"
                          transform="rotate(-90 36 36)"
                        />
                      </svg>
                      <span className={styles.scoreText}>{job.matchScore}</span>
                    </div>
                    <span className={styles.scoreLabel}>匹配度</span>
                    <div className={styles.jobActions}>
                      <button className={styles.actionBtn} aria-label="收藏">
                        <Bookmark size={16} />
                      </button>
                      <ArrowRight size={16} className={styles.arrowIcon} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
