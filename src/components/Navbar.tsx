import { Menu, X, ChevronRight } from 'lucide-react';
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
    { name: '멀티 에이전트 플랫폼', path: '/platform', id: 'platform' },
    { name: '고객 사례', path: '/use-cases', id: 'use-cases' },
    { name: '새로운 소식', path: '/news', id: 'news' },
  ];

  return (
    <nav className={`fixed w-full z-50 bg-black/[0.8] backdrop-blur-md py-4 transition-all duration-300 ${scrolled ? 'border-b border-white/10 shadow-lg' : 'border-b border-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-0 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
          <span className="text-xl font-bold text-white tracking-tighter hidden sm:inline">Biz.AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-white/80 text-[15px] font-bold tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`transition-colors hover:text-white relative group ${activePage === link.id ? 'text-[#1A75FF] font-bold' : 'text-white/80 font-medium'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 group h-9">
              <img src="/ktds_white.png" alt="kt ds" className="h-4 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Button>
          </a>
          <Button size="sm" className="bg-white text-black hover:bg-white/90 px-4 py-0 h-9 rounded-lg font-bold text-[14px] group">
            AI Agent 스튜디오
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#000000] border-b border-white/10 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`text-[16px] font-bold py-1 ${activePage === link.id ? 'text-white' : 'text-white/60'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-3">
                <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 font-medium py-2">
                  <img src="/ktds_white.png" alt="kt ds" className="h-4 w-auto opacity-70" />
                  <span className="text-[15px]">kt ds 홈페이지</span>
                </a>
                <Button className="w-full bg-white text-black font-bold h-12 rounded-xl text-[15px]">
                  AI Agent 스튜디오 바로가기
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
