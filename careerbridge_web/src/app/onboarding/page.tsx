'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, User, Briefcase, ChevronRight, ChevronLeft,
  Check, Sparkles, BookOpen, Code, Palette, BarChart3, Globe,
  Heart, Megaphone, Building2, Leaf
} from 'lucide-react';
import { skillCategories, interestAreas } from '@/data/skills';
import styles from './page.module.css';

const userTypes = [
  { id: 'highschool', label: '高中生', icon: BookOpen, desc: '想探索職涯方向、找第一個實習' },
  { id: 'college', label: '大學生', icon: GraduationCap, desc: '想找暑期實習、優化履歷' },
  { id: 'fresh', label: '社會新鮮人', icon: Briefcase, desc: '想找第一份工作、精準投遞' },
];

const jobGoals = [
  { id: 'internship', label: '實習', icon: BookOpen },
  { id: 'parttime', label: '兼職', icon: User },
  { id: 'fulltime', label: '正職', icon: Briefcase },
];

const industryIcons: Record<string, React.ElementType> = {
  '科技業': Code, '設計創意': Palette, '行銷廣告': Megaphone,
  '金融業': BarChart3, '媒體傳播': Globe, '教育培訓': GraduationCap,
  '醫療健康': Heart, '社會服務': Heart, '環境永續': Leaf,
  '政府機關': Building2, '非營利組織': Heart, '新創企業': Sparkles,
};

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [jobGoal, setJobGoal] = useState('');
  const [preferences, setPreferences] = useState({ industry: '', commute: '', schedule: '' });

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!userType;
      case 2: return selectedInterests.length > 0;
      case 3: return selectedSkills.length > 0;
      case 4: return !!jobGoal;
      case 5: return true;
      default: return false;
    }
  };

  const handleFinish = () => {
    router.push('/upload');
  };

  return (
    <div className={styles.container}>
      <div className="page-container">
        <div className={styles.wrapper}>
          {/* Progress */}
          <div className="step-indicator" style={{ marginBottom: 'var(--space-2xl)' }}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className="step-item">
                <div className={`step-dot ${i + 1 < step ? 'completed' : ''} ${i + 1 === step ? 'active' : ''}`}>
                  {i + 1 < step ? <Check size={16} /> : i + 1}
                </div>
                {i < TOTAL_STEPS - 1 && (
                  <div className={`step-line ${i + 1 < step ? 'completed' : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className={styles.stepContent}
            >
              {step === 1 && (
                <>
                  <h2 className={styles.stepTitle}>你是哪種使用者？</h2>
                  <p className={styles.stepDesc}>選擇最符合你目前狀態的身分</p>
                  <div className={styles.typeGrid}>
                    {userTypes.map((t) => (
                      <div
                        key={t.id}
                        className={`card card-hover ${styles.typeCard} ${userType === t.id ? styles.selected : ''}`}
                        onClick={() => setUserType(t.id)}
                      >
                        <t.icon size={32} color="var(--color-primary)" />
                        <h4>{t.label}</h4>
                        <p>{t.desc}</p>
                        {userType === t.id && <div className={styles.checkBadge}><Check size={16} /></div>}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className={styles.stepTitle}>你對哪些領域有興趣？</h2>
                  <p className={styles.stepDesc}>可以選擇多個，幫助我們推薦更準確的職缺</p>
                  <div className={styles.tagsWrap}>
                    {interestAreas.map((area) => {
                      const Icon = industryIcons[area] || Sparkles;
                      return (
                        <button
                          key={area}
                          className={`${styles.tagBtn} ${selectedInterests.includes(area) ? styles.tagActive : ''}`}
                          onClick={() => toggleInterest(area)}
                        >
                          <Icon size={14} />
                          {area}
                        </button>
                      );
                    })}
                  </div>
                  <p className={styles.count}>已選 {selectedInterests.length} 個</p>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className={styles.stepTitle}>你目前具備哪些技能？</h2>
                  <p className={styles.stepDesc}>選擇你已經有的能力，我們會找出還需要補強的地方</p>
                  {skillCategories.map((cat) => (
                    <div key={cat.name} className={styles.skillGroup}>
                      <h5 className={styles.skillGroupTitle}>{cat.name}</h5>
                      <div className={styles.tagsWrap}>
                        {cat.skills.map((skill) => (
                          <button
                            key={skill}
                            className={`${styles.tagBtn} ${selectedSkills.includes(skill) ? styles.tagActive : ''}`}
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className={styles.count}>已選 {selectedSkills.length} 個技能</p>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className={styles.stepTitle}>你想找什麼類型的機會？</h2>
                  <p className={styles.stepDesc}>選擇你目前的求職目標</p>
                  <div className={styles.typeGrid}>
                    {jobGoals.map((g) => (
                      <div
                        key={g.id}
                        className={`card card-hover ${styles.typeCard} ${jobGoal === g.id ? styles.selected : ''}`}
                        onClick={() => setJobGoal(g.id)}
                      >
                        <g.icon size={32} color="var(--color-primary)" />
                        <h4>{g.label}</h4>
                        {jobGoal === g.id && <div className={styles.checkBadge}><Check size={16} /></div>}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <h2 className={styles.stepTitle}>偏好設定</h2>
                  <p className={styles.stepDesc}>選填，幫助我們推薦更符合的職缺</p>
                  <div className={styles.formGroup}>
                    <label className="input-label">偏好產業</label>
                    <select
                      className="input"
                      value={preferences.industry}
                      onChange={(e) => setPreferences(p => ({ ...p, industry: e.target.value }))}
                    >
                      <option value="">不限</option>
                      {interestAreas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className="input-label">通勤範圍</label>
                    <select
                      className="input"
                      value={preferences.commute}
                      onChange={(e) => setPreferences(p => ({ ...p, commute: e.target.value }))}
                    >
                      <option value="">不限</option>
                      <option value="30">30 分鐘以內</option>
                      <option value="60">60 分鐘以內</option>
                      <option value="remote">可接受遠端</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className="input-label">可工作時段</label>
                    <select
                      className="input"
                      value={preferences.schedule}
                      onChange={(e) => setPreferences(p => ({ ...p, schedule: e.target.value }))}
                    >
                      <option value="">不限</option>
                      <option value="weekday">平日白天</option>
                      <option value="weekend">週末</option>
                      <option value="flexible">彈性時間</option>
                    </select>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className={styles.navActions}>
            {step > 1 && (
              <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft size={18} /> 上一步
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < TOTAL_STEPS ? (
              <button
                className="btn btn-primary"
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
              >
                下一步 <ChevronRight size={18} />
              </button>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={handleFinish}>
                <Sparkles size={18} /> 完成，開始分析
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
