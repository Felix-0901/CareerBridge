'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, FileText, Type, CheckCircle, Sparkles, ArrowRight, X } from 'lucide-react';
import {
  loadAnalysisSession,
  mergeAnalysisSession,
  saveAnalysisSession,
  type AnalysisSession,
} from '@/lib/analysis-session';
import styles from './page.module.css';

export default function UploadPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'upload' | 'manual'>('upload');
  const [analyzing, setAnalyzing] = useState(false);
  const [existingSession] = useState<AnalysisSession | null>(() => loadAnalysisSession());
  const [manualData, setManualData] = useState({
    education: '',
    experience: '',
    skills: '',
    projects: '',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    const nextSession = mergeAnalysisSession(existingSession, {
      source: mode === 'upload' ? 'upload' : 'manual',
      manualData,
      uploadedFileName: uploadedFile?.name ?? null,
    });

    saveAnalysisSession(nextSession);
    setAnalyzing(true);
    setTimeout(() => {
      router.push(`/analysis?source=${mode === 'upload' ? 'upload' : 'manual'}`);
    }, 1800);
  };

  const canAnalyze = mode === 'upload'
    ? !!uploadedFile
    : !!(manualData.education || manualData.experience);

  if (analyzing) {
    return (
      <div className={styles.analyzingContainer}>
        <motion.div
          className={styles.analyzingCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.analyzingSpinner}>
            <Sparkles size={40} color="var(--color-primary)" />
          </div>
          <h2>AI 正在分析你的資料...</h2>
          <p className={styles.analyzingDesc}>正在解析技能、經歷亮點與適合的職務方向</p>
          <div className={styles.analyzingSteps}>
            {['解析基本資料', '提取技能標籤', '分析經歷亮點', '計算職務適配度'].map((s, i) => (
              <motion.div
                key={i}
                className={styles.analyzingStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.6 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.6 + 0.4 }}
                >
                  <CheckCircle size={18} color="var(--color-cta)" />
                </motion.div>
                <span>{s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className={styles.wrapper}>
          <div className="section-header">
            <span className="section-label">第一步</span>
            <h2>上傳履歷或輸入經歷</h2>
            <p>讓 AI 了解你目前的能力與背景，才能給出最精準的推薦</p>
          </div>

          {existingSession?.source === 'explore' && (
            <div className={styles.contextCard}>
              <h3>已帶入你剛剛的探索結果</h3>
              <p>
                目前已記住 {existingSession.selectedInterests.slice(0, 2).join('、') || '你的興趣方向'}
                {existingSession.jobGoal ? `，並以${existingSession.jobGoal === 'internship' ? '實習' : existingSession.jobGoal === 'parttime' ? '兼職' : '正職'}為主要目標` : ''}。
                現在補上履歷或經歷後，分析會更完整。
              </p>
            </div>
          )}

          {/* Mode Toggle */}
          <div className={styles.modeToggle}>
            <button
              className={`${styles.modeBtn} ${mode === 'upload' ? styles.modeBtnActive : ''}`}
              onClick={() => setMode('upload')}
            >
              <Upload size={18} /> 上傳檔案
            </button>
            <button
              className={`${styles.modeBtn} ${mode === 'manual' ? styles.modeBtnActive : ''}`}
              onClick={() => setMode('manual')}
            >
              <Type size={18} /> 手動輸入
            </button>
          </div>

          {mode === 'upload' ? (
            <div
              className={`file-upload ${dragActive ? 'file-upload-active' : ''} ${styles.uploadArea}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload-input"
              />
              {uploadedFile ? (
                <div className={styles.filePreview}>
                  <FileText size={48} color="var(--color-cta)" />
                  <div className={styles.fileName}>{uploadedFile.name}</div>
                  <div className={styles.fileSize}>
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </div>
                  <button
                    className={styles.removeFile}
                    onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                  >
                    <X size={16} /> 移除
                  </button>
                </div>
              ) : (
                <>
                  <div className="file-upload-icon">
                    <Upload size={48} />
                  </div>
                  <p className="file-upload-text">拖放履歷檔案到此處</p>
                  <p className="file-upload-hint">或點擊選擇檔案・支援 PDF、Word、TXT</p>
                </>
              )}
            </div>
          ) : (
            <div className={styles.manualForm}>
              <div className={styles.formGroup}>
                <label className="input-label" htmlFor="education">學歷</label>
                <textarea
                  id="education"
                  className={`input ${styles.textarea}`}
                  placeholder="例如：國立台灣大學 資訊管理學系 大三在學"
                  value={manualData.education}
                  onChange={(e) => setManualData(d => ({ ...d, education: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label className="input-label" htmlFor="experience">社團 / 活動 / 工作經歷</label>
                <textarea
                  id="experience"
                  className={`input ${styles.textarea}`}
                  placeholder="例如：攝影社公關長，負責社群經營與活動攝影記錄。&#13;&#10;台北青年創業論壇活動志工，服務超過 200 位參與者。"
                  rows={5}
                  value={manualData.experience}
                  onChange={(e) => setManualData(d => ({ ...d, experience: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label className="input-label" htmlFor="skills">技能</label>
                <textarea
                  id="skills"
                  className={`input ${styles.textarea}`}
                  placeholder="例如：社群經營、文案撰寫、Canva、Python 基礎、Excel"
                  value={manualData.skills}
                  onChange={(e) => setManualData(d => ({ ...d, skills: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label className="input-label" htmlFor="projects">專題 / 競賽（選填）</label>
                <textarea
                  id="projects"
                  className={`input ${styles.textarea}`}
                  placeholder="例如：行銷管理課程專題報告，獲得全班最佳專題"
                  value={manualData.projects}
                  onChange={(e) => setManualData(d => ({ ...d, projects: e.target.value }))}
                />
              </div>
            </div>
          )}

          <div className={styles.actionArea}>
            <button
              className="btn btn-primary btn-lg w-full"
              disabled={!canAnalyze}
              onClick={handleAnalyze}
            >
              <Sparkles size={20} />
              開始 AI 分析
              <ArrowRight size={18} />
            </button>
            <p className={styles.privacyNote}>
              你的資料僅用於分析，不會分享給第三方。你可以隨時刪除。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
