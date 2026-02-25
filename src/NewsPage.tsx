import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin, Youtube } from 'lucide-react';

export default function NewsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-pretendard flex flex-col">
            {/* 1. GNB 영역 (App.tsx와 동일하게 구성하지만 링크는 '/' 및 기타 영역 유지) */}
            <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl py-4 px-6 md:px-10 border-b border-white/5">
                <div className="max-w-[1240px] mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                        <span className="text-[22px] font-bold text-white tracking-tight hidden sm:inline">Biz.AI</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium">
                        <Link to="/" className="hover:text-white transition-colors">멀티 에이전트 플랫폼</Link>
                        <Link to="/#use-cases" className="hover:text-white transition-colors">고객 사례</Link>
                        <Link to="/news" className="text-white font-bold transition-colors">새로운 소식</Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="hidden md:flex text-white/90 hover:text-white hover:bg-white/10 text-[14px] font-medium h-9 px-4">
                            kt ds <ExternalLink size={14} className="ml-1" />
                        </Button>
                        <Button size="sm" className="hidden md:flex bg-white text-black hover:bg-white/90 px-5 h-9 rounded-full text-[14px] font-bold transition-all hover:scale-105 active:scale-95">
                            AI Agent 스튜디오 <ExternalLink size={14} className="ml-1" />
                        </Button>
                        <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴">
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
                            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl py-4 px-6 overflow-hidden border-b border-white/10"
                        >
                            <div className="flex flex-col gap-4">
                                <Link to="/" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>멀티 에이전트 플랫폼</Link>
                                <Link to="/#use-cases" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</Link>
                                <Link to="/news" className="text-white font-bold py-1" onClick={() => setIsMenuOpen(false)}>새로운 소식</Link>
                                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                                    <Button variant="ghost" className="text-white/90 hover:text-white justify-start h-10 font-medium">
                                        kt ds <ExternalLink size={14} className="ml-2" />
                                    </Button>
                                    <Button className="bg-white text-black hover:bg-white/90 w-full justify-center h-12 rounded-full font-bold text-[15px]">
                                        AI Agent 스튜디오 <ExternalLink size={14} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* 2. 본문 컨텐츠 시작 */}
            <section className="pt-48 pb-32 px-6 flex-1">
                <div className="max-w-[1240px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center md:text-left mb-20"
                    >
                        <h1 className="text-[48px] md:text-[64px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            새로운 소식
                        </h1>
                        <p className="text-white/70 text-[20px] max-w-2xl font-medium leading-relaxed">
                            Biz.AI의 최신 업데이트, 인사이트 및 제품 공지사항을 확인하세요.
                        </p>
                    </motion.div>

                    {/* 간소화된 뉴스 리스트 플레이스홀더 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "AI Agent Builder\nAI:ON-U 정식 출시", date: "Feb 20, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
                            { title: "Enterprise RAG\n엔진 2.0 업데이트", date: "Jan 15, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
                            { title: "Kt ds, AI Agent\n도입 사례 공개", date: "Dec 22, 2025", tag: "Case Study", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
                            { title: "2025 AI Trends\nReport 발간", date: "Nov 30, 2025", tag: "Insight", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
                            { title: "Biz.AI 첫\n밋업 행사 개최 안내", date: "Oct 12, 2025", tag: "Event", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
                            { title: "신규 파트너십\n체결 발표", date: "Sep 05, 2025", tag: "Partnership", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800" }
                        ].map((news, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                                className="group cursor-pointer"
                            >
                                {/* 썸네일 */}
                                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-zinc-900 border border-white/5 shadow-2xl">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                                </div>

                                {/* 텍스트 */}
                                <h3 className="text-white text-[22px] font-bold leading-snug mb-4 whitespace-pre-line group-hover:text-blue-400 transition-colors">{news.title}</h3>
                                <div className="flex items-center gap-3 mt-auto">
                                    <span className="text-white/60 text-[15px] font-medium">{news.date}</span>
                                    <span className="text-white/40 text-[15px]">·</span>
                                    <span className="text-white/60 text-[15px] font-medium">{news.tag}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Footer */}
            <footer className="bg-[#0a0a0a] py-32 px-6 border-t border-white/5">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-24">
                        <div className="flex flex-col">
                            <div className="mb-8">
                                <h4 className="text-[22px] font-bold text-white tracking-tight">kt ds</h4>
                            </div>
                            <p className="text-white/80 text-[16px] leading-relaxed mb-10 break-keep font-medium">
                                비즈니스를 위한 엔터프라이즈급<br />
                                AI Agent 플랫폼
                            </p>
                            <div className="flex gap-4 mt-auto">
                                <a href="#" className="text-white/40 hover:text-white transition-all">
                                    <Linkedin size={22} strokeWidth={1.5} />
                                </a>
                                <a href="#" className="text-white/40 hover:text-white transition-all">
                                    <Youtube size={22} strokeWidth={1.5} />
                                </a>
                                <a href="#" className="text-white/40 hover:text-white transition-all">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white font-bold text-[16px]">Solutions</h4>
                            <div className="flex flex-col gap-4">
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">AI Agent Builder</a>
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Enterprise RAG</a>
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Multi-Agent System</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white font-bold text-[16px]">Product</h4>
                            <div className="flex flex-col gap-4">
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Features</a>
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Pricing</a>
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Case Studies</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white font-bold text-[16px]">Company</h4>
                            <div className="flex flex-col gap-4">
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">About</a>
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Blog</a>
                                <a href="#" className="text-white/60 hover:text-white text-[15px] font-medium transition-colors">Contact</a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
                        <p className="text-white/40 text-[14px]">
                            © 2026 kt ds. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-white/40 hover:text-white text-[14px] transition-colors">Privacy Policy</a>
                            <a href="#" className="text-white/40 hover:text-white text-[14px] transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
