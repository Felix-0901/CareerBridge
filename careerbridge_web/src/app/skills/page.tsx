'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import {
  TrendingUp, AlertTriangle, BookOpen, ArrowRight, Target
} from 'lucide-react';
import { mockSkillGaps, mockRadarData } from '@/data/skills';
import { getScoreColor } from '@/lib/utils';
import styles from './page.module.css';

const barData = mockSkillGaps.map(g => ({
  name: g.skill.length > 8 ? g.skill.slice(0, 8) + '...' : g.skill,
  current: g.currentLevel,
  required: g.requiredLevel,
}));

export default function SkillsPage() {
  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className="section-header">
          <span className="section-label">技能落差分析</span>
          <h1>了解你的差距，規劃你的成長</h1>
          <p style={{ color: 'var(--color-text-light)', fontSize: 'var(--text-lg)' }}>
            AI 分析你與目標職缺之間的技能差距，給你可執行的補強建議
          </p>
        </div>

        <div className={styles.grid}>
          {/* Radar */}
          <motion.div
            className={`card ${styles.chartCard}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3><Target size={20} /> 能力概覽</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={mockRadarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-light)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} />
                <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            className={`card ${styles.chartCard}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3><TrendingUp size={20} /> 你的程度 vs 職缺要求</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'var(--color-text-light)' }} width={90} />
                <Tooltip />
                <Bar dataKey="current" name="你的程度" radius={[0, 4, 4, 0]} barSize={14}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill="var(--color-secondary)" />
                  ))}
                </Bar>
                <Bar dataKey="required" name="職缺要求" radius={[0, 4, 4, 0]} barSize={14}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill="var(--color-border)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Gap Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.sectionTitle}>
            <AlertTriangle size={22} color="var(--color-warning)" />
            最需要補強的 Top {mockSkillGaps.length} 技能
          </h2>
          <div className={styles.gapList}>
            {mockSkillGaps.map((gap, i) => (
              <div key={i} className={`card ${styles.gapCard}`}>
                <div className={styles.gapHeader}>
                  <div className={styles.gapRank}>#{i + 1}</div>
                  <div className={styles.gapInfo}>
                    <h4>{gap.skill}</h4>
                    <span className={`tag tag-${gap.priority === 'high' ? 'danger' : 'warning'}`}>
                      {gap.priority === 'high' ? '高優先' : '中優先'}
                    </span>
                  </div>
                  <div className={styles.gapScores}>
                    <span className={styles.gapCurrent}>你：{gap.currentLevel}%</span>
                    <span className={styles.gapRequired}>需要：{gap.requiredLevel}%</span>
                  </div>
                </div>
                <div className={styles.gapBar}>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${gap.currentLevel}%`,
                        background: getScoreColor(gap.currentLevel),
                      }}
                    />
                  </div>
                  <div className={styles.gapTarget} style={{ left: `${gap.requiredLevel}%` }}>
                    <div className={styles.gapTargetLine} />
                  </div>
                </div>
                <div className={styles.gapSuggestion}>
                  <BookOpen size={16} color="var(--color-primary)" />
                  <p>{gap.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className={styles.ctaArea}>
          <Link href="/jobs" className="btn btn-primary btn-lg">
            查看推薦職缺 <ArrowRight size={18} />
          </Link>
          <Link href="/resources" className="btn btn-secondary btn-lg">
            尋找學習資源
          </Link>
        </div>
      </div>
    </div>
  );
}
