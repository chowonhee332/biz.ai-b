import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  activePage?: 'home' | 'platform' | 'use-cases' | 'news';
  scrollLineProgress?: MotionValue<number>;
}

export default function Navbar({ activePage, scrollLineProgress }: NavbarProps) {
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
    <nav className={`fixed w-full z-50 py-4 transition-all duration-500 ${scrolled ? 'backdrop-blur-md shadow-lg border-b border-white/10' : 'backdrop-blur-none'}`} style={{ backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent' }}>
      <div className="max-w-[1280px] mx-auto container-responsive flex items-center">
        {/* Logo - Always visible */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
          <span className="text-[22px] font-bold text-text-primary tracking-tighter">Biz.AI</span>
        </Link>

        {/* Desktop Navigation - 정중앙 */}
        <div className="hidden lg:flex items-center gap-10 text-body-xs tracking-tight absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`transition-colors text-text-primary ${activePage === link.id ? 'font-bold' : 'font-medium'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-[0.7rem] ml-auto">
          <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-text-primary hover:text-text-primary hover:bg-bg-active group h-9">
              <img src="/ktds_white.png" alt="kt ds" className="h-5 w-auto object-contain transition-opacity" />
              <ArrowUpRight size={28} className="-ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Button>
          </a>
          <a href="https://studio.abclab.ktds.com/auth/login" target="_blank" rel="noopener noreferrer">
            <Button variant="premium" size="sm" className="px-4 py-0 h-9 rounded-[8px] font-bold hover:scale-100 group" style={{ fontSize: '15px' }}>
              AI Agent 스튜디오
              <ArrowUpRight size={28} stroke="black" className="-ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

      {/* Scroll Progress Line */}
      <div className="absolute bottom-[-1px] left-0 w-full h-[3px]">
        {scrollLineProgress && (
          <motion.div
            style={{ scaleX: scrollLineProgress, originX: 0 }}
            className="absolute inset-0 bg-blue-500"
          />
        )}
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
                  className={`text-body-sm font-bold py-1 ${activePage === link.id ? 'text-text-primary' : 'text-text-secondary/60'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border-light my-2" />
              <div className="flex flex-col gap-5">
                <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text-secondary/60 font-medium py-1">
                  <span className="text-body-sm">kt ds 홈페이지</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
                <a href="https://studio.abclab.ktds.com/auth/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text-secondary/60 font-medium py-1">
                  <span className="text-body-sm">AI Agent 스튜디오</span>
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
