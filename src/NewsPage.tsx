import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin, Youtube } from 'lucide-react';

import { HIGHLIGHT_NEWS, REGULAR_NEWS, NEWS_CATEGORIES } from '@/context/news/news-data';
import Footer from '@/components/Footer';

export default function NewsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("전체");
    const newsScrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    const scrollNews = (direction: 'left' | 'right') => {
        if (newsScrollRef.current) {
            const scrollAmount = 400; // 380px card + 24px gap
            newsScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleNewsScroll = () => {
        if (newsScrollRef.current) {
            setCanScrollLeft(newsScrollRef.current.scrollLeft > 10);
        }
    };

    // Scroll to top on mount
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
            {/* 1. GNB 영역 (App.tsx와 동일하게 구성하지만 링크는 '/' 및 기타 영역 유지) */}
            <nav className={`fixed w-full z-50 bg-black/[0.85] backdrop-blur-sm py-4 px-6 md:px-10 transition-colors duration-300 ${scrolled ? 'border-b border-white/20' : 'border-b border-transparent'}`}>
                <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                        <span className="text-xl font-bold text-white tracking-tighter hidden sm:inline">Biz.AI</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium tracking-tight">
                        <Link to="/platform" className="hover:text-white transition-colors">멀티 에이전트 플랫폼</Link>
                        <Link to="/use-cases" className="hover:text-white transition-colors">고객 사례</Link>
                        <Link to="/news" className="text-white font-semibold transition-colors">새로운 소식</Link>
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
                                <Link to="/use-cases" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</Link>
                                <Link to="/news" className="text-white font-bold py-1" onClick={() => setIsMenuOpen(false)}>새로운 소식</Link>
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

            {/* 2. 본문 컨텐츠 시작 */}
            <section className="pt-48 pb-32 flex-1">
                {/* 헤더 영역: 상단 타이틀 + 설명 */}
                <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-20">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col items-start text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <h1 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                                    새로운 소식
                                </h1>
                                <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                                    Biz.AI가 전하는 최신 업데이트와 인사이트를 확인하세요.
                                </p>
                            </motion.div>
                        </div>

                        {/* 내비게이션 버튼 */}
                        <div className="flex gap-2.5 mb-2">
                            <button
                                onClick={() => scrollNews('left')}
                                disabled={!canScrollLeft}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg ${canScrollLeft
                                    ? "bg-white text-black hover:bg-white/90 cursor-pointer"
                                    : "bg-white/20 text-white/30 cursor-not-allowed shadow-none"}`}
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={() => scrollNews('right')}
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/90 transition-all active:scale-95 shadow-lg cursor-pointer"
                            >
                                <ChevronRight size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 하이라이트 캐러셀 (우측 블리드 레이아웃) */}
                <div className="mb-24">
                    <div
                        ref={newsScrollRef}
                        onScroll={handleNewsScroll}
                        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] md:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
                    >
                        {HIGHLIGHT_NEWS.map((news, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer shrink-0 w-[380px]"
                                onClick={() => {
                                    navigate(`/news/${i + 1}`, { state: { news } });
                                }}
                            >
                                {/* 썸네일: 380 * 240 사이즈 */}
                                <div className="relative w-full aspect-[380/240] rounded-2xl overflow-hidden mb-5 bg-zinc-900 border border-white/5 shadow-2xl">
                                    <motion.img
                                        src={news.이미지}
                                        alt={news.타이틀}
                                        className="w-full h-full object-cover transition-all duration-700"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                                </div>
                                <div className="pt-2 px-1 flex-1 flex flex-col">
                                    <span className="text-blue-400 text-[14px] font-bold mb-3">{news.태그}</span>
                                    <h3 className="text-white text-[24px] font-bold leading-snug whitespace-pre-line group-hover:text-blue-400 transition-colors mb-4">{news.타이틀}</h3>
                                    <div className="flex items-center text-white/40 text-[14px] font-medium mt-auto">
                                        <span>{news.솔루션}</span>
                                        <span className="mx-2 text-[4px] opacity-50">●</span>
                                        <span>{news.날짜}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 카테고리 탭 - Sticky 적용 (풀 너비 라인) */}
                <div className="sticky top-[72px] lg:top-[64px] bg-black/[0.85] backdrop-blur-sm z-40 border-b border-white/20 mb-12">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center gap-8 h-[66px]">
                        {NEWS_CATEGORIES.map((category) => (
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
                                        layoutId="activeCategoryNews"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto px-6 md:px-10">
                    {/* 좌측 메인 리스트 뷰 */}
                    <div className="flex-1">

                        <div className="flex flex-col gap-8">
                            {[...HIGHLIGHT_NEWS, ...REGULAR_NEWS].filter(news => activeCategory === "전체" || news.태그 === activeCategory).map((news: any, i) => (
                                <motion.div
                                    key={i}
                                    onClick={() => {
                                        navigate(`/news/${i + 1}`, { state: { news } });
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group flex flex-col-reverse sm:flex-row gap-8 items-center py-8 rounded-3xl bg-transparent transition-all cursor-pointer"
                                >
                                    <div className="flex-1 w-full flex flex-col">
                                        <span className="text-blue-400 text-[14px] font-bold mb-3">{news.태그}</span>
                                        <h3 className="text-white text-[24px] font-bold leading-snug mb-3 group-hover:text-blue-400 transition-colors">{news.타이틀}</h3>
                                        <p className="text-white/60 text-[16px] leading-relaxed line-clamp-2 mb-6">{news.설명}</p>
                                        <div className="flex items-center text-white/40 text-[14px] font-medium mt-auto">
                                            <span>{news.솔루션}</span>
                                            <span className="mx-2 text-[4px] opacity-50">●</span>
                                            <span>{news.날짜}</span>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-[240px] shrink-0 aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                                        <img
                                            src={news.이미지}
                                            alt={news.타이틀}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Footer */}
            <Footer />
        </div>
    );
}

