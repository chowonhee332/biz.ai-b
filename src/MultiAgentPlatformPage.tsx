import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, ChevronRight, PlayCircle, Download, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PLATFORM_PAGE_CONFIG } from '@/context/platform-data';

export default function MultiAgentPlatformPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(PLATFORM_PAGE_CONFIG.sidebarItems[0]);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sidebarItems = PLATFORM_PAGE_CONFIG.sidebarItems;
    const currentContent = PLATFORM_PAGE_CONFIG.products[activeTab];
    const heroText = PLATFORM_PAGE_CONFIG.hero;

    return (
        <div className="min-h-screen bg-[#000000] text-white font-pretendard flex flex-col">
            {/* GNB (Omitted for brevity, assuming standard GNB) */}
            <nav className={`fixed w-full z-50 bg-black/[0.85] backdrop-blur-sm py-4 px-6 md:px-10 transition-colors duration-300 ${scrolled ? 'border-b border-white/20' : 'border-b border-transparent'}`}>
                <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                        <span className="text-xl font-bold text-white tracking-tighter hidden sm:inline">Biz.AI</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium tracking-tight">
                        <Link to="/platform" className="text-white font-semibold transition-colors">멀티 에이전트 플랫폼</Link>
                        <Link to="/use-cases" className="hover:text-white transition-colors">고객 사례</Link>
                        <Link to="/news" className="hover:text-white transition-colors">새로운 소식</Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="hidden md:flex text-white/90 hover:text-white hover:bg-white/10 group">
                            <img src="/ktds_white.png" alt="kt ds" className="h-5 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" /> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </Button>
                        <Button size="sm" className="hidden md:flex bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md font-semibold font-pretendard group">
                            AI Agent 스튜디오 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </Button>
                        <button className="cursor-pointer lg:hidden text-white p-2 smooth-gpu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden absolute top-full left-0 right-0 bg-[#000000] py-4 px-6 md:px-10 overflow-hidden border-b border-white/20"
                        >
                            <div className="flex flex-col gap-4">
                                <Link to="/platform" className="text-white font-bold py-1" onClick={() => setIsMenuOpen(false)}>멀티 에이전트 플랫폼</Link>
                                <Link to="/use-cases" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</Link>
                                <Link to="/news" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>새로운 소식</Link>
                                <div className="pt-2 mt-2 border-t border-white/20 flex flex-col gap-2">
                                    <Button variant="ghost" size="sm" className="text-white/90 hover:text-white justify-start group hover:bg-transparent px-0 py-1 h-auto text-[16px]">
                                        <img src="/ktds_white.png" alt="kt ds" className="h-5 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" /> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-white/90 hover:text-white justify-start font-medium group px-0 py-1 h-auto text-[16px]">
                                        AI Agent 스튜디오 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <section className="pt-48 pb-32 flex-1 px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto mb-20">
                    <motion.div
                        key={activeTab + "header"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            {heroText.title}
                        </h1>
                        <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                            {heroText.description}
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-[1200px] mx-auto">
                    {/* Sticky Tabs */}
                    <div className="lg:hidden sticky top-[72px] bg-black/[0.85] backdrop-blur-sm z-40 border-b border-white/20 mb-12 -mx-6 md:-mx-10 px-6 md:px-10">
                        <div className="flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActiveTab(item)}
                                    className={`relative h-full text-[16px] font-bold transition-all shrink-0 flex items-center px-1 cursor-pointer ${activeTab === item ? "text-blue-500" : "text-white/30 hover:text-white/60"}`}
                                >
                                    {item}
                                    {activeTab === item && (
                                        <motion.div layoutId="activePlatformTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-20">
                        <aside className="hidden lg:block lg:w-[220px] shrink-0">
                            <ul className="flex flex-col gap-8 sticky top-[100px] border-l border-white/5 py-2">
                                {sidebarItems.map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={() => setActiveTab(item)}
                                            className={`pl-8 relative text-[18px] font-bold transition-all text-left w-full cursor-pointer ${activeTab === item ? "text-white" : "text-white/30 hover:text-white/60"}`}
                                        >
                                            {activeTab === item && <div className="absolute left-[-1.5px] top-0 bottom-0 w-[3px] bg-[#3B82F6] rounded-full" />}
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        <main className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="mb-12">
                                        <h2 className="text-[36px] font-bold text-white mb-6 break-keep">{currentContent.title}</h2>
                                        <div className="space-y-4 text-white/60 text-[16px] leading-relaxed break-keep">
                                            {currentContent.description.map((p, i) => <p key={i}>{p}</p>)}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[14px] font-bold text-[#0885FE] mb-4 tracking-wider uppercase">주요 고객군</h3>
                                        <p className="text-white/80 text-[16px] font-medium leading-relaxed">{currentContent.target}</p>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">핵심가치</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {currentContent.values.map((item, i) => (
                                                <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                    <h4 className="text-[15px] font-bold text-white mb-2">{item.title}</h4>
                                                    <p className="text-white/40 text-[13px] leading-snug">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">주요기능</h3>
                                        <div className="bg-white/5 rounded-2xl p-8 border border-white/5 space-y-4">
                                            {currentContent.features.map((feature, i) => (
                                                <div key={i} className="flex gap-4 text-white/60 text-[15px]">
                                                    <span className="text-white/30 shrink-0">›</span>
                                                    <span className="break-keep">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">특장점</h3>
                                        <div className="bg-[#0885FE]/5 rounded-2xl p-8 border border-[#0885FE]/10 space-y-10">
                                            {currentContent.pros.map((item, i) => (
                                                <div key={i}>
                                                    <h4 className="text-[17px] font-bold text-white mb-3">{item.title}</h4>
                                                    <p className="text-white/50 text-[15px] leading-relaxed whitespace-pre-line break-keep">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">고객사례</h3>
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 max-w-2xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="size-10 bg-white/10 rounded-lg flex items-center justify-center text-[20px]">{currentContent.case.icon}</div>
                                                <div>
                                                    <h4 className="text-[15px] font-bold text-white leading-tight">{currentContent.case.company}</h4>
                                                    <p className="text-white/40 text-[12px]">{currentContent.case.industry}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="text-[13px]">
                                                    <p className="text-white/30 mb-1">Challenge</p>
                                                    <p className="text-white/60">{currentContent.case.challenge}</p>
                                                </div>
                                                <div className="text-[13px]">
                                                    <p className="text-[#0885FE] font-bold mb-1">Result</p>
                                                    <p className="text-[#0885FE] font-bold whitespace-pre-line">{currentContent.case.result}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </main>
                    </div>
                </div>
            </section>

            <footer className="bg-[#000000] border-t border-white/20 py-12 px-6">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                            <span className="text-xl font-bold text-white tracking-tight">Biz.AI</span>
                        </Link>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed font-pretendard">
                            kt ds의 Biz.AI는 기업 환경에 최적화된 안전하고 효율적인 AI 에이전트 구축 플랫폼을 제공합니다.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all group border border-white/5"><Linkedin className="w-5 h-5 text-white/40 group-hover:text-white" /></a>
                            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all group border border-white/5"><Youtube className="w-5 h-5 text-white/40 group-hover:text-white" /></a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-[14px] font-pretendard uppercase tracking-wider mb-2">Platform</h4>
                            <Link to="/platform" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">멀티 에이전트 플랫폼</Link>
                            <Link to="/news" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">새로운 소식</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-[14px] font-pretendard uppercase tracking-wider mb-2">Company</h4>
                            <a href="#" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">제품 소개서</a>
                            <Link to="/use-cases" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">고객 사례</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-[14px] font-pretendard uppercase tracking-wider mb-2">Legal</h4>
                            <a href="#" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">개인정보처리방침</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
