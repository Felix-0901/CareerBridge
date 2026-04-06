'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
  ArrowRight, Target, FileText, AlertTriangle, TrendingUp,
  CheckCircle, Sparkles, Edit3, Calendar
} from 'lucide-react';
import { mockUserProfile } from '@/data/user-profile';
import { mockRadarData } from '@/data/skills';
import styles from './page.module.css';

export default function AnalysisPage() {
  const profile = mockUserProfile;

  return (
    <div className={styles.container}>
      <div className="page-container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="section-label">AI 分析結果</span>
          <h1>你的職涯輪廓</h1>
          <p className={styles.headerDesc}>
            根據你提供的資料，AI 已為你建立個人化的職涯分析報告
          </p>
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
                  <RadarChart data={mockRadarData}>
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
                {profile.skills.map((skill, i) => (
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
                <span className={styles.completePercent}>{profile.resumeCompleteness}%</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 'var(--space-lg)' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${profile.resumeCompleteness}%` }}
                />
              </div>
              <h5 style={{ marginBottom: 'var(--space-sm)' }}>
                <AlertTriangle size={16} color="var(--color-warning)" /> 待改善項目
              </h5>
              <ul className={styles.gapList}>
                {profile.resumeGaps.map((gap, i) => (
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
                {profile.strengths.map((s, i) => (
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
                {profile.suitableRoles.map((role, i) => (
                  <div key={i} className={styles.roleItem}>
                    <span className={styles.roleRank}>#{i + 1}</span>
                    <span>{role}</span>
                  </div>
                ))}
              </div>
              <Link href="/jobs" className="btn btn-sm btn-primary" style={{ marginTop: 'var(--space-md)', width: '100%' }}>
                查看推薦職缺 <ArrowRight size={14} />
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
                {profile.highlights.map((h, i) => (
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
                {profile.nextSteps.map((step, i) => (
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
