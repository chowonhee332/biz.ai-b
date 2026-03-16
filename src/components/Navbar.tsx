import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  activePage?: 'home' | 'platform' | 'use-cases' | 'news';
}

export default function Navbar({ activePage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'AI 제품/서비스', path: '/platform', id: 'platform' },
    { name: '고객 사례', path: '/use-cases', id: 'use-cases' },
    { name: '새로운 소식', path: '/news', id: 'news' },
  ];

  return (
    <nav className={`fixed w-full z-50 backdrop-blur-md py-4 transition-all duration-300 ${scrolled ? 'border-b border-border-light shadow-lg' : 'border-b border-transparent'}`} style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}>
      <div className="max-w-[1280px] mx-auto container-responsive flex items-center">
        {/* Logo - Always visible */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
          <span className="text-xl font-bold text-text-primary tracking-tighter">Biz.AI</span>
        </Link>

        {/* Desktop Navigation - 정중앙 */}
        <div className="hidden lg:flex items-center gap-10 text-[15px] tracking-tight absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`transition-colors hover:text-text-primary ${activePage === link.id ? 'text-text-primary font-bold' : 'text-text-secondary font-medium'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary hover:bg-bg-active group h-9">
              <img src="/ktds_white.png" alt="kt ds" className="h-4 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Button>
          </a>
          <a href="https://studio.abclab.ktds.com/auth/login" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-text-primary text-bg-main hover:bg-text-primary/90 px-4 py-0 h-9 rounded-lg font-bold text-[14px] group">
              AI Agent 스튜디오
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button - Shown only below 1024px */}
        <Button
          variant="ghost"
          size="icon"
          rounded="lg"
          className="lg:hidden ml-auto text-text-primary h-10 w-10 hover:bg-bg-active"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 border-b border-border-light px-6 py-6 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`text-[16px] font-bold py-1 ${activePage === link.id ? 'text-text-primary' : 'text-text-secondary/60'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border-light my-2" />
              <div className="flex flex-col gap-5">
                <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text-secondary/60 font-medium py-1">
                  <span className="text-[16px]">kt ds 홈페이지</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
                <a href="https://studio.abclab.ktds.com/auth/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text-secondary/60 font-medium py-1">
                  <span className="text-[16px]">AI Agent 스튜디오</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
