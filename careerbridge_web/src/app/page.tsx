'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileSearch, Target, BarChart3, GraduationCap, Building2, ClipboardCheck,
  ArrowRight, Star, ChevronLeft, ChevronRight, Sparkles, Upload,
  BriefcaseBusiness, TrendingUp, Users, Compass
} from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import styles from './page.module.css';

/* ---------- Animated Counter ---------- */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, 20);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ---------- Feature Card ---------- */
const features = [
  { icon: FileSearch, title: 'AI 履歷解析', desc: '上傳履歷，AI 自動解析出技能標籤、經歷亮點與適合的職務方向' },
  { icon: Target, title: '智慧匹配評分', desc: '根據你的能力與職缺需求，計算多面向匹配分數並解釋原因' },
  { icon: BarChart3, title: '技能落差分析', desc: '精確指出你與目標職缺的差距，給出可執行的補強建議' },
  { icon: GraduationCap, title: '履歷優化助理', desc: '針對目標職缺，自動給出履歷改寫建議與量化成果範例' },
  { icon: Building2, title: '公共資源導流', desc: '整合 TYS、青年職涯平臺、就服處等台北官方資源，智慧推薦' },
  { icon: ClipboardCheck, title: '面試準備助理', desc: '依職缺內容產生常見面試題、建議回答方向與自我介紹模板' },
];

/* ---------- How It Works ---------- */
const steps = [
  { num: '01', icon: Upload, title: '上傳履歷或輸入經歷', desc: '支援 PDF、Word 或手動輸入你的學歷、社團、競賽經歷' },
  { num: '02', icon: Sparkles, title: 'AI 全方位分析', desc: '解析你的能力、匹配適合職缺、找出技能落差與改善建議' },
  { num: '03', icon: TrendingUp, title: '展開行動計畫', desc: '收到個人化職缺推薦、履歷修改建議與每週行動清單' },
];

export default function HomePage() {
  const [testIdx, setTestIdx] = useState(0);
  const { ref: featSectionRef, isVisible: featVisible } = useAnimateOnScroll();
  const { ref: howSectionRef, isVisible: howVisible } = useAnimateOnScroll();
  const { ref: statsSectionRef, isVisible: statsVisible } = useAnimateOnScroll();
  const { ref: testSectionRef } = useAnimateOnScroll();

  const nextTest = () => setTestIdx((i) => (i + 1) % testimonials.length);
  const prevTest = () => setTestIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      {/* === HERO === */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
        </div>
        <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={styles.heroContent}
          >
            <span className={styles.heroBadge}>
              <Sparkles size={14} />
              AI 驅動的青年職涯媒合平台
            </span>
            <h1 className={styles.heroTitle}>
              讓你更快找到<br />
              <span className={styles.heroGradient}>適合的機會</span>
            </h1>
            <p className={styles.heroDesc}>
              CareerBridge 協助台北青年在求職、找實習時，了解自己的能力、看懂職缺需求、
              找出技能差距，並串接台北既有職涯資源。不只找職缺，更幫你找到下一步。
            </p>
            <div className={styles.heroActions}>
              <Link href="/upload" className="btn btn-primary btn-lg">
                <Upload size={20} />
                上傳履歷開始分析
              </Link>
              <Link href="/onboarding" className="btn btn-secondary btn-lg">
                我想先探索
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className={styles.heroQuickLinks}>
              <Link href="/jobs?type=實習" className={styles.quickLink}>
                <BriefcaseBusiness size={16} /> 找實習
              </Link>
              <Link href="/jobs?type=正職" className={styles.quickLink}>
                <Target size={16} /> 找工作
              </Link>
              <Link href="/resume" className={styles.quickLink}>
                <FileSearch size={16} /> 改善履歷
              </Link>
              <Link href="/resources" className={styles.quickLink}>
                <Compass size={16} /> 官方資源
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === STATS === */}
      <section className={`section ${styles.statsSection}`} ref={statsSectionRef}>
        <div className="page-container">
          <div className={styles.statsGrid}>
            {[
              { value: 1200, suffix: '+', label: '職缺資料庫' },
              { value: 5000, suffix: '+', label: '青年使用者' },
              { value: 89, suffix: '%', label: '推薦滿意度' },
              { value: 340, suffix: '+', label: '成功媒合' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`card ${styles.statItem}`}
                initial={{ opacity: 0, y: 20 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="stat-value">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <p className={styles.statsNote}>
            以上數據為目前示範站使用的模擬資料，正式上線後會改接真實平台與分析結果。
          </p>
        </div>
      </section>

      {/* === FEATURES === */}
      <section className="section" ref={featSectionRef}>
        <div className="page-container">
          <div className="section-header">
            <span className="section-label">核心功能</span>
            <h2>六大 AI 功能，陪你走完求職每一步</h2>
            <p>從認識自己到拿到 offer，CareerBridge 讓每個階段都更有方向</p>
          </div>
          <div className="grid-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className={`card card-hover ${styles.featureCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={featVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className={styles.featureIcon}>
                  <f.icon size={24} />
                </div>
                <h4>{f.title}</h4>
                <p className={styles.featureDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className={`section ${styles.howSection}`} ref={howSectionRef}>
        <div className="page-container">
          <div className="section-header">
            <span className="section-label">使用流程</span>
            <h2>三步驟，開啟你的職涯行動</h2>
            <p>不再迷惘，從上傳履歷到展開行動只需要 5 分鐘</p>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 20 }}
                animate={howVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepIconWrap}>
                  <s.icon size={32} />
                </div>
                <h4>{s.title}</h4>
                <p className={styles.stepDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className="section" ref={testSectionRef}>
        <div className="page-container">
          <div className="section-header">
            <span className="section-label">使用者回饋</span>
            <h2>聽聽他們怎麼說</h2>
            <p>真實使用者的求職體驗分享</p>
          </div>
          <motion.div
            className={styles.testimonialCard}
            key={testIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.testimonialStars}>
              {Array.from({ length: testimonials[testIdx].rating }).map((_, i) => (
                <Star key={i} size={18} fill="var(--color-warning)" color="var(--color-warning)" />
              ))}
            </div>
            <p className={styles.testimonialContent}>
              &ldquo;{testimonials[testIdx].content}&rdquo;
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}>
                {testimonials[testIdx].avatar}
              </div>
              <div>
                <div className={styles.testimonialName}>{testimonials[testIdx].name}</div>
                <div className={styles.testimonialRole}>{testimonials[testIdx].role}</div>
              </div>
            </div>
            <div className={styles.testimonialNav}>
              <button onClick={prevTest} className={styles.testimonialBtn} aria-label="上一則">
                <ChevronLeft size={20} />
              </button>
              <span className={styles.testimonialDots}>
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${i === testIdx ? styles.dotActive : ''}`}
                    onClick={() => setTestIdx(i)}
                  />
                ))}
              </span>
              <button onClick={nextTest} className={styles.testimonialBtn} aria-label="下一則">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === RESOURCES PREVIEW === */}
      <section className={`section ${styles.resourcesSection}`}>
        <div className="page-container">
          <div className="section-header">
            <span className="section-label">台北官方資源</span>
            <h2>整合台北既有職涯服務</h2>
            <p>CareerBridge 不跟政府服務競爭，而是成為更聰明的前導入口</p>
          </div>
          <div className={styles.resourcesGrid}>
            {[
              { icon: Compass, name: 'TYS 職涯發展中心', desc: '一對一諮詢、履歷健診、模擬面試' },
              { icon: BriefcaseBusiness, name: '青年職涯發展平臺', desc: '實習職缺搜尋與媒合' },
              { icon: Building2, name: '就業服務處', desc: '求職登記、就業諮商、職業心理測驗' },
              { icon: Users, name: '就業服務站', desc: '各區就近服務據點' },
            ].map((r, i) => (
              <div key={i} className={`card card-hover ${styles.resourceCard}`}>
                <r.icon size={28} color="var(--color-primary)" />
                <h5>{r.name}</h5>
                <p className={styles.resourceDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link href="/resources" className="btn btn-secondary">
              查看完整資源 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className={styles.ctaSection}>
        <div className="page-container">
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>準備好找到你的下一步了嗎？</h2>
            <p>5 分鐘完成分析，馬上獲得個人化職缺推薦與行動計畫</p>
            <div className={styles.ctaActions}>
              <Link href="/upload" className="btn btn-primary btn-lg">
                立即開始
                <ArrowRight size={18} />
              </Link>
              <Link href="/onboarding" className="btn btn-ghost btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                先做快速探索
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
