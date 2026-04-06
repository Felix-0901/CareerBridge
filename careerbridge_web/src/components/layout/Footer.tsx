import Link from 'next/link';
import { BriefcaseBusiness, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="page-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BriefcaseBusiness size={24} />
              CareerBridge
            </div>
            <p className="footer-desc">
              AI 青年求職／實習媒合助理，讓台北青年更快找到適合的職缺、補齊差距、接上真正的機會。
            </p>
          </div>

          <div>
            <h4 className="footer-heading">功能</h4>
            <div className="footer-links">
              <Link href="/upload">履歷分析</Link>
              <Link href="/jobs">職缺推薦</Link>
              <Link href="/skills">技能落差</Link>
              <Link href="/resume">履歷優化</Link>
              <Link href="/interview">面試準備</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">資源</h4>
            <div className="footer-links">
              <Link href="/resources">公共資源</Link>
              <a href="https://tys.gov.taipei" target="_blank" rel="noopener noreferrer">TYS 職涯中心</a>
              <a href="https://youth.gov.taipei" target="_blank" rel="noopener noreferrer">青年職涯平臺</a>
              <a href="https://eso.gov.taipei" target="_blank" rel="noopener noreferrer">就業服務處</a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">關於</h4>
            <div className="footer-links">
              <Link href="/onboarding">開始使用</Link>
              <Link href="/dashboard">求職進度</Link>
              <span>隱私權政策</span>
              <span>使用條款</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CareerBridge. 2026 YTP 高中組參賽作品</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Made with <Heart size={14} style={{ color: '#EF4444' }} /> in Taipei
          </p>
        </div>
      </div>
    </footer>
  );
}
