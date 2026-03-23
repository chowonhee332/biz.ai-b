/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import HeroSpline from './components/HeroSpline';
import { useScroll, useTransform, motion, useInView, AnimatePresence, animate } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroContent from './components/HeroContent';
import Navbar from './components/Navbar';
import Silk from './components/Silk';
import { useNavigate } from 'react-router-dom';
import { USE_CASE_HIGHLIGHTS } from './context/use-cases/use-case-highlights';
import {
  Search,
  Zap,
  Layout,
  Globe,
  Database,
  Shield,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowUp,
  Monitor,
  Utensils,
  Box,
  Youtube,
  Linkedin,
  Mail,
  Smartphone,
  Info,
  Menu,
  X,
} from 'lucide-react';

// Sub-components (Moved to top for hoisting/scoping clarity)

const StudioCard = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Card className="p-10 rounded-[20px] bg-bg-surface border-border-light hover:bg-bg-active hover:border-border-active transition-all duration-500 group flex flex-col items-center md:items-start text-center md:text-left shadow-2xl relative overflow-hidden text-left break-keep">
    <div className="absolute top-0 right-0 w-32 h-32 bg-bg-surface/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors duration-500" />
    <div className="size-16 bg-bg-surface/50 rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-border-light relative z-10 text-text-primary/80 group-hover:text-brand-primary">
      {React.cloneElement(icon as any, { size: 32 })}
    </div>
    <h4 className="text-2xl font-bold text-text-primary mb-4 relative z-10">{title}</h4>
    <p className="text-text-dim leading-relaxed font-medium relative z-10">{desc}</p>
  </Card>
);

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(value));
        }
      }
    });

    return () => controls.stop();
  }, [isInView, from, to]);

  return <span ref={nodeRef}>{Intl.NumberFormat("en-US").format(from)}</span>;
};

const SolutionCard = ({ number, image, title, desc, highlight, isLarge }: { number: string; image: string; title: string; desc: string; highlight: string; isLarge?: boolean }) => {
  return (
  <div className="rounded-[20px] p-6 md:p-10 flex flex-col w-full min-w-[280px] h-[340px] md:h-[424px] group cursor-pointer transition-all duration-500 hover:-translate-y-2 font-pretendard relative overflow-hidden bg-[#F3F5FC]">
    {/* Index Number */}
    <div className="text-body-sm md:text-body-md font-bold leading-none mb-2 md:mb-3 text-black">{number}</div>

    {/* Title & Description Group */}
    <div className="flex flex-col gap-2 md:gap-4 mb-4 md:mb-6">
      <h4 className="text-[24px] md:text-[28px] font-bold tracking-tight leading-tight text-black">{title}</h4>
      <div className="min-h-[40px] md:min-h-[48px]">
        <p className="text-body-sm md:text-body-sm leading-snug font-normal break-keep whitespace-pre-line text-[#666666]">
          {desc}
        </p>
      </div>
    </div>

    {/* Highlight Tag */}
    <div className="font-medium text-label-md md:text-body-sm tracking-tight text-black">
      {highlight.startsWith('#') ? highlight : `# ${highlight}`}
    </div>

    {/* Logo: Absolute Bottom Right Positioning */}
    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-none">
      <div className={`relative flex items-end justify-end transition-transform duration-500 group-hover:scale-105 ${isLarge ? 'w-28 h-28 md:w-44 md:h-44' : 'w-[100px] h-[100px] md:w-[160px] md:h-[160px]'}`}>
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-contain object-right-bottom origin-bottom-right"
        />
      </div>
    </div>
  </div>
  );
};

const Char = ({ children, progress, range, isHighlight }: { children: string; progress: any; range: [number, number]; isHighlight?: boolean }) => {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span
      style={{ opacity, color: isHighlight ? '#33ADFF' : undefined }}
      className="whitespace-pre"
    >
      {children}
    </motion.span>
  );
};

const CharacterReveal = ({ text, className, scrollProgress, range, highlightIndex }: { text: string; className?: string; scrollProgress: any, range: [number, number], highlightIndex?: number }) => {
  const lines = text.split('\n');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <div className={`flex flex-col gap-1 md:gap-2 font-pretendard ${className}`}>
      {lines.map((line, lineIdx) => {
        // Line-based color scheme:
        // Blue highlight from the specified highlightIndex to the end.
        // If no index is provided, only the last line is highlighted.
        const isHighlight = lineIdx >= (highlightIndex ?? lines.length - 1);
        const colorClass = isHighlight ? "" : "text-text-primary";

        return (
          <div
            key={lineIdx}
            className={`flex flex-wrap text-heading-md md:text-heading-xl font-bold tracking-tight leading-[1.3] ${colorClass}`}
          >
            {line.split('').map((char, charIdx) => {
              const charStart = range[0] + (charCounter / totalChars) * (range[1] - range[0]);
              const charEnd = range[0] + ((charCounter + 1) / totalChars) * (range[1] - range[0]);
              charCounter++;
              return (
                <Char key={charIdx} progress={scrollProgress} range={[charStart, charEnd]} isHighlight={isHighlight}>
                  {char}
                </Char>
              );
            })}
            {lineIdx < lines.length - 1 && (() => { charCounter++; return null; })()}
          </div>
        );
      })}
    </div>
  );
};




const CTAParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 1000; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 translate-z-0" />;
};

const DomainAccordionItem = ({
  title,
  agents,
  image,
  isActive,
  forceExpanded,
  onMouseEnter,
  onClick
}: {
  title: string;
  agents: string[];
  image: string;
  isActive: boolean;
  forceExpanded?: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) => {
  const expanded = isActive || forceExpanded;

  const agentListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: forceExpanded ? 0 : 0.15,
      }
    }
  };

  const agentItemVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 200, damping: 24 }
    }
  };

  return (
    <motion.div
      layout
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer rounded-2xl smooth-gpu w-full lg:w-auto h-[380px] lg:h-auto"
      style={{ willChange: 'flex, width' }}
      {...(!forceExpanded && {
        animate: { flex: isActive ? 780 : 122 },
        transition: { type: 'spring', stiffness: 80, damping: 22, mass: 1 },
      })}
    >
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          loading="eager"
          className="w-full h-full object-cover"
          animate={{
            filter: expanded ? 'grayscale(0) brightness(0.85) contrast(1.1)' : 'grayscale(1) brightness(0.4)',
            scale: expanded ? 1.06 : 1
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />
      </div>

      <div className={`absolute inset-x-0 top-0 p-5 lg:p-8 flex flex-col justify-start h-full ${expanded ? 'items-start text-left' : 'items-center'}`}>
        <p className="text-white/60 font-medium text-body-sm tracking-wide mb-3 whitespace-nowrap uppercase">
          {title}
        </p>

        <AnimatePresence>
          {(expanded || window.innerWidth < 1024) && (
            <motion.div
              key="agents"
              variants={agentListVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-1.5 md:gap-2"
            >
              {agents.map((agent, i) => (
                <motion.div key={i} variants={agentItemVariants}>
                  <span className="text-white text-body-md md:text-body-lg lg:text-heading-xs font-bold leading-tight">{agent}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Tag = ({ text }: { text: string }) => (
  <Badge variant="outline" className="border-brand-primary text-brand-primary rounded-full px-4 py-1.5 font-medium whitespace-nowrap">
    {text}
  </Badge>
);

const ProcessSection = (_: { isMobile: boolean }) => {
  const processRef = useRef(null);

  return (
    <div className="relative w-full py-10" ref={processRef}>
      <div
        className="relative z-20 overflow-hidden smooth-gpu bg-white mx-2 rounded-[32px]"
      >
        <section id="process" className="py-16 md:py-32 relative overflow-hidden px-6">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-left md:text-center mb-12 md:mb-24 container-responsive">
              <span className="text-body-sm md:text-body text-[#999999] mb-3 block font-medium">왜 kt ds와 함께 해야 할까요?</span>
              <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold mb-4 md:mb-6 tracking-tight leading-tight font-poppins text-black">
                Why kt ds
              </h1>
              <p className="text-body-sm md:text-body-sm lg:text-body max-w-2xl mx-0 md:mx-auto font-medium text-black/80">
                기업의 복잡한 요구사항을 기획부터 구축, 검증, 운영까지<br className="hidden md:block" />
                표준화된 프로세스로 완성합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  num: "01", title: "분석/설계", subtitle: "Retriever,\nAnalyst", color: "text-brand-primary",
                  bullets: [
                    "데이터 협의체 기반 분석 및 선별",
                    "이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축",
                    "원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립"
                  ]
                },
                {
                  num: "02", title: "구축", subtitle: "Writer,\nExecutor", color: "text-brand-primary",
                  bullets: [
                    "17년 업력으로 안정성 및 보안성을 갖춘 시스템 구축",
                    "답변/문서/코드/보고서 작성",
                    "유연한 워크플로우 생성 기능으로 다양한 비즈니스에 최적화"
                  ]
                },
                {
                  num: "03", title: "테스트 및 이행", subtitle: "Validator,\nQuality", color: "text-brand-primary",
                  bullets: [
                    "단계적인 성능 검증 및 최적화",
                    "검증, 규정/정책/보안/품질 체크, 근거 링크",
                    "피드백 반영, 프롬프트/룰/플레이북/지식 업데이트"
                  ]
                },
                {
                  num: "04", title: "안정화", subtitle: "Maintainer,\nSRE", color: "text-brand-primary",
                  bullets: [
                    "KPI/SLA/SLO 모니터링, 이상탐지, 알림/에스컬레이션",
                    "의사결정 근거·승인·변경 이력 기록(감사 대응)",
                    "사용자/관리자 매뉴얼 제공 및 교육"
                  ]
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  className="relative rounded-[20px] p-6 md:p-10 flex flex-col min-h-[320px] md:min-h-[420px] overflow-hidden bg-[#F3F5FC]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent rounded-[20px] pointer-events-none" />
                  <div className="relative min-h-[100px] md:min-h-[130px]">
                    <span className={`${step.color} text-body-sm md:text-body-md font-bold mb-2 block`}>{step.num}</span>
                    <h3 className="text-[24px] md:text-heading-md font-bold leading-tight whitespace-pre-line text-gray-900">{step.subtitle}</h3>
                  </div>
                  <div className="relative flex-1" />
                  <div className="relative min-h-[160px]">
                    <h4 className="text-body-sm font-semibold mb-3 text-gray-900">{step.title}</h4>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-label-lg leading-relaxed font-normal text-black/80">
                          <span className="mt-[9px] w-1 h-1 rounded-full shrink-0 bg-black/25" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const App = () => {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY, scrollYProgress } = useScroll();
  const [activeUseCase, setActiveUseCase] = useState(0);

  // GNB 라인: 전체 페이지 스크롤 기반
  const navLineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const newsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const handleNewsScroll = () => {
    if (newsScrollRef.current) {
      setCanScrollLeft(newsScrollRef.current.scrollLeft > 10);
    }
  };

  const scrollNews = (direction: 'left' | 'right') => {
    if (newsScrollRef.current) {
      const scrollAmount = 400; // 380px card + 24px gap
      newsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  const clipPath = "inset(0px 8px round 32px)";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const [activeUseCase, setActiveUseCase] = useState(0); // This is now managed by useMotionValueEvent
  const isScrollingRef = useRef(false);

  const handleSetActiveUseCase = React.useCallback((idx: number) => {
    if (!isScrollingRef.current) {
      setActiveUseCase(idx);
    }
  }, []);

  const useCaseItems = USE_CASE_HIGHLIGHTS.map(item => ({
    ...item,
    icon: (() => {
      switch (item.iconName) {
        case 'Utensils': return <Utensils className="w-8 h-8" />;
        case 'Search': return <Search className="w-8 h-8" />;
        case 'Monitor': return <Monitor className="w-8 h-8" />;
        default: return <Box className="w-8 h-8" />;
      }
    })()
  }));

  return (
    <div className="min-h-screen text-text-primary font-sans bg-bg-main">
      {/* GNB - Global Navigation Bar */}
      <Navbar activePage="home" scrollLineProgress={navLineScaleX} />

      {/* Hero Section */}
      <div className="relative z-20 bg-bg-main" style={{ marginTop: '68px' }}>
      <section id="hero" data-theme="dark" className="relative flex items-center justify-center overflow-clip font-poppins mx-2 mt-2 mb-2 rounded-[32px] bg-[#0A0A0A]" style={{ minHeight: 'calc(100vh - 64px - 16px)' }}>

        {/* Silk Motion Background */}
        <div className="absolute inset-0 z-0">
          <Silk
            speed={3.5}
            scale={0.8}
            color="#c8d8ff"
            noiseIntensity={6}
            rotation={4.8}
          />
        </div>
        {/* Fade-out gradient overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 60%, rgba(10,10,10,1) 100%), linear-gradient(to right, rgba(10,10,10,0) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,1) 60%)' }} />

        <div className="absolute inset-0 z-[2]">
          <HeroSpline />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto container-responsive flex items-center justify-center lg:justify-start h-full pointer-events-none">
          <div className="w-full h-full flex flex-col justify-center items-center lg:items-start relative py-12">
            {/* Content Area */}
            <div className="w-full lg:max-w-[800px] relative z-20 pointer-events-auto md:pl-[28px]">
              <HeroContent align="left" />
            </div>
          </div>
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          className="flex absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 md:gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} className="text-white/80" strokeWidth={1.5} />
            <ChevronDown size={28} className="text-white/40 -mt-5" strokeWidth={1.5} />
          </motion.div>
          <span className="text-white/60 text-sm font-medium tracking-wider">Scroll down</span>
        </motion.div>
      </section>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 bg-bg-main">
        <div className="relative w-full">
          {/* Continuous gradient from the Hero section into the gap */}

          <motion.div
            style={{ clipPath, willChange: 'clip-path' } as any}
            className="relative z-20 overflow-hidden mb-20 smooth-gpu bg-bg-main"
          >
            <section id="solution" data-theme="light" className="py-16 md:py-32 bg-white">
              <div className="max-w-[1280px] mx-auto container-responsive relative">
                <motion.div
                  initial={isMobile ? false : { opacity: 0, y: 30 }}
                  whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-left md:text-center mb-10 md:mb-20 font-pretendard flex flex-col items-start md:items-center relative z-10"
                >
                  <span className="text-body-sm md:text-body text-black mb-3 block font-medium">AI서비스</span>
                  <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold mb-4 md:mb-6 tracking-tight leading-tight font-poppins text-black">
                    AI Services by kt ds
                  </h1>
                </motion.div>


                {/* 그룹 1: 전사 공통 */}
                <div className="mb-16 md:mb-32 max-w-[1200px] mx-auto">
                  <motion.div
                    initial={isMobile ? false : { opacity: 0, x: -20 }}
                    whileInView={isMobile ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 mb-5 ml-4"
                  >
                    <span className="text-body font-normal text-gray-800">Agents</span>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      {
                        image: "/logo_2.png",
                        title: "WorksAI",
                        desc: "AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal",
                        highlight: "#업무 효율 200% 향상"
                      },
                      {
                        image: "/logo_3.png",
                        title: "AI 회의록",
                        desc: "음성 기반 회의 자동 기록 · 요약 · 업무 추출 AI 서비스",
                        highlight: "#1분 완성 회의록 작성"
                      },
                      {
                        image: "/logo_3.png",
                        title: "국정감사 Agent",
                        desc: "국정감사 담당자의 성향을 파악하여 필요한 내용을 정리하고 중요한 내용만 빠르게 확인할 수 있도록 도와주는 AI 서비스",
                        highlight: "#빠른 준비, 정확한 대응"
                      },
                      {
                        image: "/logo_4.png",
                        title: "RFP Agent",
                        desc: "AI 기반 제안요청서 자동 분석 및 답변 초안 생성 서비스",
                        highlight: "#RFP 답변 시간 80% 단축"
                      }
                    ]
                      .map((card, i) => (
                        <div key={i}>
                          <SolutionCard {...card} number={`0${i + 1}`} />
                        </div>
                      ))}
                  </div>
                </div>

                {/* 그룹 2: IT 서비스/개발 직군 */}
                <div className="mb-14 max-w-[1200px] mx-auto">
                  <motion.div
                    initial={isMobile ? false : { opacity: 0, x: -20 }}
                    whileInView={isMobile ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 mb-5 ml-4"
                  >
                    <span className="text-body font-normal text-gray-800">Solutions</span>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      {
                        image: "/logo_1.png",
                        title: "AI:ON-U",
                        desc: "엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder",
                        highlight: "#3분 완성 Agent"
                      },
                      {
                        image: "/logo_5.png",
                        title: "Beast AI", isLarge: true,
                        desc: "엔터프라이즈용 AI 기술, API를 통합 관리하는 솔루션",
                        highlight: "#기업 내부 시스템과 AI 기능 표준화"
                      },
                      {
                        image: "/logo_6.png",
                        title: "Codebox",
                        desc: "폐쇄형 설치형 AI 코드 개발 어플라이언스",
                        highlight: "#보안 특화 AI 개발 환경"
                      },
                      {
                        image: "/logo_4.png",
                        title: "CloudWiz",
                        desc: "클라우드 운영 효율화와 자동화를 지원하는 관리 서비스",
                        highlight: "#멀티 클라우드 비용 30% 절감"
                      }
                    ].map((card, i) => (
                      <div key={i}>
                        <SolutionCard {...card} number={`0${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </section>
          </motion.div>
        </div>


        <section id="use-cases" data-theme="dark" className="relative" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-[1280px] mx-auto w-full container-responsive pt-16 md:pt-32 pb-0 text-left md:text-center relative">
            <div className="w-full flex flex-col items-start md:items-center">
              <span className="text-body-sm md:text-body mb-3 block font-medium text-white/40">고객 사례</span>
              <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold tracking-tight leading-[1.3] font-poppins mx-0 md:mx-auto text-white">
                Use Cases
              </h1>
            </div>
          </div>

          <div className="max-w-[1248px] mx-auto w-full container-responsive py-16 md:py-24 flex flex-col items-center">
            <div className="w-full flex flex-col gap-24 md:gap-32 items-center">
            {useCaseItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center w-full max-w-[1200px]">
                {/* Quote Header */}
                <div className="w-full flex flex-col items-center text-center mb-16">
                  <div className="text-[48px] md:text-[60px] font-serif text-white/30 leading-none h-8 select-none">“</div>
                  <h2 className="text-[20px] md:text-[28px] font-bold mb-5 leading-[1.5] break-keep max-w-[800px] bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                    질문만으로 원하는 데이터(문서, 통계)를 바로 찾고,<br />
                    3개월 안에 업무에 적용한 AI 구축 사례
                  </h2>
                  <div className="text-[14px] md:text-[16px] font-medium text-white/40">
                    - 한국기계산업진흥원
                  </div>
                </div>

                {/* Image */}
                <div className="w-full rounded-[20px] overflow-hidden mb-8 border border-white/10 bg-white/5">
                    <img src={item.image} alt={item.titlePrefix} className="w-full h-auto object-contain" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-12 md:gap-[120px] text-left w-full mt-12 mb-16 items-stretch">
                    {/* Left: Title & Chips & Button (aligned to bottom) */}
                    <div className="md:w-1/3 flex flex-col justify-between items-start">
                      <div className="flex flex-col items-start">
                        <h3 className="text-[32px] md:text-[40px] mb-6 leading-[1.2] tracking-tight text-white">
                          <span className="font-bold block">{item.titlePrefix}</span>
                          {item.titleSuffix && <span className="font-normal block mt-2 text-white/80">{item.titleSuffix}</span>}
                        </h3>
                        {item.tags && (
                          <div className="flex flex-wrap gap-2 justify-start">
                            {item.tags.map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="px-4 py-1.5 text-[15px] font-medium rounded-full bg-white/10 text-white/90"
                              >
                                # {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                    </div>

                    {/* Right: Description + Features */}
                    <div className="flex-1 flex flex-col gap-10">
                      <p className="text-[16px] leading-relaxed font-normal text-white/70 break-keep max-w-[640px]">
                        {item.desc}
                      </p>

                      {/* Features */}
                      {item.features && (
                        <div className="bg-white/[0.03] border border-white/10 rounded-[16px] p-6 flex flex-col gap-4">
                          {item.features.map((feature: string, i: number) => (
                            <div key={i} className="flex items-baseline gap-4">
                              <span className="text-[12px] font-bold text-blue-400 tracking-widest shrink-0">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="text-[15px] font-normal text-[#CCCCCC] leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-start">
                        <Button
                          variant="outline"
                          rounded="lg"
                          size="cta"
                          className="w-[120px] h-[48px] border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all"
                          onClick={() => navigate('/use-cases')}
                        >
                          <span>전체보기</span>
                        </Button>
                      </div>
                    </div>
                  </div>
              </div>
            ))}
            </div>
          </div>
        </section>



        {/* Why kt ds - 프로세스 섹션 */}
        <ProcessSection isMobile={isMobile} />

        {/* FAQ 섹션 */}
        <section id="faq" className="py-12 md:pt-24 md:pb-[60px] relative overflow-hidden bg-bg-main">
          <div className="max-w-[1280px] mx-auto container-responsive">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
              {/* 왼쪽: 헤더 */}
              <div className="lg:w-1/3">
                <h1 className="text-heading-md md:text-heading-lg lg:text-display-md font-bold mb-6 md:mb-8 tracking-tight leading-tight font-poppins text-text-primary">
                  FAQ
                </h1>
              </div>

              {/* 오른쪽: 아코디언 리스트 */}
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  {(() => {
                    const FAQList = () => {
                      const [openIndex, setOpenIndex] = useState<number | null>(null);

                      const faqs = [
                        {
                          q: "기존 시스템과의 연계는 어떻게 지원하나요?",
                          a: "REST API, DB 커넥터, 파일 기반 연계 등 표준 인터페이스를 지원합니다. ERP, 그룹웨어, 데이터 웨어하우스 등 기존 시스템과의 통합 구성이 가능합니다."
                        },
                        {
                          q: "온프레미스 환경에서도 구축이 가능한가요?",
                          a: "네. 온프레미스, 프라이빗 클라우드, 퍼블릭 클라우드 환경 모두 지원합니다. 기업 보안 정책에 따라 망분리 환경 구성도 가능합니다."
                        },
                        {
                          q: "데이터는 외부 전송이 가능한가요?",
                          a: "데이터 처리 방식은 구축 형태에 따라 달라집니다. 기업 내부 처리 구조 설계가 가능하며, 데이터 저장·전송·로그 정책은 고객사 기준에 맞춰 설정됩니다."
                        },
                        {
                          q: "LLM 및 모델 구조는 어떻게 구성되나요?",
                          a: "멀티에이전트 기반 아키텍처로 구성되며, 업무 목적에 따라 다양한 모델을 선택·조합할 수 있습니다. 사내 전용 모델 연계 또는 외부 API 연동도 지원합니다."
                        },
                        {
                          q: "확장성과 운영 관리는 어떻게 이루어지나요?",
                          a: "모듈형 구조로 설계되어 기능 단위 확장이 가능하며, 관리 콘솔을 통해 사용자 권한, 사용 이력, Agent 운영 현황을 통합 관리할 수 있습니다."
                        }
                      ];

                      return (
                        <>
                          {faqs.map((item, i) => {
                            const isOpen = openIndex === i;
                            return (
                              <motion.div
                                key={i}
                                className="border-b border-border-light"
                                initial={false}
                              >
                                <Button
                                  variant="ghost"
                                  onClick={() => setOpenIndex(isOpen ? null : i)}
                                  className="w-full py-8 flex items-center justify-between text-left group cursor-pointer h-auto px-0 hover:bg-transparent"
                                >
                                  <span className={`text-body-xs md:text-body-md font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                                    {item.q}
                                  </span>
                                  <div className="relative w-6 h-6 flex items-center justify-center">
                                    <motion.div
                                      className="absolute w-5 h-[2px] bg-brand-primary"
                                      animate={{ rotate: 0 }}
                                    />
                                    <motion.div
                                      className="absolute w-5 h-[2px] bg-brand-primary"
                                      animate={{ rotate: isOpen ? 0 : 90 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                    />
                                  </div>
                                </Button>
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                    >
                                      <p className="pb-8 text-body-base leading-relaxed font-normal break-keep max-w-2xl text-text-secondary">
                                        {item.a}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </>
                      );
                    };
                    return <FAQList />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="logos" className="relative py-10 overflow-hidden bg-bg-main">
          <div className="relative z-10 w-full text-center">
            <div className="relative overflow-hidden w-full py-4">
              <motion.div
                className="flex items-center gap-x-12 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear"
                }}
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      { name: "KT", logo: "/logos/kt.png", scale: 1 },
                      { name: "경기도", logo: "/logos/gyeonggido.png", scale: 1 },
                      { name: "현대그린푸드", logo: "/logos/hwell.png", scale: 1.2 },
                      { name: "한국철도공사", logo: "/logos/kr.png", scale: 1.2 },
                      { name: "건국대학교 미래지식교육원", logo: "/logos/konmi.png", scale: 1.2 },
                      { name: "트루엔", logo: "/logos/true.png", scale: 1.2 }
                    ].map((brand, idx) => (
                      <div key={`${i}-${idx}`} className="flex items-center justify-center shrink-0 w-[180px] h-[80px]">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          style={{ transform: `scale(${brand.scale})` }}
                          className={`max-h-[38px] max-w-[140px] w-auto h-auto object-contain opacity-100 transition-all duration-300 pointer-events-auto brightness-0 ${isDark ? 'invert' : ''}`}
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA 배너 - Full Width (Silk Motion Style) */}
        <div className="w-full py-0">
          <section data-theme="dark" className="relative h-[500px] w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Silk Motion Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Silk
                speed={3.5}
                scale={0.8}
                color="#c8d8ff"
                noiseIntensity={6}
                rotation={4.8}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black/97" />
            </div>

            <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center font-pretendard px-6 py-20">
              <motion.div
                initial={isMobile ? false : { opacity: 0, y: 30 }}
                whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-white text-heading-sm md:text-display-sm font-bold mb-6 md:mb-10 tracking-tighter leading-[1.2] drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  Biz.AI와 함께<br />
                  AI 혁신을 지금 실행하세요.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="premium"
                    size="cta"
                    rounded="xl"
                    className="w-[140px] relative group transition-all duration-300"
                  >
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">무료체험 신청</span>
                    <ChevronRight size={18} className="absolute right-4 max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                  </Button>
                  <Button
                    variant="glass"
                    size="cta"
                    rounded="xl"
                    className="w-[140px] mt-3 sm:mt-0 relative group transition-all duration-300"
                  >
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">솔루션 문의</span>
                    <ChevronRight size={18} className="absolute right-4 max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Go to Top 버튼 */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-[100] w-11 h-11 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-lg shadow-brand-primary/30 transition-colors cursor-pointer"
              aria-label="맨 위로 가기"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 풋터 */}
        <footer className="py-16 px-6 relative z-20 bg-[#0A0A0A]">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0 font-pretendard">
            {/* 좌측: 로고 + 주소 */}
            <div className="flex flex-col items-start gap-8">
              <img
                src="/ktds_white.png"
                alt="kt ds"
                className="h-8 w-auto object-contain"
              />
              <p className="text-label-lg text-white/50 font-medium text-left">
                (06707) 서울 서초구 효령로 176, 02-523-7029
              </p>
            </div>

            {/* 우측: 메뉴 + 저작권 */}
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-label-lg text-white/50 font-medium">
                <a href="#" className="hover:text-white transition-colors">사이트맵</a>
                <a href="#" className="hover:text-white transition-colors">공지사항</a>
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
              </div>
              <p className="text-label-md text-white/30 font-medium text-left">
                © 2026 AI Biz Portal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
