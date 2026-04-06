'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BriefcaseBusiness } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: '首頁' },
  { href: '/jobs', label: '職缺推薦' },
  { href: '/analysis', label: 'AI 分析' },
  { href: '/skills', label: '技能落差' },
  { href: '/resources', label: '公共資源' },
  { href: '/dashboard', label: '儀表板' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
      <Link href="/" className="navbar-brand" aria-label="CareerBridge 首頁">
        <BriefcaseBusiness size={28} />
        <span>CareerBridge</span>
      </Link>

      <div className={`navbar-nav ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-link ${pathname === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="navbar-actions">
        <Link href="/upload" className={`btn btn-primary btn-sm ${styles.navCta}`}>
          開始分析
        </Link>
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? '關閉選單' : '開啟選單'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
