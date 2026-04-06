'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Star, ChevronDown, ChevronUp,
  Lightbulb, Copy, CheckCircle, BookOpen, ExternalLink
} from 'lucide-react';
import { mockInterviewQuestions, selfIntroTemplate } from '@/data/interview';
import styles from './page.module.css';

export default function InterviewPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const difficultyColor = (d: string) => {
    if (d === 'easy') return 'tag-success';
    if (d === 'medium') return 'tag-warning';
    return 'tag-danger';
  };

  const difficultyLabel = (d: string) => {
    if (d === 'easy') return '簡單';
    if (d === 'medium') return '中等';
    return '困難';
  };

  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className="section-header">
          <span className="section-label">面試準備助理</span>
          <h1>模擬面試，自信上場</h1>
          <p style={{ color: 'var(--color-text-light)', fontSize: 'var(--text-lg)' }}>
            根據目標職缺，AI 產生最可能被問到的面試題目與建議回答
          </p>
        </div>

        <div className={styles.wrapper}>
          {/* Self Intro Template */}
          <motion.div
            className={`card ${styles.introCard}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3><BookOpen size={20} /> 自我介紹模板</h3>
            <p className={styles.introDesc}>根據你的經歷，可以參考以下結構準備 60 秒自我介紹：</p>
            <pre className={styles.introTemplate}>{selfIntroTemplate}</pre>
            <button
              className={styles.copyBtn}
              onClick={() => handleCopy(selfIntroTemplate, 'intro-template')}
            >
              {copiedId === 'intro-template' ? (
                <><CheckCircle size={14} /> 已複製</>
              ) : (
                <><Copy size={14} /> 複製模板</>
              )}
            </button>
          </motion.div>

          {/* Questions */}
          <h2 className={styles.questionsTitle}>
            <MessageSquare size={22} /> 常見面試題
          </h2>

          <div className={styles.questionList}>
            {mockInterviewQuestions.map((q, i) => (
              <motion.div
                key={q.id}
                className={`card ${styles.questionCard}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className={styles.questionHeader}
                  onClick={() => toggleExpand(q.id)}
                >
                  <div className={styles.questionLeft}>
                    {q.isStarred && <Star size={16} fill="var(--color-warning)" color="var(--color-warning)" />}
                    <span className={styles.questionText}>{q.question}</span>
                  </div>
                  <div className={styles.questionRight}>
                    <span className={`tag ${difficultyColor(q.difficulty)}`}>
                      {difficultyLabel(q.difficulty)}
                    </span>
                    <span className="tag tag-primary">{q.category}</span>
                    {expandedId === q.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === q.id && (
                    <motion.div
                      className={styles.questionBody}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.answerSection}>
                        <h5>建議回答方向</h5>
                        <p>{q.suggestedAnswer}</p>
                      </div>
                      <div className={styles.tipSection}>
                        <Lightbulb size={16} color="var(--color-warning)" />
                        <p>{q.tips}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* TYS CTA */}
          <div className={styles.tysCta}>
            <div>
              <h3>想要真人模擬面試？</h3>
              <p>TYS 提供免費的一對一模擬面試服務，由專業顧問給你即時回饋。</p>
            </div>
            <a
              href="https://tys.gov.taipei"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              預約 TYS 模擬面試 <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
