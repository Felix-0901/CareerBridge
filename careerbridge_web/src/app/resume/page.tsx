'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit3, Copy, CheckCircle, FileText,
  AlertTriangle, Sparkles
} from 'lucide-react';
import styles from './page.module.css';

const resumeSections = [
  {
    id: 'title',
    title: '履歷標題',
    original: '我的履歷',
    suggestion: '行銷企劃實習生 — 具社群經營與活動企劃實戰經驗',
    reason: '標題應針對投遞職缺客製化，突出核心經驗',
  },
  {
    id: 'intro',
    title: '自我介紹',
    original: '我是一個認真負責的學生，對工作充滿熱情，希望有機會在貴公司實習。',
    suggestion: '行銷系大三生，擅長社群經營與活動企劃。曾帶領攝影社社群追蹤人數成長 40%，並參與 200+ 人規模活動籌辦。目前尋找行銷相關實習，期望將社群數據思維應用於品牌推廣。',
    reason: '加入具體數據、經驗亮點與職涯目標',
  },
  {
    id: 'exp1',
    title: '經歷描述',
    original: '負責社團活動',
    suggestion: '規劃並執行 3 場校內活動，協調 15 人團隊分工，平均單場參與人數約 120 人。同時經營社團 Instagram，4 個月內追蹤人數從 350 成長至 490（+40%）。',
    reason: '加入量化成果、團隊規模、具體數據',
  },
  {
    id: 'exp2',
    title: '志工經歷',
    original: '擔任青年創業論壇志工',
    suggestion: '台北市青年創業論壇活動志工，負責報到引導與場控支援，服務超過 200 位參與者。活動結束後協助整理問卷回饋，彙整成 5 頁分析報告供主辦單位參考。',
    reason: '說明具體工作內容與影響力，而非只列頭銜',
  },
  {
    id: 'project',
    title: '專題經歷',
    original: '做了行銷專題報告',
    suggestion: '完成品牌行銷分析專題，針對某飲料品牌進行市場定位、競品分析與社群策略研究，產出 30 頁報告並以簡報形式發表，獲選為全班最佳專題。',
    reason: '說明專題規模、方法、成果，讓經歷更有說服力',
  },
];

export default function ResumePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className="section-header">
          <span className="section-label">履歷優化助理</span>
          <h1>讓履歷替你說話</h1>
          <p style={{ color: 'var(--color-text-light)', fontSize: 'var(--text-lg)' }}>
            AI 逐項分析你的履歷，給出具體的改寫建議
          </p>
        </div>

        <div className={styles.wrapper}>
          {resumeSections.map((section, i) => (
            <motion.div
              key={section.id}
              className={`card ${styles.sectionCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className={styles.sectionTitle}>
                <Edit3 size={18} />
                {section.title}
              </h3>

              <div className="comparison-panel">
                <div className="comparison-before">
                  <div className={styles.label}>
                    <AlertTriangle size={14} /> 原始版本
                  </div>
                  <p className={styles.content}>{section.original}</p>
                </div>
                <div className="comparison-after">
                  <div className={styles.label}>
                    <Sparkles size={14} /> AI 建議改寫
                  </div>
                  <p className={styles.content}>{section.suggestion}</p>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(section.suggestion, section.id)}
                  >
                    {copiedId === section.id ? (
                      <><CheckCircle size={14} /> 已複製</>
                    ) : (
                      <><Copy size={14} /> 複製建議</>
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.reason}>
                <Sparkles size={14} color="var(--color-primary)" />
                <span>改寫原因：{section.reason}</span>
              </div>
            </motion.div>
          ))}

          <div className={styles.tips}>
            <h3><FileText size={20} /> 通用履歷建議</h3>
            <ul>
              <li>每段經歷都加入<strong>量化數據</strong>（人數、百分比、時間）</li>
              <li>用<strong>動詞開頭</strong>描述經歷（規劃、執行、協調、分析）</li>
              <li>客製化每份投遞的履歷，針對<strong>職缺關鍵字</strong>調整</li>
              <li>放上<strong>作品連結</strong>或 Portfolio（若有）</li>
              <li>控制在<strong>一頁</strong>以內（實習生建議）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
