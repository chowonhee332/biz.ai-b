import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin, Youtube } from 'lucide-react';

const HIGHLIGHT_NEWS = [
    {
        title: "kt ds, BC카드와 AI 기반\n자동화 통합보안관제 플랫폼 구축",
        date: "2025/12/24",
        tag: "News",
        solution: "-",
        link: "https://www.etnews.com/20251223000037",
        image: "https://img.etnews.com/news/article/2025/12/22/news-p.v1.20251222.cf4baa668f8d4ead865462b43805380c_P2.jpg"
    },
    {
        title: "한국표준협회, kt ds에\nAI 품질·신뢰성 평가 인증 수여",
        date: "2025/10/27",
        tag: "News",
        solution: "AI 솔루션 3종",
        link: "https://www.dailysmart.co.kr/news/articleView.html?idxno=115054",
        image: "https://cdn.dailysmart.co.kr/news/photo/202510/115054_114643_39.jpg"
    },
    {
        title: "KT DS, 폐쇄망에서도 쓰는\nAI 코드 어시스턴트 개발",
        date: "2025/07/08",
        tag: "News",
        solution: "코드박스",
        link: "https://zdnet.co.kr/view/?no=20250708200606",
        image: "https://image.zdnet.co.kr/2025/07/08/65bf5e3563cf2d49e53588eb72950582.png"
    },
    {
        title: "KT DS, AI 에이전트로\n기업 AX 돕는다",
        date: "2025/07/02",
        tag: "News",
        solution: "Beast AI",
        link: "https://it.chosun.com/news/articleView.html?idxno=2023092143480",
        image: "https://cdn.it.chosun.com/news/photo/202507/2023092143480_420058_5410.jpg"
    },
    {
        title: "KT DS \"AI 게이트웨이로 기업\n시스템과 AI 에이전트 쉽게 연결\"",
        date: "2025/07/02",
        tag: "News",
        solution: "Beast AI",
        link: "https://www.yna.co.kr/view/AKR20250702048800017",
        image: "https://img0.yna.co.kr/etc/inner/KR/2025/07/02/AKR20250702048800017_01_i_P4.jpg"
    }
];

export default function NewsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const newsScrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const scrollNews = (direction: 'left' | 'right') => {
        if (newsScrollRef.current) {
            const scrollAmount = 400; // 380px card + 24px gap
            newsScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
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

            {/* 2. 본문 컨텐츠 시작 */}
            <section className="pt-48 pb-32 flex-1 px-6 md:px-10">
                {/* 헤더 영역: 상단 타이틀 + 설명 */}
                <div className="max-w-[1200px] mx-auto mb-20">
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
                        <div className="flex gap-3 mb-2">
                            <button
                                onClick={() => scrollNews('left')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all bg-white/5 hover:bg-white/10"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => scrollNews('right')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all bg-white/5 hover:bg-white/10"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 하이라이트 캐러셀 (우측 블리드 레이아웃) */}
                <div className="mb-24">
                    <div
                        ref={newsScrollRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 pl-[calc(max(24px,(100vw-1240px)/2+24px))] pr-6"
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
                                    if (news.link) {
                                        window.open(news.link, '_blank');
                                    } else {
                                        navigate('/news/1', { state: { news } });
                                    }
                                }}
                            >
                                {/* 썸네일: 380 * 240 사이즈 */}
                                <div className="relative w-full aspect-[380/240] rounded-2xl overflow-hidden mb-5 bg-zinc-900 border border-white/5 shadow-2xl">
                                    <motion.img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-all duration-700"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                                </div>
                                <div className="pt-2 px-1 flex-1 flex flex-col">
                                    <span className="text-blue-400 text-[14px] font-bold mb-3">{news.tag}</span>
                                    <h3 className="text-white text-[24px] font-bold leading-snug whitespace-pre-line group-hover:text-blue-400 transition-colors mb-4">{news.title}</h3>
                                    <div className="flex items-center text-white/40 text-[14px] font-medium mt-auto">
                                        <span>{news.solution}</span>
                                        <span className="mx-2 text-[4px] opacity-50">●</span>
                                        <span>{news.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 카테고리 탭 - Sticky 적용 (풀 너비 라인) */}
                <div className="sticky top-[72px] lg:top-[64px] bg-black/[0.85] backdrop-blur-sm z-40 border-b border-white/20 mb-12">
                    <div className="max-w-[1200px] mx-auto flex items-center gap-8 h-[66px]">
                        {["All", "News", "Tech Stories", "Documentation"].map((category) => (
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

                <div className="max-w-[1200px] mx-auto">
                    {/* 좌측 메인 리스트 뷰 */}
                    <div className="flex-1">

                        <div className="flex flex-col gap-8">
                            {[
                                {
                                    title: "kt ds, BC카드와 AI 기반 자동화 통합보안관제 플랫폼 구축",
                                    desc: "kt ds가 BC카드에 AI 기반의 자동화된 통합보안관제 플랫폼을 구축하여 금융권 관제의 최적화 모델을 제시했습니다.",
                                    date: "2025/12/24",
                                    tag: "News",
                                    solution: "-",
                                    link: "https://www.etnews.com/20251223000037",
                                    image: "https://img.etnews.com/news/article/2025/12/22/news-p.v1.20251222.cf4baa668f8d4ead865462b43805380c_P2.jpg"
                                },
                                {
                                    title: "한국표준협회, kt ds에 AI 품질·신뢰성 평가 인증 수여",
                                    desc: "kt ds의 AI 솔루션 3종(AI:ON-U, BEAST AI Gateway, Intelligent ESB)이 품질 및 데이터 신뢰성을 공식 인정받아 AI+ 인증을 획득했습니다.",
                                    date: "2025/10/27",
                                    tag: "News",
                                    solution: "AI 솔루션 3종",
                                    link: "https://www.dailysmart.co.kr/news/articleView.html?idxno=115054",
                                    image: "https://cdn.dailysmart.co.kr/news/photo/202510/115054_114643_39.jpg"
                                },
                                {
                                    title: "KT DS, 폐쇄망에서도 쓰는 AI 코드 어시스턴트 개발",
                                    desc: "KT DS가 외부망과 단절된 폐쇄망 환경에서 바로 활용할 수 있는 AI 코드 어시스턴트 시스템 ‘코드박스-B.T.S’ 개발을 완료했습니다.",
                                    date: "2025/07/08",
                                    tag: "News",
                                    solution: "코드박스",
                                    link: "https://zdnet.co.kr/view/?no=20250708200606",
                                    image: "https://image.zdnet.co.kr/2025/07/08/65bf5e3563cf2d49e53588eb72950582.png"
                                },
                                {
                                    title: "KT DS, AI 에이전트로 기업 AX 돕는다",
                                    desc: "코딩 없이 AI를 도입하여 이메일 거래내역 발송 등 내부 시스템과 자동 연동되는 기업 AX의 혁신 사례가 공개되었습니다.",
                                    date: "2025/07/02",
                                    tag: "News",
                                    solution: "Beast AI",
                                    link: "https://it.chosun.com/news/articleView.html?idxno=2023092143480",
                                    image: "https://cdn.it.chosun.com/news/photo/202507/2023092143480_420058_5410.jpg"
                                },
                                {
                                    title: "KT DS \"AI 게이트웨이로 기업 시스템과 AI 에이전트 쉽게 연결\"",
                                    desc: "KT DS가 응용 프로그램 인터페이스(API) 게이트웨이 'BEAST'에 'AI 게이트웨이' 기능을 추가하여 AX 지원을 강화합니다.",
                                    date: "2025/07/02",
                                    tag: "News",
                                    solution: "Beast AI",
                                    link: "https://www.yna.co.kr/view/AKR20250702048800017",
                                    image: "https://img0.yna.co.kr/etc/inner/KR/2025/07/02/AKR20250702048800017_01_i_P4.jpg"
                                },
                                {
                                    title: "KT DS, '클라우드위즈'로 iF 디자인 어워드 2025 본상 수상",
                                    desc: "kt ds의 대표 CMP 솔루션 '클라우드위즈'가 세계 3대 디자인 상인 iF 디자인 어워드에서 2개 부문 본상을 수상했습니다.",
                                    date: "2025/04/29",
                                    tag: "News",
                                    solution: "CloudWiz",
                                    link: "https://www.etnews.com/20250429000079",
                                    image: "https://img.etnews.com/news/article/2025/04/29/news-p.v1.20250429.6ef7feb2ac78480aa41d6d35e3ad7700_P1.jpg"
                                },
                                {
                                    title: "kt ds “'Works AI'로 구성원 업무 효율 향상과 AI 생활화 지원”",
                                    desc: "kt ds의 'Works AI'는 MS 애저 네이티브 및 AI 기술을 활용하여 구성원들의 업무 효율을 획기적으로 향상시킨 업무 포털입니다.",
                                    date: "2025/03/31",
                                    tag: "News",
                                    solution: "Works AI",
                                    link: "https://www.etnews.com/20250328000136",
                                    image: "https://img.etnews.com/news/article/2025/03/28/news-p.v1.20250328.4d46aad34a124f11be2786e667cc9ea4_P1.jpg"
                                },
                                {
                                    title: "KT DS, ABC랩 출시 \"SaaS로 AI 사전검증 지원\"",
                                    desc: "비용과 보안 걱정 없이 온라인에서 손쉽게 생성형 AI PoC를 진행할 수 있는 'ABC랩' 서비스가 정식 출시되었습니다.",
                                    date: "2025/03/12",
                                    tag: "News",
                                    solution: "ABC Lab",
                                    link: "https://zdnet.co.kr/view/?no=20250312145934",
                                    image: "https://image.zdnet.co.kr/2025/03/12/08c78f3eab7a71840585879d07162172.jpg"
                                },
                                {
                                    title: "AI 생활화를 위한 kt ds 만의 그룹웨어: Works AI",
                                    desc: "kt ds 구성원들은 출근과 동시에 AI가 추천해 주는 업무와 지식을 확인하며 진정한 AI 생활화를 경험하고 있습니다.",
                                    date: "2024/12/12",
                                    tag: "Tech Stories",
                                    solution: "Works AI",
                                    link: "https://blog.naver.com/ktds_official/223691208730",
                                    image: "https://blogthumb.pstatic.net/MjAyNDEyMTJfOTUg/MDAxNzMzOTg3MTU1Njk5.dGwww3I9v16JUbufq3U5OpY2C47CACtuwWv7kAUiNd8g.A5XsHcNVcZ8dvUq_tbq5vEFpqnowZNNEHkPfYVVoPIsg.JPEG/%BA%ED%B7%CE%B1%D7_%BD%E6%B3%D7%C0%CF_%BE%E7%BD%C4_%281%29.jpg?type=w2"
                                },
                                {
                                    title: "kt ds, 사내용 MS 애저 기반 '웍스AI' 오픈",
                                    desc: "MS 애저 기반의 사내 협업 시스템 '웍스AI'를 통해 사내 정보와 외부 데이터를 결합한 스마트한 업무 환경을 구축했습니다.",
                                    date: "2024/11/29",
                                    tag: "News",
                                    solution: "Works AI",
                                    link: "https://www.aitimes.com/news/articleView.html?idxno=165782",
                                    image: "https://cdn.aitimes.com/news/photo/202411/165782_180045_5537.png"
                                }
                            ].map((news: any, i) => (
                                <motion.div
                                    key={i}
                                    onClick={() => {
                                        if (news.link) {
                                            window.open(news.link, '_blank');
                                        } else {
                                            navigate(`/news/${i + 1}`, { state: { news } });
                                        }
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group flex flex-col-reverse sm:flex-row gap-8 items-center py-8 rounded-3xl bg-transparent transition-all cursor-pointer"
                                >
                                    <div className="flex-1 w-full flex flex-col">
                                        <span className="text-blue-400 text-[14px] font-bold mb-3">{news.tag}</span>
                                        <h3 className="text-white text-[24px] font-bold leading-snug mb-3 group-hover:text-blue-400 transition-colors">{news.title}</h3>
                                        <p className="text-white/60 text-[16px] leading-relaxed line-clamp-2 mb-6">{news.desc}</p>
                                        <div className="flex items-center text-white/40 text-[14px] font-medium mt-auto">
                                            <span>{news.solution}</span>
                                            <span className="mx-2 text-[4px] opacity-50">●</span>
                                            <span>{news.date}</span>
                                        </div>
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
                </div>
            </section>

            {/* 3. Footer */}
            <footer className="bg-[#000000] py-32 px-6 border-t border-white/20">
                <div className="max-w-[1240px] mx-auto">
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
