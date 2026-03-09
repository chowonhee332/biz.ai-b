import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, ChevronRight, ChevronLeft, PlayCircle, Download, Linkedin, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PLATFORM_PAGE_CONFIG } from '@/context/platform/platform-data';
import Footer from '@/components/Footer';

export default function MultiAgentPlatformPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(PLATFORM_PAGE_CONFIG.sidebarItems[0]);
    const [scrolled, setScrolled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [activeTab]);

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
                                        <h2 className="text-[36px] font-bold text-white mb-5 break-keep">{currentContent.타이틀}</h2>
                                        <div className="text-white/60 text-[16px] leading-relaxed break-keep">
                                            <p>{currentContent.설명}</p>
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[16px] font-bold text-[#1A75FF] mb-5 tracking-wider uppercase">주요 고객군</h3>
                                        <p className="text-white/80 text-[16px] font-medium leading-relaxed">{currentContent.주요고객군}</p>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">핵심가치</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {currentContent.핵심가치.map((item, i) => (
                                                <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                    <h4 className="text-[16px] font-bold text-white mb-2">{item.타이틀}</h4>
                                                    <p className="text-white/60 text-[14px] leading-snug">{item.설명}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[16px] font-bold text-white mb-6 tracking-wider uppercase">주요기능</h3>
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-3">
                                            {currentContent.주요기능.map((feature, i) => (
                                                <div key={i} className="flex gap-4 text-white text-[16px]">
                                                    <span className="text-white/30 shrink-0">›</span>
                                                    <span className="break-keep">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {currentContent.주요특징이미지 && currentContent.주요특징이미지.length > 0 && (
                                        <div className="mb-12">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <div className="flex justify-between items-start mb-6 gap-4">
                                                    <div className="flex-1">
                                                        <h4 className="text-[20px] font-bold text-white mb-2">{currentContent.주요특징이미지[currentImageIndex].타이틀}</h4>
                                                        <p className="text-white/60 text-[16px] leading-relaxed break-keep">{currentContent.주요특징이미지[currentImageIndex].설명}</p>
                                                    </div>
                                                    {currentContent.주요특징이미지.length > 1 && (
                                                        <div className="flex gap-1.5 shrink-0 pt-1">
                                                            <button
                                                                onClick={() => setCurrentImageIndex((prev) => Math.max(0, prev - 1))}
                                                                disabled={currentImageIndex === 0}
                                                                className={`size-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all ${currentImageIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/20'}`}
                                                            >
                                                                <ChevronLeft className="size-4" strokeWidth={3} />
                                                            </button>
                                                            <button
                                                                onClick={() => setCurrentImageIndex((prev) => Math.min(currentContent.주요특징이미지!.length - 1, prev + 1))}
                                                                disabled={currentImageIndex === currentContent.주요특징이미지.length - 1}
                                                                className={`size-8 rounded-full bg-white flex items-center justify-center text-black transition-all shadow-lg ${currentImageIndex === currentContent.주요특징이미지.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/90'}`}
                                                            >
                                                                <ChevronRight className="size-4" strokeWidth={3} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                                                    <AnimatePresence mode="wait">
                                                        <motion.img
                                                            key={currentImageIndex}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -20 }}
                                                            transition={{ duration: 0.3 }}
                                                            src={currentContent.주요특징이미지[currentImageIndex].이미지URL}
                                                            alt={currentContent.주요특징이미지[currentImageIndex].타이틀}
                                                            className="w-full h-auto"
                                                        />
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">특장점</h3>
                                        <div className="bg-[#1A75FF]/10 rounded-2xl p-6 border border-[#1A75FF]/40 space-y-10">
                                            {currentContent.특장점.map((item, i) => (
                                                <div key={i} className="flex flex-col gap-3">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center">
                                                            <span className="text-[12px] font-bold text-[#1A75FF]">{(i + 1).toString().padStart(2, '0')}</span>
                                                        </div>
                                                        <h4 className="text-[18px] font-bold text-[#1A75FF] leading-tight">
                                                            {item.타이틀.replace(/^\d+\.\s*/, '')}
                                                        </h4>
                                                    </div>
                                                    <div className="pl-12">
                                                        <p className="text-white/60 text-[15px] leading-relaxed break-keep">
                                                            {item.설명}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">이렇게 활용하세요</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            {currentContent.주요활용시나리오.map((item, i) => (
                                                <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                    <h4 className="text-[16px] font-bold text-white mb-2">{item.타이틀}</h4>
                                                    <div className="flex items-start gap-2 text-white/60 text-[14px]">
                                                        <ChevronRight className="size-4 shrink-0 mt-0.5" />
                                                        <p className="leading-relaxed">{item.설명}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">고객사례</h3>
                                        <div className={`grid grid-cols-1 ${currentContent.고객사례.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
                                            {currentContent.고객사례.map((item, i) => (
                                                <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-[#1A75FF] transition-all group">
                                                    <div className="flex items-start gap-5 mb-7">
                                                        <div className="size-12 rounded-xl bg-[#1A75FF]/10 flex items-center justify-center text-2xl border border-[#1A75FF]/20">
                                                            {item.아이콘}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[18px] font-bold text-white mb-1 leading-tight">{item.기업명}</h4>
                                                            <span className="text-[14px] text-white/40">{item.산업분야}</span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6 mb-7">
                                                        {item.항목들.map((detail, idx) => (
                                                            <div key={idx}>
                                                                <span className="text-[14px] font-bold text-white/30 tracking-wider uppercase mb-2 block">{detail.타이틀}</span>
                                                                <p className={`text-[16px] leading-relaxed break-keep ${detail.타이틀 === '성과' ? 'text-[#1A75FF] font-bold' : 'text-white/70'}`}>
                                                                    {detail.내용}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {item.상세링크 && (
                                                        <Link to={item.상세링크} className="inline-flex items-center gap-2 text-[14px] font-bold text-white hover:text-white/80 hover:gap-3 transition-all">
                                                            자세히 보기 <ChevronRight className="size-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {currentContent.소개영상 && (
                                        <div className="mb-12">
                                            <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">소개영상</h3>
                                            <div className="aspect-video bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center justify-center group cursor-pointer relative overflow-hidden">
                                                <PlayCircle className="size-16 text-white/20 group-hover:text-[#1A75FF] group-hover:scale-110 transition-all duration-300 z-10" />
                                                <span className="mt-4 text-white/30 font-medium z-10">{currentContent.소개영상.타이틀} 재생하기</span>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    )}

                                    {currentContent.오퍼링 && (
                                        <div className="mb-12">
                                            <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">오퍼링</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {currentContent.오퍼링.map((offering, i) => (
                                                    <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-[#1A75FF] transition-all">
                                                        <h4 className="text-[18px] font-bold text-white mb-2">{offering.타이틀}</h4>
                                                        <p className="text-white/50 text-[14px] mb-6">{offering.설명}</p>
                                                        {offering.상세링크 && (
                                                            <Link to={offering.상세링크} className="inline-flex items-center gap-2 text-[14px] text-white hover:text-white/80 hover:gap-3 transition-all">
                                                                자세히 보기 <ChevronRight className="size-4" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 items-stretch">
                                        {currentContent.제품상세문의 && (
                                            <div className="flex flex-col h-full">
                                                <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">제품 상세 문의</h3>
                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col gap-4 items-start justify-center flex-1 min-h-[120px]">
                                                    <div className="flex items-center gap-3 text-white">
                                                        <Mail className="size-4" />
                                                        <span className="text-[16px]">{currentContent.제품상세문의.이메일}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-white">
                                                        <Phone className="size-4" />
                                                        <span className="text-[16px]">{currentContent.제품상세문의.전화번호}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentContent.관련리소스 && (
                                            <div className="flex flex-col h-full">
                                                <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">관련 리소스</h3>
                                                <div className="space-y-3 flex-1">
                                                    {currentContent.관련리소스.map((resource, i) => (
                                                        <button key={i} className="w-full flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#1A75FF] transition-all group text-left min-h-[52px]">
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-6 bg-[#1A75FF]/10 rounded flex items-center justify-center text-[9px] font-bold text-[#1A75FF]">
                                                                    {resource.파일타입}
                                                                </div>
                                                                <h4 className="text-[16px] text-white/90">{resource.타이틀}</h4>
                                                            </div>
                                                            <Download className="size-4 text-white/20 group-hover:text-[#1A75FF] transition-colors" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </main>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

