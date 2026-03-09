import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin, Youtube } from 'lucide-react';

import { USE_CASES, USE_CASE_CATEGORIES } from '@/context/use-cases/use-case-data';
import Footer from '@/components/Footer';

export default function UseCasePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(USE_CASE_CATEGORIES[0]);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-white font-pretendard flex flex-col">
            {/* GNB */}
            <nav className={`fixed w-full z-50 bg-black/[0.85] backdrop-blur-sm py-4 px-6 md:px-10 transition-colors duration-300 ${scrolled ? 'border-b border-white/20' : 'border-b border-transparent'}`}>
                <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                        <span className="text-xl font-bold text-white tracking-tighter hidden sm:inline">Biz.AI</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium tracking-tight">
                        <Link to="/platform" className="hover:text-white transition-colors">멀티 에이전트 플랫폼</Link>
                        <Link to="/use-cases" className="text-white font-semibold transition-colors">고객 사례</Link>
                        <Link to="/news" className="hover:text-white transition-colors">새로운 소식</Link>
                    </div>

                    {/* Right: CTA Buttons */}
                    <div className="flex items-center gap-3">
                        <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="hidden md:flex text-white/90 hover:text-white hover:bg-white/10 group">
                                <img src="/ktds_white.png" alt="kt ds" className="h-5 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" /> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                            </Button>
                        </a>
                        <Button size="sm" className="hidden md:flex bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md font-semibold font-pretendard group">
                            AI Agent 스튜디오 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </Button>
                        <button className="cursor-pointer lg:hidden text-white p-2 smooth-gpu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden absolute top-full left-0 right-0 bg-[#000000] py-4 px-6 md:px-10 overflow-hidden border-b border-white/20"
                        >
                            <div className="flex flex-col gap-4">
                                <Link to="/platform" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>멀티 에이전트 플랫폼</Link>
                                <Link to="/use-cases" className="text-white font-bold py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</Link>
                                <Link to="/news" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>새로운 소식</Link>
                                <div className="pt-2 mt-2 border-t border-white/20 flex flex-col gap-2">
                                    <a href="https://www.ktds.com/" target="_blank" rel="noopener noreferrer" className="w-full">
                                        <Button variant="ghost" size="sm" className="text-white/90 hover:text-white justify-start group hover:bg-transparent px-0 py-1 h-auto text-[16px] w-full">
                                            <img src="/ktds_white.png" alt="kt ds" className="h-5 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" /> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                        </Button>
                                    </a>
                                    <Button variant="ghost" size="sm" className="text-white/90 hover:text-white justify-start font-medium group px-0 py-1 h-auto text-[16px]">
                                        AI Agent 스튜디오 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Content Body */}
            <section className="pt-48 pb-32 flex-1">
                {/* Header Section */}
                <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            Use Cases
                        </h1>
                        <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                            다양한 산업 분야에서 Biz.AI를 통해 실현된 혁신 사례를 소개합니다.
                        </p>
                    </motion.div>
                </div>

                {/* 카테고리 탭 - Sticky 적용 (풀 너비 라인) */}
                <div className="sticky top-[72px] lg:top-[64px] bg-black/[0.85] backdrop-blur-sm z-40 border-b border-white/20 mb-12">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {USE_CASE_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full text-[16px] font-medium transition-colors flex items-center px-1 cursor-pointer ${activeCategory === category
                                    ? "text-blue-500"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryUseCase"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto px-6 md:px-10">

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {
                            USE_CASES.filter(item => activeCategory === "전체" || item.카테고리 === activeCategory).map((item, i) => (
                                <motion.div
                                    key={i}
                                    onClick={() => navigate(`/use-cases/${i + 1}`, { state: { news: item } })}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                    className="group cursor-pointer flex flex-col"
                                >
                                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-zinc-900 border border-white/5">
                                        <img src={item.이미지} alt={item.타이틀} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-blue-500 text-[15px] font-medium transition-colors">
                                            {item.산업군}
                                        </span>
                                        <h3 className="text-white text-[22px] font-bold leading-tight group-hover:text-blue-400 transition-colors whitespace-pre-line">
                                            {item.타이틀}
                                        </h3>
                                        <p className="text-white/50 text-[15px] leading-relaxed line-clamp-2">
                                            {item.설명}
                                        </p>
                                        <div className="mt-1">
                                            <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[13px] font-bold text-blue-400 inline-block">
                                                {item.태그}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

