import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { USE_CASES, USE_CASE_CATEGORIES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function UseCasePage() {
    const [activeCategory, setActiveCategory] = useState(USE_CASE_CATEGORIES[0]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-main text-text-primary font-pretendard flex flex-col">
            {/* GNB */}
            <Navbar activePage="use-cases" />

            {/* Content Body */}
            <section className="pt-48 pb-32 flex-1">
                {/* Header Section */}
                <div className="max-w-[1280px] mx-auto container-responsive mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-brand-secondary bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            Use Cases
                        </h1>
                        <p className="text-text-secondary text-[18px] max-w-2xl font-medium leading-relaxed">
                            다양한 산업 분야에서 Biz.AI를 통해 실현된 혁신 사례를 소개합니다.
                        </p>
                    </motion.div>
                </div>

                {/* 카테고리 탭 - Sticky 적용 (풀 너비 라인) */}
                <div className="sticky top-[72px] lg:top-[64px] bg-bg-main/85 backdrop-blur-sm z-40 border-b border-border-light mb-12">
                    <div className="max-w-[1280px] mx-auto container-responsive flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {USE_CASE_CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant="ghost"
                                rounded="none"
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full text-[15px] transition-colors flex items-center px-1 cursor-pointer hover:bg-transparent ${activeCategory === category
                                    ? "text-text-primary font-bold"
                                    : "text-text-dim font-medium hover:text-text-primary"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryUseCase"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto container-responsive">

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {
                            USE_CASES.filter(item => activeCategory === "전체" || item.카테고리 === activeCategory).map((item, i) => (
                                <motion.div
                                    key={i}
                                    onClick={() => navigate(`/use-cases/${i + 1}`, { state: { news: item } })}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                    className="group cursor-pointer flex flex-col"
                                >
                                    <div className="relative aspect-video rounded-[20px] overflow-hidden mb-5 bg-bg-surface border border-border-light group-hover:border-border-light/60 transition-all">
                                        <img
                                            src={item.이미지}
                                            alt={item.타이틀}
                                            className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                    </div>
                                    <div className="pt-2 px-1 flex flex-col gap-2.5">
                                        <span className={`text-[13px] font-bold ${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-brand-primary'}`}>
                                            {item.카테고리}
                                        </span>
                                        <h3 className="text-text-primary text-[19px] font-bold leading-snug whitespace-pre-line">
                                            {item.타이틀}
                                        </h3>
                                        <p className="text-text-secondary/70 text-[14px] leading-relaxed line-clamp-2 font-medium">
                                            {item.설명}
                                        </p>
                                        <span className="text-text-dim text-[13px] font-medium mt-0.5">
                                            #{item.태그}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

