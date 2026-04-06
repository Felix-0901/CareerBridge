'use client';

import { motion } from 'framer-motion';
import {
  Compass, Briefcase, Award, Building2, MapPin, Wallet,
  ExternalLink, Users, Sparkles
} from 'lucide-react';
import { resources } from '@/data/resources';
import styles from './page.module.css';

const iconMap: Record<string, React.ElementType> = {
  compass: Compass,
  briefcase: Briefcase,
  award: Award,
  building: Building2,
  'map-pin': MapPin,
  wallet: Wallet,
};

export default function ResourcesPage() {
  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className="section-header">
          <span className="section-label">台北官方資源</span>
          <h1>公共資源智慧導流</h1>
          <p style={{ color: 'var(--color-text-light)', fontSize: 'var(--text-lg)' }}>
            台北已有完整的青年職涯服務體系。CareerBridge 幫你找到最適合的入口。
          </p>
        </div>

        {/* AI Recommendation Banner */}
        <motion.div
          className={styles.aiBanner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={24} />
          <div>
            <h4>AI 建議</h4>
            <p>根據你的分析結果，建議你先預約 <strong>TYS 一對一職涯諮詢</strong>，釐清方向後再投遞職缺會更有效率。</p>
          </div>
        </motion.div>

        {/* Resource Cards */}
        <div className={styles.resourceGrid}>
          {resources.map((res, i) => {
            const Icon = iconMap[res.icon] || Compass;
            return (
              <motion.div
                key={res.id}
                className={`card ${styles.resourceCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <Icon size={28} />
                  </div>
                  <span className={`tag tag-${res.type === '諮詢' ? 'primary' : res.type === '職缺' ? 'success' : res.type === '就服' ? 'info' : 'warning'}`}>
                    {res.type}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{res.name}</h3>
                <p className={styles.cardDesc}>{res.description}</p>

                <div className={styles.services}>
                  <h5>提供服務</h5>
                  <div className={styles.serviceTags}>
                    {res.services.map((s, idx) => (
                      <span key={idx} className={styles.servicePill}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.audience}>
                  <h5><Users size={14} /> 適合對象</h5>
                  <div className={styles.audienceTags}>
                    {res.targetAudience.map((a, idx) => (
                      <span key={idx} className="tag tag-primary">{a}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.aiAdvice}>
                  <Sparkles size={14} color="var(--color-primary)" />
                  <p>{res.aiRecommendation}</p>
                </div>

                <div className={styles.cardMeta}>
                  <span className={styles.location}><MapPin size={14} /> {res.location}</span>
                  <span className={styles.howTo}>{res.howToApply}</span>
                </div>

                <a
                  href={res.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                  style={{ marginTop: 'var(--space-md)' }}
                >
                  前往官方網站 <ExternalLink size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
