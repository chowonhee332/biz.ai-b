import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { USE_CASES, USE_CASE_CATEGORIES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';

export default function UseCaseDetailPage() {
    const { id } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // id가 1부터 시작하므로 인덱스는 id - 1
    const caseIndex = id ? parseInt(id) - 1 : 0;
    const item = USE_CASES[caseIndex] || USE_CASES[0];

    const detail = item.상세내용 || null;
    const sections = detail?.sections || [
        { id: "introduction", title: "1. 고객사 소개 및 배경" },
        { id: "objective", title: "2. 도입 목표" },
        { id: "solution", title: "3. 솔루션 구조" },
        { id: "results", title: "4. 기대 효과 및 결과" }
    ];

    const [activeSection, setActiveSection] = useState<string>(sections[0].id);

    useEffect(() => {
        window.scrollTo(0, 0);

        const observers = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -70% 0px",
                threshold: 0
            }
        );

        sections.forEach((sec: any) => {
            const el = document.getElementById(sec.id);
            if (el) observers.observe(el);
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            observers.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [item]);

    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };

    return (
        <div className="min-h-screen bg-bg-main text-text-primary font-pretendard flex flex-col">
            {/* GNB */}
            <Navbar activePage="use-cases" />

            {/* Header */}
            <section className="pt-48 pb-16">
                <div className="max-w-[1280px] mx-auto container-responsive text-center flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-6 text-white/50 text-[14px] font-medium tracking-wide">
                        <span>{item.카테고리}</span>
                    </div>
                    <h1 className="text-[36px] md:text-[50px] font-bold text-white mb-10 leading-snug break-keep tracking-tight">
                        {item.타이틀}
                    </h1>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-24 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[20px] bg-zinc-900 border border-white/5 shadow-2xl">
                    <img src={item.이미지} alt="Case Study Hero" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Main Content with Sticky ToC */}
            <main className="max-w-[1280px] mx-auto container-responsive pb-48 flex flex-col lg:flex-row gap-20 relative">
                {/* Left: Article Content */}
                <div className="flex-1 lg:max-w-[840px]">
                    <article className="flex flex-col gap-16 font-pretendard">
                        {sections.map((section: any, idx: number) => (
                            <section key={section.id} id={section.id} className="flex flex-col scroll-mt-32">
                                {section.title && (
                                    <h2 className={`${section.subtitle_level === 1 ? 'text-[24px] text-brand-secondary' : 'text-[28px] text-text-primary'} font-bold border-b border-border-light pb-4 mb-6 flex items-center gap-3`}>
                                        {section.title}
                                    </h2>
                                )}

                                {section.header && (
                                    <div className="text-[20px] font-bold text-text-primary/90 mb-6 italic pl-4 border-l-4 border-brand-primary/50">
                                        {section.header}
                                    </div>
                                )}

                                {section.id === 'summary' ? (
                                    <div className="mt-8 p-6 rounded-[20px] bg-brand-primary/10 border border-brand-primary/30 group transition-all duration-300 hover:bg-brand-primary/[0.15]">
                                        <div className="text-brand-secondary text-[16px] leading-relaxed break-keep font-medium">
                                            {section.content}
                                        </div>
                                    </div>
                                ) : section.content && (
                                    <div className="text-text-secondary text-[16px] leading-relaxed mb-6 break-keep whitespace-pre-line font-medium">
                                        {section.content}
                                    </div>
                                )}

                                {section.list && (
                                    <div className="bg-bg-surface rounded-[20px] p-8 border border-border-light mb-6 font-pretendard">
                                        <ul className="flex flex-col gap-4">
                                            {section.list.map((li: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-4 text-text-secondary">
                                                    <ChevronRight className="mt-1.5 size-4 text-text-dim shrink-0" strokeWidth={3} />
                                                    <div className="text-[16px] font-medium leading-relaxed break-keep">
                                                        {li}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {section.items && (
                                    <div className="grid grid-cols-1 gap-4 font-pretendard mb-6">
                                        {section.items.map((it: any, idx: number) => (
                                            <div key={idx} className="p-8 rounded-[20px] bg-bg-surface border border-border-light relative group transition-all">
                                                <div className="flex flex-col gap-4 relative z-10">
                                                    <div className="flex items-center gap-3 text-text-primary text-[18px] font-bold">
                                                        <div className="size-6 rounded-full bg-brand-primary flex items-center justify-center text-[10px] shadow-lg shadow-brand-primary/20 text-white leading-none">{(idx + 1).toString().padStart(2, '0')}</div>
                                                        {it.타이틀}
                                                    </div>
                                                    <div className="pl-9">
                                                        <p className="text-text-secondary text-[15px] leading-relaxed break-keep font-medium">
                                                            {it.설명}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.quotes && (
                                    <div className="flex flex-col gap-10 mt-4">
                                        {section.quotes.map((q: any, idx: number) => (
                                            <div key={idx} className="relative pl-12">
                                                <span className="absolute left-0 top-0 text-6xl text-blue-500/20 font-serif">“</span>
                                                <div className="text-[16px] font-medium text-white/90 leading-snug mb-4 break-keep">
                                                    {q.text}
                                                </div>
                                                <div className="text-blue-400 font-bold">— {q.author}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.footer && (
                                    <div className="mt-8 p-6 rounded-[20px] bg-brand-primary/10 border border-brand-primary/30 group transition-all duration-300 hover:bg-brand-primary/[0.15]">
                                        <div className="text-brand-secondary text-[16px] leading-relaxed break-keep font-medium">
                                            {section.content}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>
                </div>

                {/* Right: Sticky Table of Contents */}
                <aside className="hidden lg:block w-[240px] shrink-0">
                    <div className="sticky top-32 flex flex-col gap-6">
                        <div className="text-[12px] font-bold text-white/40 uppercase tracking-widest pl-4">Contents</div>
                        <nav className="flex flex-col border-l border-white/5">
                            {sections.filter((s: any) => s.title).map((nav: any) => (
                                <a
                                    key={nav.id}
                                    href={`#${nav.id} `}
                                    className={`py-3 pl-4 text-[14px] font-medium transition-all border-l-2 -ml-[1px] cursor-pointer ${activeSection === nav.id
                                        ? "text-white border-blue-500"
                                        : "text-white/30 border-transparent hover:text-white/60"
                                        } `}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(nav.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {nav.title.replace(/^\d+\.\s*/, '').replace(/^\d+\)\s*/, '')}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                            <h4 className="text-[16px] font-bold text-white break-keep">비슷한 과제를 겪고 계신가요?</h4>
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11">상담 문의하기</Button>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
