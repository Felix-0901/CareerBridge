'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell
} from 'recharts';
import {
  LayoutDashboard, Bookmark, Send, MessageSquare, Award, XCircle,
  CheckCircle, Circle, Calendar, TrendingUp, ArrowRight, Sparkles
} from 'lucide-react';
import { mockDashboardStats, mockWeeklyTasks, mockApplications } from '@/data/user-profile';
import styles from './page.module.css';

const statusConfig = [
  { key: 'saved', label: '已收藏', icon: Bookmark, color: 'var(--color-text-muted)' },
  { key: 'applied', label: '已投遞', icon: Send, color: 'var(--color-info)' },
  { key: 'interview', label: '面試中', icon: MessageSquare, color: 'var(--color-warning)' },
  { key: 'offered', label: '已錄取', icon: Award, color: 'var(--color-cta)' },
  { key: 'rejected', label: '未錄取', icon: XCircle, color: 'var(--color-danger)' },
];

const weeklyBarData = [
  { day: '週一', count: 2 },
  { day: '週二', count: 1 },
  { day: '週三', count: 3 },
  { day: '週四', count: 0 },
  { day: '週五', count: 1 },
  { day: '週六', count: 0 },
  { day: '週日', count: 0 },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState(mockWeeklyTasks);
  const stats = mockDashboardStats;

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className={styles.header}>
          <span className="section-label">求職儀表板</span>
          <h1><LayoutDashboard size={28} /> 你的求職進度</h1>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {[
            { label: '已收藏', value: stats.savedJobs, icon: Bookmark, color: 'var(--color-text-muted)' },
            { label: '已投遞', value: stats.appliedJobs, icon: Send, color: 'var(--color-info)' },
            { label: '面試中', value: stats.interviews, icon: MessageSquare, color: 'var(--color-warning)' },
            { label: '已錄取', value: stats.offers, icon: Award, color: 'var(--color-cta)' },
            { label: '回覆率', value: `${stats.responseRate}%`, icon: TrendingUp, color: 'var(--color-primary)' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className={`card ${styles.statCard}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <s.icon size={20} color={s.color} />
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className={styles.grid}>
          {/* Left: Kanban */}
          <motion.div
            className={styles.kanbanWrap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className={styles.sectionTitle}>投遞看板</h3>
            <div className="kanban-board">
              {statusConfig.map((status) => {
                const items = mockApplications.filter(a => a.status === status.key);
                return (
                  <div key={status.key} className="kanban-column">
                    <div className="kanban-column-header">
                      <span className="kanban-column-title" style={{ color: status.color }}>
                        {status.label}
                      </span>
                      <span className="kanban-count">{items.length}</span>
                    </div>
                    {items.map((app) => (
                      <Link key={app.id} href={`/jobs/${app.jobId}`} className="kanban-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '4px' }}>
                          {app.jobTitle}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                          {app.company}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div
                            style={{
                              width: '8px', height: '8px', borderRadius: '50%',
                              background: app.matchScore >= 80 ? 'var(--color-cta)' : app.matchScore >= 60 ? 'var(--color-secondary)' : 'var(--color-warning)',
                            }}
                          />
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            匹配 {app.matchScore}%
                          </span>
                        </div>
                      </Link>
                    ))}
                    {items.length === 0 && (
                      <div style={{ padding: 'var(--space-md)', textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        尚無項目
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Tasks + Chart */}
          <div className={styles.rightCol}>
            {/* Weekly Tasks */}
            <motion.div
              className={`card ${styles.taskCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className={styles.taskHeader}>
                <h3><Calendar size={20} /> 本週任務</h3>
                <span className={styles.taskProgress}>
                  {completedTasks}/{totalTasks}
                </span>
              </div>
              <div className="progress-bar progress-bar-success" style={{ marginBottom: 'var(--space-lg)' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                />
              </div>
              <div className={styles.taskList}>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`${styles.taskItem} ${task.completed ? styles.taskDone : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? (
                      <CheckCircle size={18} color="var(--color-cta)" />
                    ) : (
                      <Circle size={18} color="var(--color-border)" />
                    )}
                    <div className={styles.taskInfo}>
                      <span className={styles.taskText}>{task.task}</span>
                      <span className={styles.taskDue}>{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity Chart */}
            <motion.div
              className={`card ${styles.chartCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3><TrendingUp size={20} /> 本週活動</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyBarData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="行動數" radius={[4, 4, 0, 0]} barSize={28}>
                    {weeklyBarData.map((_, i) => (
                      <Cell key={i} fill="var(--color-secondary)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* AI Advice */}
            <motion.div
              className={`card card-featured ${styles.adviceCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Sparkles size={20} color="var(--color-primary)" />
              <h4>AI 建議</h4>
              <p>你目前投遞了 {stats.appliedJobs} 個職缺，建議這週專注在：</p>
              <ul className={styles.adviceList}>
                <li>完成本週的履歷修改任務</li>
                <li>優先準備已進入面試的職缺</li>
                <li>投遞 1-2 個新的高匹配職缺</li>
              </ul>
              <Link href="/jobs" className="btn btn-sm btn-primary" style={{ marginTop: 'var(--space-md)' }}>
                查看推薦 <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
