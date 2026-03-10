import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin, Youtube } from 'lucide-react';

import { USE_CASES, USE_CASE_CATEGORIES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function UseCasePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(USE_CASE_CATEGORIES[0]);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

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
            {/* GNB */}
            <Navbar activePage="use-cases" />

            {/* Content Body */}
            <section className="pt-48 pb-32 flex-1">
                {/* Header Section */}
                <div className="max-w-[1200px] mx-auto px-6 md:px-0 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            Use Cases
                        </h1>
                        <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                            다양한 산업 분야에서 Biz.AI를 통해 실현된 혁신 사례를 소개합니다.
                        </p>
                    </motion.div>
                </div>

                {/* 카테고리 탭 - Sticky 적용 (풀 너비 라인) */}
                <div className="sticky top-[72px] lg:top-[64px] bg-black/[0.85] backdrop-blur-sm z-40 border-b border-white/20 mb-12">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-0 flex items-center gap-8 h-[66px] overflow-x-auto no-scrollbar whitespace-nowrap">
                        {USE_CASE_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`relative h-full text-[15px] font-medium transition-colors flex items-center px-1 cursor-pointer ${activeCategory === category
                                    ? "text-blue-500"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryUseCase"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500 rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 md:px-0">

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
                                    <div className="relative aspect-video rounded-[20px] overflow-hidden mb-6 bg-zinc-900 border border-white/5">
                                        <img
                                            src={item.이미지}
                                            alt={item.타이틀}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale-[0.1] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`text-[14px] font-bold transition-colors ${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-blue-400'}`}>
                                                {item.카테고리}
                                            </span>
                                        </div>
                                        <h3 className={`text-white text-[22px] font-bold leading-tight transition-colors whitespace-pre-line group-hover:${USE_CASE_CATEGORY_COLORS[item.카테고리]?.text || 'text-blue-400'}`}>
                                            {item.타이틀}
                                        </h3>
                                        <p className="text-white/50 text-[15px] leading-relaxed line-clamp-2">
                                            {item.설명}
                                        </p>
                                        <div className="mt-1">
                                            <span className="text-white/40 text-[14px] font-medium transition-colors group-hover:text-white/60">
                                                #{item.태그}
                                            </span>
                                        </div>
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

