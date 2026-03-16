import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { HIGHLIGHT_NEWS, REGULAR_NEWS, NEWS_CATEGORIES } from '@/context/news/news-data';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState("전체");
    const navigate = useNavigate();

    const getTagColor = (tag: string) => {
        if (tag === "기술 이야기") return "text-emerald";
        return "text-brand-primary";
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen text-text-primary font-pretendard flex flex-col" style={{ backgroundColor: '#0A0A0A' }}>
            <Navbar activePage="news" />

            <section className="pt-48 pb-32 flex-1">
                {/* 헤더 */}
                <div className="max-w-[1280px] mx-auto container-responsive mb-20">
                    <div className="flex justify-between items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="text-[18px] text-[#999999] mb-3 block font-medium">News</span>
                            <h1 className="text-[36px] lg:text-[52px] font-bold text-white mb-6 tracking-tight leading-tight">
                                새로운 소식
                            </h1>
                        </motion.div>

                    </div>
                </div>


                {/* 카테고리 탭 */}
                <div className="sticky top-[72px] lg:top-[64px] backdrop-blur-sm z-40 border-b border-border-light mb-12" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}>
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px]">
                        {NEWS_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant="ghost"
                                rounded="none"
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full text-[15px] transition-colors flex items-center px-1 cursor-pointer hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none ${activeCategory === category
                                    ? "text-text-primary font-bold"
                                    : "text-text-dim font-medium hover:text-text-primary"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryNews"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* 뉴스 목록 */}
                <div className="max-w-[1280px] mx-auto container-responsive">
                    <div className="flex flex-col divide-y divide-border-light/30">
                        {[...HIGHLIGHT_NEWS, ...REGULAR_NEWS].filter(news => activeCategory === "전체" || news.태그 === activeCategory).map((news: any, i) => (
                            <motion.div
                                key={i}
                                onClick={() => navigate(`/news/${i + 1}`, { state: { news } })}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                className="group flex flex-col sm:flex-row gap-8 items-center py-8 cursor-pointer border-b border-border-light last:border-0"
                            >
                                {/* 썸네일: 고정 높이 160px */}
                                <div className="w-full sm:w-[280px] h-[160px] shrink-0 rounded-[16px] overflow-hidden bg-bg-surface border border-border-light">
                                    <img
                                        src={news.이미지}
                                        alt={news.타이틀}
                                        className="w-full h-full object-cover brightness-90 transition-all duration-700 group-hover:brightness-100 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex-1 w-full flex flex-col justify-center py-1">
                                    <span className={`${getTagColor(news.태그)} text-[14px] font-bold mb-2`}>{news.태그}</span>
                                    <h3 className="text-text-primary text-[22px] font-bold leading-snug mb-3 group-hover:text-text-secondary transition-colors line-clamp-2">{news.타이틀}</h3>
                                    <p className="text-[#888888] text-[16px] leading-relaxed line-clamp-2 mb-4 font-medium">{news.설명}</p>
                                    <div className="flex items-center text-text-dim text-[14px] font-medium">
                                        <span>{news.언론사 || news.솔루션}</span>
                                        <span className="mx-2 text-[4px] opacity-50">●</span>
                                        <span>{news.날짜}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
