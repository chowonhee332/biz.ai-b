import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { HIGHLIGHT_NEWS, REGULAR_NEWS } from './context/news/news-data';

export default function NewsDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const allNews = [...HIGHLIGHT_NEWS, ...REGULAR_NEWS];
    const newsIndex = id ? parseInt(id) - 1 : 0;
    const news = allNews[newsIndex] || allNews[0];

    const getTagColor = (tag: string) => {
        if (tag === "기술 이야기") return "text-emerald-500";
        return "text-brand-primary";
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-main text-text-primary font-pretendard flex flex-col">
            <Navbar activePage="news" />

            {/* Header */}
            <section className="pt-48 pb-16">
                <div className="max-w-[1280px] mx-auto container-responsive text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[900px] flex flex-col items-center"
                    >
                        {/* 태그 & 날짜 */}
                        <div className="flex items-center gap-3 mb-6 text-[14px] font-medium">
                            <span className={`${getTagColor(news.태그)} font-bold`}>{news.태그}</span>
                            <span className="text-white/20">|</span>
                            <span className="text-white/40">{news.날짜}</span>
                        </div>

                        {/* 타이틀 */}
                        <h1 className="text-[36px] md:text-[50px] font-bold text-white mb-8 leading-snug break-keep tracking-tight">
                            {news.타이틀}
                        </h1>

                        {/* 언론사 & 원문 링크 */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-[15px] font-medium">
                            {news.언론사 && (
                                <div className="text-white/50 flex items-center gap-2">
                                    <span>[{news.언론사}]</span>
                                    <span>{news.기자 || "기자"}</span>
                                </div>
                            )}
                            {news.언론사 && <span className="text-white/20 text-xs">|</span>}
                            <a
                                href={news.링크}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-brand-primary hover:text-brand-primary/80 transition-colors"
                            >
                                기사보기
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full mb-16 max-w-[1280px] mx-auto container-responsive">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden rounded-[20px] bg-bg-surface border border-border-light shadow-2xl">
                    <img
                        src={news.이미지}
                        alt="News Detail"
                        className="w-full h-full object-cover brightness-90"
                    />
                </div>
            </div>

            {/* 본문 */}
            <main className="max-w-[1280px] mx-auto container-responsive pb-32 flex-1 flex flex-col items-center">
                <article className="max-w-[800px] w-full">
                    {news.내용 ? (
                        <p className="text-text-secondary text-[16px] leading-[1.9] font-medium whitespace-pre-wrap break-keep mb-8">
                            {news.내용}
                        </p>
                    ) : (
                        <p className="text-white/30 text-[16px] font-medium italic">상세 내용이 준비 중입니다.</p>
                    )}
                </article>

                {/* 목록보기 */}
                <div className="mt-16 pt-10 border-t border-border-light/30 w-full max-w-[800px] flex justify-center">
                    <button
                        onClick={() => navigate('/news')}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white border border-white/20 rounded-lg px-4 py-2 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        목록보기
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
