import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'motion/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { HIGHLIGHT_NEWS, REGULAR_NEWS } from './context/news/news-data';

export default function NewsDetailPage() {
    const { id } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // 전체 뉴스 합치기 (id 기반 검색을 위해)
    const allNews = [...HIGHLIGHT_NEWS, ...REGULAR_NEWS];
    const newsIndex = id ? parseInt(id) - 1 : 0;
    const news = allNews[newsIndex] || allNews[0];

    const getTagColor = (tag: string) => {
        if (tag === "기술 이야기") return "text-emerald-500";
        return "text-blue-400";
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
            {/* GNB (Header) */}
            <Navbar activePage="news" />

            {/* 1. News Detail Header (Article Title Info) */}
            <section className="pt-48 pb-16">
                <div className="max-w-[1200px] mx-auto px-6 md:px-0 text-center flex flex-col items-center">
                    <div className="max-w-[900px] flex flex-col items-center">
                        {/* Category & Date */}
                        <div className="flex items-center gap-3 mb-6 text-white/60 text-[14px] font-medium tracking-wide">
                            <span className={`${getTagColor(news.태그)} font-bold`}>{news.태그}</span>
                            <span className="text-xs">|</span>
                            <span>{news.날짜}</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-[36px] md:text-[50px] font-bold text-white mb-8 leading-snug break-keep tracking-tight">
                            {news.타이틀}
                        </h1>
                    </div>
                </div>
            </section>

            {/* 2. Hero Image */}
            <div className="w-full mb-16 max-w-[1200px] mx-auto px-6 md:px-0">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl">
                    <img
                        src={news.이미지}
                        alt="Event Detail"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* 3. Main Article Content */}
            <main className="max-w-[1200px] mx-auto px-6 md:px-0 pb-32 flex-1 flex flex-col items-center">
                <article className="prose prose-invert prose-lg max-w-[800px] prose-p:text-white/80 prose-p:leading-[1.8] prose-p:font-medium text-[16px]">
                    {news.내용 ? (
                        <p className="mb-8 whitespace-pre-wrap">{news.내용}</p>
                    ) : (
                        <p className="mb-8 font-medium italic opacity-50">상세 내용이 준비 중입니다.</p>
                    )}
                </article>

                {/* 목록보기 버튼 */}
                <div className="mt-16 pt-10 border-t border-white/10 flex justify-center">
                    <button
                        onClick={() => navigate('/news')}
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 text-[14px] font-medium cursor-pointer"
                    >
                        목록보기
                    </button>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
