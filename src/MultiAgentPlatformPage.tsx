import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, ChevronRight, ChevronLeft, Play, PlayCircle, Download, Linkedin, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PLATFORM_PAGE_CONFIG } from '@/context/platform/platform-data';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

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
        <div className="min-h-screen bg-bg-main text-text-primary font-pretendard flex flex-col">
            {/* GNB (Omitted for brevity, assuming standard GNB) */}
            <Navbar activePage="platform" />

            <section className="pt-48 pb-32 flex-1">
                <div className="max-w-[1280px] mx-auto container-responsive mb-20">
                    <motion.div
                        key={activeTab + "header"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            {heroText.title}
                        </h1>
                        <p className="text-text-secondary text-[16px] max-w-2xl font-medium leading-relaxed">
                            {heroText.description}
                        </p>
                    </motion.div>
                </div>

                {/* Sticky Tabs - 데스크탑 제외 모바일용 */}
                <div className="lg:hidden sticky top-[72px] bg-bg-main/85 backdrop-blur-sm z-40 border-b border-border-light mb-12">
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {sidebarItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveTab(item)}
                                className={`relative h-full text-[14px] font-medium transition-all shrink-0 flex items-center px-1 cursor-pointer ${activeTab === item ? "text-brand-primary" : "text-text-dim hover:text-text-primary/60"}`}
                            >
                                {item}
                                {activeTab === item && (
                                    <motion.div layoutId="activePlatformTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto container-responsive">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <aside className="hidden lg:block lg:w-[220px] shrink-0">
                            <div className="flex flex-col gap-2 sticky top-[100px]">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setActiveTab(item)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[16px] font-semibold transition-all cursor-pointer ${activeTab === item
                                            ? "bg-brand-primary text-text-primary shadow-lg shadow-brand-primary/20"
                                            : "text-text-secondary/40 hover:text-text-primary/70 hover:bg-bg-surface"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
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
                                    <div className="mb-16">
                                        <h2 className="text-[28px] font-bold text-white mb-6 break-keep">{currentContent.타이틀}</h2>
                                        <div className="text-white/80 text-[16px] leading-relaxed break-keep font-medium">
                                            <p>{currentContent.설명}</p>
                                        </div>
                                    </div>

                                    <div className="mb-16">
                                        <h3 className="text-[14px] font-bold text-brand-primary mb-6 tracking-wider uppercase">주요 고객군</h3>
                                        <p className="text-text-secondary text-[16px] font-medium leading-relaxed">{currentContent.주요고객군}</p>
                                    </div>

                                    <div className="mb-16">
                                        <h3 className="text-[15px] font-bold text-brand-primary mb-6 tracking-wider uppercase">핵심가치</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {currentContent.핵심가치.map((item, i) => (
                                                <div key={i} className="bg-bg-surface/50 backdrop-blur-sm rounded-[20px] p-8 border border-border-light hover:border-text-primary/20 transition-all group">
                                                    <h4 className="text-[18px] font-bold text-text-primary mb-2">{item.타이틀}</h4>
                                                    <p className="text-text-secondary/60 text-[14px] leading-relaxed font-medium">{item.설명}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-16">
                                        <h3 className="text-[15px] font-bold text-brand-primary mb-6 tracking-wider uppercase">주요기능</h3>
                                        <div className="bg-bg-surface/50 backdrop-blur-sm rounded-[20px] p-8 border border-border-light space-y-[28px]">
                                            {currentContent.주요기능.map((feature, i) => {
                                                const [title, ...descParts] = feature.split(':');
                                                const description = descParts.join(':').trim();
                                                return (
                                                    <div key={i} className="flex flex-col gap-3 group/item">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-1 h-5 bg-brand-primary rounded-full" />
                                                            <div className="text-text-primary text-[18px] font-bold leading-tight">
                                                                {title.trim()}
                                                            </div>
                                                        </div>
                                                        {description && (
                                                            <div className="pl-4 text-text-dim text-[15px] leading-relaxed font-medium break-keep">
                                                                {description}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {currentContent.주요특징이미지 && currentContent.주요특징이미지.length > 0 && (
                                        <div className="mb-16">
                                            <div className="bg-white/[0.03] backdrop-blur-sm rounded-[20px] p-8 border border-white/10">
                                                <div className="flex justify-between items-start mb-6 gap-4">
                                                    <div className="flex-1">
                                                        <h4 className="text-[18px] font-bold text-white mb-2">{currentContent.주요특징이미지[currentImageIndex].타이틀}</h4>
                                                        <p className="text-white/60 text-[14px] leading-relaxed break-keep font-medium">{currentContent.주요특징이미지[currentImageIndex].설명}</p>
                                                    </div>
                                                    {currentContent.주요특징이미지.length > 1 && (
                                                        <div className="flex gap-1.5 shrink-0 pt-1">
                                                            <button
                                                                onClick={() => setCurrentImageIndex((prev) => Math.max(0, prev - 1))}
                                                                disabled={currentImageIndex === 0}
                                                                className={`size-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all ${currentImageIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/20'}`}
                                                            >
                                                                <ChevronLeft className="size-5" strokeWidth={3} />
                                                            </button>
                                                            <button
                                                                onClick={() => setCurrentImageIndex((prev) => Math.min(currentContent.주요특징이미지!.length - 1, prev + 1))}
                                                                disabled={currentImageIndex === currentContent.주요특징이미지.length - 1}
                                                                className={`size-10 rounded-full bg-white flex items-center justify-center text-black transition-all shadow-lg ${currentImageIndex === currentContent.주요특징이미지.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/90'}`}
                                                            >
                                                                <ChevronRight className="size-5" strokeWidth={3} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
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

                                    {currentContent.특장점 && currentContent.특장점.length > 0 && (
                                        <div className="mb-16">
                                            <h3 className="text-[15px] font-bold text-brand-primary mb-4 tracking-wider uppercase">특장점</h3>
                                            <div className="bg-brand-primary/[0.03] backdrop-blur-sm rounded-[20px] p-8 border border-brand-primary/20 space-y-10">
                                                {currentContent.특장점.map((item, i) => (
                                                    <div key={i} className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-6 rounded-full bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                                                                <span className="text-[10px] font-bold text-text-primary">{(i + 1).toString().padStart(2, '0')}</span>
                                                            </div>
                                                            <h4 className="text-[18px] font-bold text-text-primary leading-tight">
                                                                {item.타이틀.replace(/^\d+\.\s*/, '')}
                                                            </h4>
                                                        </div>
                                                        <div className="pl-10">
                                                            <p className="text-text-secondary/70 text-[14px] leading-relaxed break-keep font-medium">
                                                                {item.설명}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentContent.주요활용시나리오 && currentContent.주요활용시나리오.length > 0 && (
                                        <div className="mb-20">
                                            <h3 className="text-[15px] font-bold text-brand-primary mb-6 tracking-wider uppercase">이렇게 활용하세요</h3>
                                            <div className="grid grid-cols-1 gap-6">
                                                {currentContent.주요활용시나리오.map((item, i) => (
                                                    <div key={i} className="bg-bg-surface backdrop-blur-sm rounded-[20px] p-8 border border-border-light hover:border-brand-primary/30 transition-all">
                                                        <h4 className="text-[20px] font-bold text-text-primary mb-6 underline underline-offset-8 decoration-border-light">{item.타이틀}</h4>
                                                        <div className="flex items-start gap-4 text-text-secondary">
                                                            <div className="flex-1">
                                                                {item.설명.split('\n').map((line, idx) => {
                                                                    const trimmedLine = line.trim();
                                                                    if (!trimmedLine) return <div key={idx} className="h-4" />;

                                                                    const subHeaderRegex = /^(As-Is|To-Be|기대\s?효과|대상\s?사용자)/i;
                                                                    const isSubHeader = subHeaderRegex.test(trimmedLine);

                                                                    if (isSubHeader) {
                                                                        const colonIndex = trimmedLine.indexOf(':');
                                                                        const hasContentAfterColon = colonIndex !== -1 && trimmedLine.substring(colonIndex + 1).trim().length > 0;

                                                                        if (hasContentAfterColon) {
                                                                            const titlePart = trimmedLine.substring(0, colonIndex + 1);
                                                                            const contentPart = trimmedLine.substring(colonIndex + 1).trim();
                                                                            return (
                                                                                <div key={idx} className="mt-8 mb-4 first:mt-0">
                                                                                    <div className="text-[16px] font-bold text-text-primary flex items-center gap-2 mb-2">
                                                                                        <div className="w-1 h-4 bg-brand-primary rounded-full" />
                                                                                        {titlePart}
                                                                                    </div>
                                                                                    <div className="text-[14px] leading-relaxed opacity-80 pl-3 border-l border-border-light ml-0.5">
                                                                                        {contentPart}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }

                                                                        return (
                                                                            <div key={idx} className="text-[16px] font-bold text-text-primary mt-8 mb-3 first:mt-0 flex items-center gap-2">
                                                                                <div className="w-1 h-4 bg-brand-primary rounded-full" />
                                                                                {trimmedLine}
                                                                            </div>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <div key={idx} className="text-[14px] leading-relaxed mb-2 opacity-80 pl-0">
                                                                            {trimmedLine}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentContent.고객사례 && currentContent.고객사례.length > 0 && (
                                        <div className="mb-20">
                                            <h3 className="text-[15px] font-bold text-brand-primary mb-6 tracking-wider uppercase">고객사례</h3>
                                            <div className={`grid grid-cols-1 ${currentContent.고객사례.length > 1 ? 'md:grid-cols-2' : ''} gap-6`}>
                                                {currentContent.고객사례.map((item, i) => (
                                                    <div key={i} className="bg-bg-surface backdrop-blur-sm rounded-[20px] p-8 border border-border-light hover:border-brand-primary/40 transition-all group">
                                                        <div className="flex items-start gap-6 mb-8">
                                                            <div className="size-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-3xl border border-brand-primary/20">
                                                                {item.아이콘}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-[20px] font-bold text-text-primary mb-1.5 leading-tight">{item.기업명}</h4>
                                                                <span className="text-[15px] text-text-dim">{item.산업분야}</span>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-6 mb-8">
                                                            {item.항목들.map((detail, idx) => (
                                                                <div key={idx}>
                                                                    <span className="text-[13px] font-bold text-text-dim tracking-wider uppercase mb-3 block">{detail.타이틀}</span>
                                                                    <p className={`text-[14px] leading-relaxed break-keep ${detail.타이틀 === '성과' ? 'text-brand-primary font-bold' : 'text-text-secondary'}`}>
                                                                        {detail.내용}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {item.상세링크 && (
                                                            <Link to={item.상세링크} className="inline-flex items-center gap-2 text-[14px] font-bold text-text-primary hover:text-text-primary/80 hover:gap-3 transition-all">
                                                                자세히 보기 <ChevronRight className="size-4" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentContent.소개영상 && currentContent.소개영상.length > 0 && (
                                        <div className="mb-12">
                                            <h3 className="text-[16px] font-bold text-[#1A75FF] mb-6 tracking-wider uppercase">소개영상</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {currentContent.소개영상.map((video, i) => {
                                                    const youtubeThumbnail = (url: string) => {
                                                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                                        const match = url.match(regExp);
                                                        if (match && match[2].length === 11) {
                                                            return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
                                                        }
                                                        return null;
                                                    };
                                                    const thumbnail = youtubeThumbnail(video.URL);

                                                    return (
                                                        <a
                                                            key={i}
                                                            href={video.URL}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block group"
                                                        >
                                                            <div className="aspect-video bg-white/5 rounded-[20px] border border-white/5 flex items-center justify-center relative overflow-hidden transition-all hover:border-[#1A75FF]/40 mb-4">
                                                                {thumbnail ? (
                                                                    <>
                                                                        <img src={thumbnail} alt={video.타이틀} className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500" />
                                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                                                                    </>
                                                                ) : (
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1A75FF]/10 to-transparent" />
                                                                )}
                                                                <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10 border border-white/30 shadow-2xl">
                                                                    <Play className="size-5 text-white fill-white ml-0.5" />
                                                                </div>
                                                            </div>
                                                            <h4 className="text-[17px] font-bold text-white/80 group-hover:text-white transition-colors break-keep leading-snug pl-1">
                                                                {video.타이틀}
                                                            </h4>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {currentContent.오퍼링 && currentContent.오퍼링.length > 0 && (
                                        <div className="mb-20">
                                            <h3 className="text-[15px] font-bold text-brand-primary mb-6 tracking-wider uppercase">오퍼링</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {currentContent.오퍼링.map((offering, i) => (
                                                    <div key={i} className="bg-bg-surface backdrop-blur-sm rounded-[20px] p-8 border border-border-light hover:border-brand-primary/40 transition-all flex flex-col justify-between">
                                                        <div>
                                                            <h4 className="text-[20px] font-bold text-text-primary mb-3">{offering.타이틀}</h4>
                                                            <p className="text-text-secondary/50 text-[15px] mb-8 leading-relaxed">{offering.설명}</p>
                                                        </div>
                                                        {offering.상세링크 && (
                                                            <Link to={offering.상세링크} className="inline-flex items-center gap-2 text-[14px] text-text-primary hover:text-text-primary/80 hover:gap-3 transition-all font-bold">
                                                                자세히 보기 <ChevronRight className="size-4" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className={`grid grid-cols-1 ${currentContent.제품상세문의 && (currentContent.제품상세문의.이메일 || currentContent.제품상세문의.전화번호) && currentContent.관련리소스 && currentContent.관련리소스.length > 0 ? 'md:grid-cols-2' : ''} gap-8 mb-20 items-stretch`}>
                                        {currentContent.제품상세문의 && (currentContent.제품상세문의.이메일 || currentContent.제품상세문의.전화번호) && (
                                            <div className="flex flex-col h-full">
                                                <h3 className="text-[15px] font-bold text-brand-primary mb-6 tracking-wider uppercase">제품 상세 문의</h3>
                                                <div className="bg-bg-surface backdrop-blur-sm rounded-[20px] p-8 border border-border-light flex flex-col gap-6 items-start justify-center flex-1 min-h-[140px]">
                                                    {currentContent.제품상세문의.이메일 && (
                                                        <div className="flex items-center gap-4 text-text-primary">
                                                            <div className="size-8 rounded-lg bg-bg-surface/50 flex items-center justify-center">
                                                                <Mail className="size-4 text-text-dim" />
                                                            </div>
                                                            <span className="text-[16px] font-medium">{currentContent.제품상세문의.이메일}</span>
                                                        </div>
                                                    )}
                                                    {currentContent.제품상세문의.전화번호 && (
                                                        <div className="flex items-center gap-4 text-text-primary">
                                                            <div className="size-8 rounded-lg bg-bg-surface/50 flex items-center justify-center">
                                                                <Phone className="size-4 text-text-dim" />
                                                            </div>
                                                            <span className="text-[16px] font-medium">{currentContent.제품상세문의.전화번호}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {currentContent.관련리소스 && currentContent.관련리소스.length > 0 && (
                                            <div className="flex flex-col h-full">
                                                <h3 className="text-[15px] font-bold text-brand-primary mb-6 tracking-wider uppercase">관련 리소스</h3>
                                                <div className="space-y-4 flex-1">
                                                    {currentContent.관련리소스.map((resource, i) => (
                                                        <button key={i} className="w-full flex justify-between items-center p-5 bg-bg-surface rounded-2xl border border-border-light hover:border-brand-primary transition-all group text-left min-h-[64px]">
                                                            <div className="flex items-center gap-4">
                                                                <div className="size-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-[11px] font-bold text-brand-primary">
                                                                    {resource.파일타입}
                                                                </div>
                                                                <h4 className="text-[16px] text-text-primary/90 font-medium">{resource.타이틀}</h4>
                                                            </div>
                                                            <Download className="size-5 text-text-dim group-hover:text-brand-primary transition-colors" />
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

