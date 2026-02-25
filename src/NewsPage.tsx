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
                            Biz.AI가 전하는 최신 업데이트와 인사이트를 확인하세요.
                        </p>
                    </motion.div>

                    {/* 1. 상단 하이라이트 (카드 뷰) */}
                    <div className="mb-24">
                        <h2 className="text-[24px] font-bold text-white mb-8 flex items-center gap-3">
                            <span className="text-blue-400">⚡️</span> 주요 소식
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "AI Agent Builder\nAI:ON-U 정식 출시", date: "Feb 20, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
                                { title: "Enterprise RAG\n엔진 2.0 업데이트", date: "Jan 15, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
                            ].map((news, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                                    className="group cursor-pointer bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                                >
                                    <div className="relative w-full aspect-video overflow-hidden bg-zinc-900 border-b border-white/5">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-white/10 text-white/90 text-[13px] font-semibold rounded-full">{news.tag}</span>
                                            <span className="text-white/40 text-[14px] font-medium">{news.date}</span>
                                        </div>
                                        <h3 className="text-white text-[26px] font-bold leading-snug whitespace-pre-line group-hover:text-blue-400 transition-colors">{news.title}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 2. 하단 리스트 & 사이드바 영역 */}
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* 좌측 메인 리스트 뷰 */}
                        <div className="flex-1">
                            <h2 className="text-[24px] font-bold text-white mb-8 border-b border-white/10 pb-4">
                                전체 소식
                            </h2>
                            <div className="flex flex-col gap-8">
                                {[
                                    { title: "Kt ds, AI Agent 도입 사례 공개", desc: "금융권부터 제조 영역까지, 실제 현장에서 활약 중인 Biz.AI의 다양한 도입 사례와 놀라운 성과를 상세히 공개합니다.", date: "Dec 22, 2025", tag: "Case Study", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
                                    { title: "2025 AI Trends Report 발간", desc: "올 한 해 주목해야 할 엔터프라이즈 AI 시장의 핵심 트렌드와 기술적 변화를 심층 분석한 리포트가 발간되었습니다.", date: "Nov 30, 2025", tag: "Insight", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
                                    { title: "Biz.AI 첫 밋업 행사 성황리 개최", desc: "고객사와 개발 파트너들이 한자리에 모여 AI 에이전트의 미래를 논의했던 첫 밋업 행사의 생생한 현장을 전달합니다.", date: "Oct 12, 2025", tag: "Event", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
                                    { title: "글로벌 클라우드 플랫폼 신규 파트너십", desc: "멀티 클라우드 환경에서도 더욱 안정적이고 유연한 AI 서비스가 가능하도록 글로벌 파트너십을 체결했습니다.", date: "Sep 05, 2025", tag: "Partnership", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800" }
                                ].map((news, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className="group flex flex-col-reverse sm:flex-row gap-6 items-center p-6 rounded-3xl bg-transparent hover:bg-[#111] border border-transparent hover:border-white/5 transition-all cursor-pointer"
                                    >
                                        <div className="flex-1 w-full">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-white/40 text-[14px] font-medium">{news.date}</span>
                                                <span className="text-white/20 text-[14px]">|</span>
                                                <span className="text-blue-400 text-[14px] font-medium">{news.tag}</span>
                                            </div>
                                            <h3 className="text-white text-[22px] font-bold leading-snug mb-3 group-hover:text-blue-400 transition-colors">{news.title}</h3>
                                            <p className="text-white/60 text-[16px] leading-relaxed line-clamp-2">{news.desc}</p>
                                        </div>

                                        <div className="w-full sm:w-[240px] shrink-0 aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 우측 사이드바 (추천 소식 & 태그) */}
                        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-12">
                            {/* 추천 소식 */}
                            <div>
                                <h3 className="text-[18px] font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="text-blue-400">🔥</span> 추천 소식
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { title: "AI:ON-U 도입 가이드", date: "Feb 10, 2026" },
                                        { title: "성공적인 RAG 시스템 구축을 위한 5가지 원칙", date: "Jan 05, 2026" },
                                        { title: "Biz.AI 요금제 개편 안내", date: "Dec 10, 2025" }
                                    ].map((item, i) => (
                                        <div key={i} className="group p-5 rounded-2xl bg-[#0e0e0e] border border-white/5 hover:border-white/20 hover:bg-[#141414] transition-all cursor-pointer">
                                            <div className="text-white/40 text-[12px] font-medium mb-2">{item.date}</div>
                                            <h4 className="text-white/90 text-[15px] font-bold leading-snug group-hover:text-white transition-colors">{item.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 인기 태그 */}
                            <div>
                                <h3 className="text-[18px] font-bold text-white mb-6">인기 태그</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Product', 'AI Agent', 'RAG', 'Case Study', 'Insight', 'Event', 'Tech'].map((tag, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-white/70 text-[13px] font-medium hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                                            # {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
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
