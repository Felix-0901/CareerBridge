import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '96px 0' }}>
      <div className="page-container" style={{ maxWidth: 720, textAlign: 'center' }}>
        <span className="section-label">404</span>
        <h1 style={{ marginBottom: 'var(--space-md)' }}>這個頁面不存在</h1>
        <p style={{ color: 'var(--color-text-light)', marginBottom: 'var(--space-xl)' }}>
          可能是連結已變更，或你剛剛進到一個無效的職缺路徑。你可以回首頁，或直接回到推薦列表繼續操作。
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-secondary">
            回首頁
          </Link>
          <Link href="/jobs" className="btn btn-primary">
            查看推薦職缺
          </Link>
        </div>
      </div>
    </div>
  );
}
