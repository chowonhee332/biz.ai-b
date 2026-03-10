/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionTemplate, motion, useInView, AnimatePresence, animate, useAnimation, useMotionValueEvent, useMotionValue, useSpring } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticleEngine from './components/ParticleEngine';
import HeroContent from './components/HeroContent';
import { LightRays } from './components/LightRays';
import { HIGHLIGHT_NEWS, REGULAR_NEWS } from '@/context/news/news-data';
import { USE_CASES, USE_CASE_CATEGORIES, USE_CASE_CATEGORY_COLORS } from '@/context/use-cases/use-case-data';
import Silk from './components/Silk';
import Navbar from './components/Navbar';
import Aurora from './components/Aurora';
import Antigravity from './components/Antigravity';
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUp,
  Search,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Code,
  Brain,
  Cpu,
  Rocket,
  Settings,
  Box,
  BookOpen,
  Globe,
  Youtube,
  Linkedin,
  Mail,
  Smartphone,
  Info,
  Menu,
  X,
  ExternalLink,
  Utensils,
  Monitor,
  Layers,
  Layout,
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

const SolutionCard = ({ number, image, title, desc, highlight, isLarge }: { number: string; image: string; title: string; desc: string; highlight: string; isLarge?: boolean }) => (
  <div className="bg-white rounded-[20px] p-10 flex flex-col w-full min-w-[280px] h-[424px] group cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 font-pretendard relative overflow-hidden">
    {/* Index Number */}
    <div className="text-black text-[20px] font-bold leading-none mb-3">{number}</div>

    {/* Title & Description Group */}
    <div className="flex flex-col gap-4 mb-6">
      <h4 className="text-black text-[32px] font-bold tracking-tight leading-tight">{title}</h4>
      <div className="min-h-[48px]"> {/* Align highlight tags by giving min-height to desc */}
        <p className="text-black/80 text-[16px] leading-snug font-normal break-keep whitespace-pre-line">
          {desc}
        </p>
      </div>
    </div>

    {/* Highlight Tag */}
    <div className="text-[#1A75FF] font-medium text-[16px] tracking-tight">
      {highlight.startsWith('#') ? highlight : `# ${highlight}`}
    </div>

    {/* Logo: Absolute Bottom Right Positioning */}
    <div className="absolute bottom-10 right-10 pointer-events-none">
      <div className={`relative flex items-end justify-end transition-transform duration-500 group-hover:scale-105 ${isLarge ? 'w-44 h-44' : 'w-[160px] h-[160px]'}`}>
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-contain object-right-bottom origin-bottom-right"
        />
      </div>
    </div>
  </div>
);



const Char = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
  // Increased base opacity to 0.4 for 'unwritten' text as requested
  const opacity = useTransform(progress, range, [0.4, 1]);
  return <motion.span style={{ opacity }} className="whitespace-pre">{children}</motion.span>;
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
        const colorClass = isHighlight ? "text-brand-primary" : "text-text-primary";

        return (
          <div
            key={lineIdx}
            className={`flex flex-wrap text-[32px] md:text-[40px] font-bold tracking-tight leading-[1.3] ${colorClass}`}
          >
            {line.split('').map((char, charIdx) => {
              const charStart = range[0] + (charCounter / totalChars) * (range[1] - range[0]);
              const charEnd = range[0] + ((charCounter + 1) / totalChars) * (range[1] - range[0]);
              charCounter++;
              return (
                <Char key={charIdx} progress={scrollProgress} range={[charStart, charEnd]}>
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

const InteractiveMockup = ({ image, frameImage, initialMouseX = -0.75, cursorColor = "var(--color-brand-primary)", cursorName = "Biz.AI" }: { image: string; frameImage: string; initialMouseX?: number; cursorColor?: string; cursorName?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(initialMouseX);
  const mouseY = useMotionValue(0.3);

  // 커스텀 커서를 위한 실제 픽셀 좌표 (딜레이 없는 트래킹용)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // 마우스 위치에 따라 이미지가 따라오는 효과 (실시간 반응성을 위해 stiffness를 250으로 대폭 강화)
  const imgX = useSpring(useTransform(mouseX, [-1, 1], [-400, 400]), { stiffness: 250, damping: 30 });
  const imgY = useSpring(useTransform(mouseY, [-1, 1], [-200, 200]), { stiffness: 250, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // 커스텀 커서 위치 업데이트
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
    if (!isHovered) setIsHovered(true);

    // -1 ~ 1 사이 정규화
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    // 마우스가 떠나면 다시 설정된 초기 오프셋 지점으로 즉시 복귀
    mouseX.set(initialMouseX);
    mouseY.set(0.3);
    setIsHovered(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center lg:justify-end relative group/frame shrink-0 bg-transparent">
      {/* 겉 프레임: 원래의 널찍한 사이즈로 복원 */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-[16px] overflow-hidden border border-white/[0.06] cursor-none shadow-2xl bg-[#0a0a0f]"
      >
        {/* 배경 이미지 (프레임) */}
        <img
          src={frameImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* 안의 이미지: 마우스 커서에 따라 움직임 */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="absolute inset-[-40%] flex items-center justify-center p-16"
        >
          <img
            src={image}
            alt="Use Case Screenshot"
            className="w-[180%] h-auto rounded-[12px] shadow-2xl object-contain pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </motion.div>

        {/* 커스텀 커서 (협업 스타일) */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            opacity: isHovered ? 1 : 0
          }}
          className="absolute top-0 left-0 z-50 pointer-events-none select-none"
        >
          {/* 포인터 화살표 */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L11 20L14 14L20 11L4 4Z" fill={cursorColor} stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          {/* 이름표 */}
          <div
            className="ml-6 -mt-1 px-3 py-1 text-white text-[12px] font-bold rounded-lg shadow-lg border border-white/20 whitespace-nowrap"
            style={{ backgroundColor: cursorColor }}
          >
            {cursorName}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const UseCaseVisual = ({ image, frameImage, initialMouseX, cursorColor, cursorName, index, setActive, isActive }: { image: string; frameImage: string; initialMouseX: number; cursorColor: string; cursorName: string; index: number; setActive: (idx: number) => void; isActive: boolean }) => {
  const ref = useRef(null);
  // The isInView logic is now handled by the parent component's scroll progress
  // and activeUseCase state. This component will just render based on isActive prop.
  // const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.5 });

  // useEffect(() => {
  //   if (isInView) setActive(index);
  // }, [isInView, index, setActive]);

  return (
    <motion.div
      ref={ref}
      // initial={{ opacity: 0, y: 40 }} // Initial state is now handled by parent motion.div
      // animate={(isInView || isActive) ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} // Animation is now handled by parent motion.div
      // transition={{
      //   type: "spring",
      //   stiffness: 100,
      //   damping: 30,
      //   mass: 1,
      //   restDelta: 0.001,
      //   delay: 0.1
      // }}
      className="w-full h-full smooth-gpu"
    >
      <InteractiveMockup image={image} frameImage={frameImage} initialMouseX={initialMouseX} cursorColor={cursorColor} cursorName={cursorName} />
    </motion.div>
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
  onMouseEnter
}: {
  title: string;
  agents: string[];
  image: string;
  isActive: boolean;
  onMouseEnter: () => void
}) => {
  return (
    <motion.div
      layout
      onMouseEnter={onMouseEnter}
      className="relative h-[400px] md:h-[550px] lg:h-[700px] overflow-hidden cursor-pointer rounded-2xl smooth-gpu w-full lg:w-auto"
      style={{ willChange: 'flex, width' }}
      animate={{
        flex: isActive ? (window.innerWidth < 1024 ? 300 : 680) : (window.innerWidth < 1024 ? 80 : 122),
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 24,
        mass: 0.8
      }}
    >
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          loading="eager"
          className="w-full h-full object-cover"
          animate={{
            filter: isActive ? 'grayscale(0) brightness(0.9) contrast(1.1)' : 'grayscale(1) brightness(0.5)',
            scale: isActive ? 1.05 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className={`absolute inset-x-0 top-0 p-6 md:p-8 flex flex-col justify-start h-full ${isActive ? 'text-left' : 'text-center'}`}>
        <div className={`flex flex-col gap-2 md:gap-4 ${isActive ? 'items-start' : 'items-center'}`}>
          <motion.div
            layout
            initial={false}
          >
            <h4 className={`text-white font-normal transition-colors duration-500 whitespace-nowrap ${isActive ? 'text-[16px] md:text-[18px] mb-2 md:mb-4' : 'text-[16px] md:text-[18px]'}`}>
              {title}
            </h4>
          </motion.div>

          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-1 md:gap-2"
            >
              {agents.map((agent, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-gray-100 text-[18px] md:text-[24px] lg:text-[28px] font-bold">{agent}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Tag = ({ text }: { text: string }) => (
  <Badge variant="outline" className="border-brand-primary text-brand-primary rounded-full px-4 py-1.5 font-medium whitespace-nowrap">
    {text}
  </Badge>
);

const ProcessSection = ({ isMobile }: { isMobile: boolean }) => {
  const processRef = useRef(null);
  const { scrollYProgress: scrollYProcess } = useScroll({
    target: processRef,
    offset: ["start end", "center center"]
  });

  const clipPathProcessBase = useTransform(
    scrollYProcess,
    [0.1, 0.6],
    ["inset(200px 300px round 40px)", "inset(0px 24px round 40px)"]
  );

  const clipPathProcess = isMobile ? "none" : clipPathProcessBase;

  return (
    <div className="relative w-full py-10" ref={processRef}>
      <motion.div
        style={{ clipPath: clipPathProcess, scrollMarginTop: "100px" } as any}
        className={`bg-[#F3F5FC] border-black/5 relative z-20 overflow-hidden shadow-2xl smooth-gpu ${isMobile ? 'border-none' : 'border'}`}
      >
        <section id="process" className="py-32 relative overflow-hidden px-6">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center mb-24 container-responsive">
              <p className="text-brand-primary text-[18px] font-semibold mb-4 tracking-wide">Why kt ds</p>
              <h2 className="text-[36px] lg:text-[58px] font-bold text-black mb-6 tracking-tight leading-tight">
                왜 kt ds와 함께 해야 할까요?
              </h2>
              <p className="text-black/80 text-[18px] max-w-2xl mx-auto font-medium">
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
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="bg-white rounded-[20px] p-10 hover:shadow-lg transition-shadow duration-500 group flex flex-col min-h-[420px]"
                >
                  <div className="min-h-[130px]">
                    <span className={`${step.color} text-[20px] font-bold mb-2 block`}>{step.num}</span>
                    <h3 className="text-[32px] font-bold text-gray-900 leading-tight whitespace-pre-line">{step.subtitle}</h3>
                  </div>
                  <div className="flex-1" />
                  <div className="min-h-[160px]">
                    <h4 className="text-[16px] font-semibold text-gray-900 mb-3">{step.title}</h4>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-black/80 text-[14px] leading-relaxed font-normal">
                          <span className="mt-[9px] w-1 h-1 rounded-full bg-black/25 shrink-0" />
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
      </motion.div>
    </div>
  );
};

const StudioSection = () => {
  return (
    <section id="studio-v2" className="bg-bg-main py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* 메인 배너 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[440px] w-full rounded-[20px] border border-border-light overflow-hidden group mb-5"
        >
          {/* LightRays 배경 - 박스 없이 전체로 활용 */}
          <div className="absolute inset-0 z-0">
            <LightRays
              raysOrigin="right"
              raysColor="#3B82F6"
              raysSpeed={0.15}
              lightSpread={0.8}
              rayLength={2}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-[1]" />

          <div className="relative z-10 pl-20 h-full flex flex-col justify-center max-w-2xl font-pretendard">
            <h2 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-text-primary via-text-primary via-[40%] to-brand-secondary bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
              AI Agent Studio
            </h2>
            <p className="text-text-secondary text-[18px] leading-relaxed break-keep font-normal mb-8 max-w-xl">
              필요한 Agent, Tool, MCP를 빠르게 확인하고 시작하세요.<br />
              쉽게 개발 가능한 AI 아키텍처와 Delivery 가이드를 제공합니다.
            </p>

            <button className="cursor-pointer w-[120px] h-[48px] text-[16px] font-medium border border-white/20 bg-transparent text-white rounded-lg transition-all group flex items-center justify-center p-0 hover:border-white/60 hover:bg-transparent">
              <span>체험하기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[4px] transition-all duration-300 overflow-hidden">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* 하단 4개 기능 카드 - Neubau 스타일 (다크 박스) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Agent 개발",
              desc: "AI Agent 개발을 위한 통합 개발 환경과 도구를 제공합니다.",
              icon: <Code className="text-white" strokeWidth={2.5} size={24} />
            },
            {
              title: "Core Agent",
              desc: "사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다.",
              icon: <Cpu className="text-white" strokeWidth={2.5} size={24} />
            },
            {
              title: "Use Case 패키징",
              desc: "Use case 단위로 패키징된 솔루션을 통해 즉시 배포할 수 있습니다.",
              icon: <Layers className="text-white" strokeWidth={2.5} size={24} />
            },
            {
              title: "Delivery 가이드",
              desc: "AI 아키텍처 소개 및 배포 가이드를 통해 안정적인 운영을 지원합니다.",
              icon: <BookOpen className="text-white" strokeWidth={2.5} size={24} />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-[20px] border border-border-light p-8 pt-4 transition-all duration-300 group hover:border-border-active"
            >
              <div className="size-10 flex items-center justify-center mb-8 group-hover:bg-bg-surface rounded-full transition-colors">
                {item.icon}
              </div>
              <h3 className="text-text-primary text-[20px] font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-text-secondary text-[15px] leading-relaxed break-keep font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY, scrollYProgress } = useScroll();
  const useCaseRef = useRef<HTMLDivElement>(null); // Keep one declaration
  const { scrollYProgress: sectionProgress } = useScroll({
    target: useCaseRef,
    offset: ["start 0.5", "end 1.2"]
  });
  const [activeUseCase, setActiveUseCase] = useState(0);

  // Re-balanced active ranges for 500vh scroll length and longer persistence
  useMotionValueEvent(sectionProgress, "change", (latest) => {
    if (latest < 0.33) setActiveUseCase(0);
    else if (latest < 0.66) setActiveUseCase(1);
    else setActiveUseCase(2);
  });

  const newsScrollRef = useRef<HTMLDivElement>(null);

  const scrollNews = (direction: 'left' | 'right') => {
    if (newsScrollRef.current) {
      const scrollAmount = 400; // 380px card + 24px gap
      newsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  // Re-added clip path animation for the expanding background effect
  const clipPathBase = useTransform(
    scrollYProgress,
    [0.01, 0.03],
    ["inset(200px 300px round 40px)", "inset(0px 24px round 40px)"]
  );

  const clipPath = isMobile ? "none" : clipPathBase;

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const [activeUseCase, setActiveUseCase] = useState(0); // This is now managed by useMotionValueEvent
  const isScrollingRef = useRef(false);

  const scrollToTop = () => {
    isScrollingRef.current = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Re-enable intersection updates after the smooth scroll completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  const handleSetActiveUseCase = React.useCallback((idx: number) => {
    if (!isScrollingRef.current) {
      setActiveUseCase(idx);
    }
  }, []);

  const useCaseItems = [
    {
      id: "works-ai",
      titlePrefix: "AI Portal",
      titleSuffix: "WorksAI",
      question: "회사에서 사용하는\n많은 메뉴를\n사내 최적화하여\n한 곳에서 모아 볼 수는\n없나요?",
      desc: "AI 챗봇 기반 업무 처리를 지원하는 AI Agent 포털 서비스로 기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다.",
      tags: ["AI 비서+그룹웨어", "맞춤형"],
      themeColor: "blue",
      highlightIndex: 3,
      features: [
        "기본적인 업무 기반에 최적화된 AI Agent 제공",
        "업무에 필요한 에이전트를 직접 만들어 사내 공유/ 활용",
        "그룹웨어 위젯 및 메뉴 커스텀을 통해 개인 맞춤 컨텐츠 제공"
      ],
      icon: <Utensils className="w-8 h-8" />,
      image: "/works.png",
      cursorName: "WorksAI"
    },
    {
      id: "audit-agent",
      titlePrefix: "Audit Agent",
      question: "국정 감사에 필요한\n방대한 자료를\n한 번에 분석해서\n보고 싶어요!",
      desc: "방대한 기업 규제 및 감사 문서를 AI가 신속히 분석하여, 법적 리스크를 사전에 파악하고 완벽한 컴플라이언스 대응을 지원합니다.",
      tags: ["자료검색", "감사/리스크"],
      themeColor: "sky",
      highlightIndex: 2,
      features: [
        "사내 규정 및 가이드라인 기반의 AI 감사 수행",
        "키워드/의미 기반의 빠른 법령 및 판례 검색",
        "감사 보고서 자동 초안 작성 및 리스크 등급 분류"
      ],
      icon: <Search className="w-8 h-8" />,
      image: "/works.png",
      cursorName: "Audit"
    },
    {
      id: "meeting-agent",
      titlePrefix: "지능형 회의록 Agent",
      question: "너무나 긴 회의시간....\n핵심 내용만 쏙쏙\n뽑아볼 순 없나요?",
      desc: "음성 인식(STT)과 NLP를 결합하여 회의 중 나오는 화자를 구분하고, 자동으로 액션 아이템을 추출합니다.",
      tags: ["음성인식", "업무추출"],
      themeColor: "emerald",
      highlightIndex: 1,
      features: [
        "실시간 음성 인식 및 화자 분리 기록",
        "회의 내용 자동 요약 및 주요 의사결정 사항 추출",
        "참석자 대상 회의록 자동 메일/메신저 발송 연동"
      ],
      icon: <Monitor className="w-8 h-8" />,
      image: "/works.png",
      cursorName: "지능형 회의록"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-sans">
      {/* GNB - Global Navigation Bar */}
      <Navbar activePage="home" />

      {/* Hero Section */}
      <section id="hero" className="relative z-20 h-screen flex items-center justify-center overflow-clip bg-[#000000] font-poppins">

        <div className="relative z-10 w-full max-w-[1280px] mx-auto container-responsive flex items-center h-full">
          <div className="w-full flex flex-col lg:flex-row items-center relative">
            {/* Left Content */}
            <div className="w-full lg:max-w-[800px] relative z-20">
              <HeroContent align="left" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute lg:left-[55%] top-1/2 -translate-y-1/2 w-[600px] lg:w-[720px] left-1/2 -translate-x-1/2 lg:translate-x-0 z-0 lg:z-10 pointer-events-none opacity-40 lg:opacity-90"
            >
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -inset-20 bg-blue-500/5 rounded-full blur-[100px] z-0" />
                <img
                  src="/banner.png"
                  alt="Biz.AI Hero"
                  className="w-full h-auto object-contain relative z-10 opacity-90 shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} className="text-white/60" strokeWidth={1.5} />
            <ChevronDown size={28} className="text-white/30 -mt-5" strokeWidth={1.5} />
          </motion.div>
          <span className="text-white/40 text-sm font-medium tracking-wider">Scroll down</span>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 bg-[#000000]">
        <div className="relative w-full pt-10">
          {/* Continuous gradient from the Hero section into the gap */}

          <motion.div
            style={{ clipPath, willChange: 'clip-path' } as any}
            className={`bg-[#F3F5FC] border-black/5 relative z-20 overflow-hidden mb-20 smooth-gpu ${isMobile ? 'border-none' : 'border'}`}
          >
            <section id="solution" className="py-32">
              <div className="max-w-[1280px] mx-auto container-responsive relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-center mb-20 font-pretendard flex flex-col items-center relative z-10"
                >
                  <h2 className="text-[36px] lg:text-[58px] font-bold text-black mb-6 tracking-tight leading-tight">
                    AI Solutions
                  </h2>
                  <p className="text-black/80 text-[18px] max-w-2xl mx-auto font-medium">
                    AI 전략부터 운영까지, 기업 AI의 전 과정을 통합 지원합니다.
                  </p>
                </motion.div>


                {/* 그룹 1: 전사 공통 */}
                <div className="mb-32 max-w-[1024px] mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 mb-5 ml-4"
                  >
                    <span className="text-[18px] font-normal text-gray-800">전사 공통 (General Business)</span>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        image: "/logo_1.png",
                        title: "AI:ON-U",
                        desc: "엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder",
                        highlight: "#3분 완성 Agent"
                      },
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
                      }
                    ]
                      .map((card, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: 60, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: false, margin: "-50px" }}
                          transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                        >
                          <SolutionCard {...card} number={`0${i + 1}`} />
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* 그룹 2: IT 서비스/개발 직군 */}
                <div className="mb-14 max-w-[1024px] mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-2 mb-5 ml-4"
                  >
                    <span className="text-[18px] font-normal text-gray-800">IT 서비스/개발 직군 (IT Service & Dev)</span>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        image: "/logo_4.png",
                        title: "CloudWiz",
                        desc: "클라우드 운영 효율화와 자동화를 지원하는 관리 서비스",
                        highlight: "#멀티 클라우드 비용 30% 절감"
                      },
                      {
                        image: "/logo_5.png",
                        title: "Beast AI Gateway", isLarge: true,
                        desc: "엔터프라이즈용 AI 기술, API를 통합 관리하는 솔루션",
                        highlight: "#기업 내부 시스템과 AI 기능 표준화"
                      },
                      {
                        image: "/logo_6.png",
                        title: "Codebox",
                        desc: "폐쇄형 설치형 AI 코드 개발 어플라이언스",
                        highlight: "#보안 특화 AI 개발 환경"
                      }
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 60, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                      >
                        <SolutionCard {...card} number={`0${i + 1}`} />
                      </motion.div>
                    ))}
                  </div>
                </div>


              </div>
            </section>
          </motion.div>
        </div>

        <section id="domain" className="py-20 md:py-32 relative overflow-hidden bg-black pb-16">
          <div className="max-w-[1280px] mx-auto container-responsive">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-left mb-12 md:mb-16 font-pretendard"
            >
              <span className="text-[#1A75FF] font-bold text-[16px] md:text-[20px] mb-2 md:mb-4 block tracking-tight">Multi Agent</span>
              <h2 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-4 md:mb-6 tracking-tight">도메인별 Multi Agent</h2>
              <p className="text-white/80 text-[16px] md:text-[18px] font-normal tracking-tight">공공/금융 등 도메인별로 kt ds의 Multi-Agent를 활용해 보세요.</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-1 md:gap-2 w-full h-[600px] md:h-auto lg:h-[700px]">
              <DomainAccordionItem
                title="금융"
                agents={['Audit Agent', 'SQL Agent', 'RFP Agent']}
                image="https://images.unsplash.com/photo-1643258367012-1e1a983489e5?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 0}
                onMouseEnter={() => setActiveDomain(0)}
              />
              <DomainAccordionItem
                title="공공기관"
                agents={['Audit Agent', 'RFP Agent', 'SQL Agent']}
                image="https://images.unsplash.com/photo-1665865298238-ec7a85eb3f9a?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 1}
                onMouseEnter={() => setActiveDomain(1)}
              />
              <DomainAccordionItem
                title="일반기업"
                agents={['SQL Agent', 'RFP Agent', 'Codebox', 'beast AI Gateway']}
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 2}
                onMouseEnter={() => setActiveDomain(2)}
              />
              <DomainAccordionItem
                title="미디어"
                agents={['SQL Agent', 'TA Agent']}
                image="https://images.unsplash.com/photo-1652166553819-f892e61fc12c?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 3}
                onMouseEnter={() => setActiveDomain(3)}
              />
              <DomainAccordionItem
                title="통신/네트워크"
                agents={['SQL Agent', 'beast AI Gateway', 'Codebox']}
                image="https://images.unsplash.com/photo-1680992044138-ce4864c2b962?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 4}
                onMouseEnter={() => setActiveDomain(4)}
              />
            </div>
          </div>
        </section>

        <section id="use-cases" className="relative bg-[#000000]">
          {/* Title Area: Normal Scrolling */}
          <div className="max-w-[1280px] mx-auto w-full container-responsive pt-32 pb-0 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <span className="text-[#1A75FF] font-bold text-[14px] tracking-widest block mb-4 uppercase">Use Case</span>
              <h2 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent tracking-tight leading-[1.1] font-pretendard mx-auto">
                Solution, Multi Agent <br />
                Use Cases
              </h2>
            </motion.div>
          </div>

          {/* Sticky Pinned Area: Begins after the title scrolls away */}
          <div ref={useCaseRef} className="relative h-auto lg:h-[1400vh]">
            {/* Mobile Layout (Static List) */}
            <div className="lg:hidden w-full flex flex-col gap-16 px-4 py-12">
              {useCaseItems.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-8">
                  {/* Painpoint Section */}
                  <div className="px-2">
                    <p className="text-white/50 text-[14px] font-medium tracking-tight mb-3 font-pretendard">
                      {String(index + 1).padStart(2, '0')}. Painpoint
                    </p>
                    <h3 className="text-[28px] font-bold text-white leading-tight break-keep whitespace-pre-line">
                      {item.question}
                    </h3>
                  </div>

                  {/* Solution + Visual Group */}
                  <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-[20px] p-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <p className="text-[#1A75FF] text-[15px] font-semibold tracking-tight">
                        {String(index + 1).padStart(2, '0')}. Solution
                      </p>
                      <h4 className="text-[24px] font-bold text-white leading-tight">
                        {item.titlePrefix} {item.titleSuffix || ''}
                      </h4>
                      <p className="text-white/70 text-[15px] leading-relaxed break-keep font-normal">
                        {item.desc}
                      </p>
                      <div className="bg-white/[0.04] border border-white/10 rounded-[20px] p-4">
                        <ul className="space-y-2">
                          {item.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/90 text-[14px] leading-relaxed">
                              <span className="text-[#1A75FF] mt-[2px]">•</span>
                              <span className="break-keep">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Visual Preview */}
                    <div className="relative aspect-video rounded-[20px] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
                      <img
                        src={index === 0 ? "/test-1.png" : index === 1 ? "/test-2.png" : "/test-3.png"}
                        alt={item.titlePrefix}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Layout (Sticky & Transitions) */}
            <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center px-4 md:px-6 md:px-10 overflow-hidden">
              <div className="max-w-[1200px] mx-auto w-full h-full">
                <div className="w-full flex flex-col lg:flex-row items-center relative gap-8 lg:gap-0 h-full">
                  <div className="w-full lg:w-[42%] flex flex-col justify-start z-20 pr-0 md:pr-12 lg:pr-16 self-start pt-[20vh] h-full relative">
                    {/* 단일 슬롯: 모든 Use Case가 동일한 자리에서 교체됨 */}
                    <div className="relative h-full">
                      {useCaseItems.map((item, index) => {
                        // 각 아이템별 범위 정의 - 솔루션 체류 시간을 늘리기 위해 dRange를 앞당김
                        const qRange: [number, number] = index === 0 ? [0.0, 0.12] : index === 1 ? [0.33, 0.45] : [0.66, 0.78];
                        const dRange: [number, number] = [qRange[1] + 0.08, qRange[1] + 0.12];
                        const nextStart = index < 2 ? (index === 0 ? 0.33 : 0.66) : 1.0;
                        const exitRange: [number, number] = [nextStart - 0.08, nextStart - 0.02];
                        const isActive = activeUseCase === index;

                        // 라인 애니메이션: 솔루션 등장 완료(dRange[1])부터 퇴장 시작(exitRange[0])까지 채워짐
                        const lineScaleX = useTransform(sectionProgress, [dRange[1], exitRange[0]], [0, 1]);

                        // 숫자가 먼저 채워지고 (qRange의 앞 30%), 이어서 질문 텍스트 (나머지 70%)
                        const qSpan = qRange[1] - qRange[0];
                        const numFillEnd = qRange[0] + qSpan * 0.3;
                        const textRange: [number, number] = [numFillEnd, qRange[1]];

                        // Q: 등장 → D가 시작되면 사라짐 (Cross-fade 적용하여 겹침 방지)
                        const qOpacity = useTransform(sectionProgress, [qRange[0] - 0.01, qRange[0], dRange[0], dRange[1]], [0, 1, 1, 0]);
                        // D: Q가 사라지면서 등장 → 다음 Q 시작 전에 사라짐
                        const dOpacity = useTransform(sectionProgress, [dRange[0], dRange[1], nextStart - 0.03, nextStart], [0, 1, 1, 0]);
                        const dY = useTransform(sectionProgress, dRange, [20, 0]);

                        // 숫자: qRange 시작부터 즉시 100% (다만 내부 CharacterReveal이 0.4 -> 1 조절), 이후 사라짐
                        const numOpacity = useTransform(sectionProgress, [qRange[0] - 0.01, qRange[0], nextStart - 0.03, nextStart], [0, 1, 1, 0]);

                        return (
                          <div key={item.id} className="absolute inset-0 w-full" style={{
                            pointerEvents: isActive ? 'auto' : 'none',
                            zIndex: isActive ? 50 : 0
                          }}>
                            {/* 번호 + 질문 레이어 */}
                            <motion.div
                              style={{ opacity: qOpacity }}
                              className="absolute inset-0"
                            >
                              <motion.p
                                style={{ opacity: numOpacity }}
                                className="text-white text-[18px] lg:text-[20px] font-medium tracking-tight mb-6 font-pretendard"
                              >
                                {String(index + 1).padStart(2, '0')}. Painpoint
                              </motion.p>
                              <CharacterReveal
                                text={item.question}
                                scrollProgress={sectionProgress}
                                range={textRange}
                                highlightIndex={item.highlightIndex}
                              />
                            </motion.div>

                            {/* 설명 레이어 */}
                            <motion.div
                              style={{ opacity: dOpacity, y: dY }}
                              className="absolute inset-0 w-full"
                            >
                              <div className="flex items-center gap-4 mb-4 w-full max-w-lg">
                                <p className="text-white text-[20px] font-normal tracking-tight font-pretendard">
                                  {String(index + 1).padStart(2, '0')}
                                </p>
                                <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                                  <motion.div
                                    style={{ scaleX: lineScaleX, originX: 0 }}
                                    className="absolute inset-0 bg-white shadow-[0_0_10px_white]"
                                  />
                                </div>
                              </div>

                              <h3 className="text-[40px] text-white mb-2 leading-tight">
                                <span className="font-bold">{item.titlePrefix}</span>{" "}
                                <span className="font-normal">{item.titleSuffix}</span>
                              </h3>
                              <p className="text-[16px] text-white/80 leading-relaxed max-w-lg mb-3 font-normal">
                                {item.desc}
                              </p>
                              {item.tags && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {item.tags.map((tag: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-1 py-1.5 text-[16px] font-medium"
                                      style={{ color: item.themeColor === 'sky' ? '#0EA5E9' : item.themeColor === 'emerald' ? '#10B981' : '#00AEFF' }}
                                    >
                                      # {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {item.features && (
                                <div className="border-y border-white/20 py-10 mb-6 max-w-lg">
                                  <ul className="space-y-3">
                                    {item.features.map((feature: string, i: number) => (
                                      <li key={i} className="flex items-start gap-4 text-white text-[16px] leading-snug font-normal">
                                        <div className="w-1 h-1 rounded-full bg-white mt-[10px] shrink-0" />
                                        <span className="bg-gradient-to-r from-white to-[#B9D9FF] bg-clip-text text-transparent">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </motion.div>

                            {/* 버튼 영역: 텍스트 영역과 별도로 하단 고정 배치 */}
                            <motion.div
                              style={{ opacity: dOpacity }}
                              className="absolute bottom-[10vh] left-0 pointer-events-auto"
                            >
                              <button
                                className="w-[100px] h-[48px] text-[16px] font-medium border border-white/20 bg-transparent text-white rounded-lg transition-all group flex items-center justify-center p-0 hover:border-white/60 hover:bg-transparent"
                                onClick={() => navigate('/use-cases')}
                              >
                                <span className="group-hover:-translate-x-1 transition-transform duration-300">전체보기</span>
                                <ChevronRight size={18} className="max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                              </button>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 우측 이미지: flex 레이아웃으로 화면 정중앙 배치 */}
                  <div className="w-full lg:w-[58%] flex items-center justify-end overflow-visible">
                    <div className="w-full relative h-[80vh]">
                      {useCaseItems.map((item, index) => {
                        const isActive = activeUseCase === index;
                        // 텍스트 레이어와 동기화된 범위 계산
                        const qRange: [number, number] = index === 0 ? [0.0, 0.12] : index === 1 ? [0.33, 0.45] : [0.66, 0.78];
                        const dRange: [number, number] = [qRange[1] + 0.08, qRange[1] + 0.12];
                        const nextStart = index < 2 ? (index === 0 ? 0.33 : 0.66) : 1.0;
                        const exitRange: [number, number] = [nextStart - 0.08, nextStart - 0.02];

                        // 1단계 (진입): 텍스트(Painpoint)가 먼저 나오고, 읽을 시간을 가진 뒤 등장 (지연 타이밍 적용)
                        const entryStart = dRange[0] - 0.04;
                        const entryEnd = dRange[1];
                        const x = useTransform(sectionProgress, [entryStart, entryEnd], [400, 0]);

                        // 2단계 (고정): dRange 동안은 x: 0, y: 0으로 고정

                        // 3단계 (퇴장): 다음 페인포인트 시작 전 위로 스크롤 (y: 0 -> -400)
                        const y = useTransform(sectionProgress, [exitRange[0], exitRange[1]], [0, -400]);

                        // 등장 페이드 (entryStart 시점부터 지연 등장)
                        const opacity = useTransform(sectionProgress, [entryStart, entryStart + 0.03], [0, 1]);

                        return (
                          <motion.div
                            key={index}
                            style={{
                              opacity: isActive ? opacity : 0,
                              x: isActive ? x : 400,
                              y: isActive ? y : 0,
                              scale: isActive ? 1 : 0.95,
                              pointerEvents: isActive ? 'auto' : 'none',
                            }}
                            className="absolute inset-0 w-full h-full flex items-center justify-end"
                          >
                            <UseCaseVisual
                              image={item.image}
                              frameImage={index === 0 ? "/test-1.png" : index === 1 ? "/test-2.png" : "/test-3.png"}
                              initialMouseX={index === 0 ? 0.75 : -0.75}
                              cursorColor={item.themeColor === 'sky' ? '#0EA5E9' : item.themeColor === 'emerald' ? '#10B981' : '#0066FF'}
                              cursorName={item.cursorName}
                              index={index}
                              setActive={() => { }}
                              isActive={isActive}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Why kt ds - 프로세스 섹션 */}
        <ProcessSection isMobile={isMobile} />

        <section id="logos" className="relative py-12 bg-black overflow-hidden">
          <div className="relative z-10 max-w-[1280px] mx-auto container-responsive text-center">
            <div className="relative overflow-hidden w-full py-4">
              <motion.div
                className="flex items-center gap-x-20 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }}
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      { name: "Kakaobank", color: "blue" },
                      { name: "Samsung", color: "blue" },
                      { name: "SK Hynix", color: "blue" },
                      { name: "Hyundai", color: "blue" }
                    ].map((brand, idx) => (
                      <div key={`${i}-${idx}`} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500/40" />
                        </div>
                        <span className="text-xl font-bold text-white/40 tracking-tight">{brand.name}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="stats" className="py-32 bg-[#000000]">
          <div className="max-w-[1280px] mx-auto container-responsive">
            <div className="text-center mb-32">

              <h2 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight">
                수치로 증명하는 Biz.AI
              </h2>
              <p className="text-white/80 text-[18px] max-w-3xl mx-auto font-normal">
                150+ 고객과 600+ AI Agent 구축 경험으로 Biz.AI의 역량을 증명합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-16">
              {[
                { label: "IT Engineers", value: 1700, suffix: "+", sub: "Cloud & AI 기술을 선도하는 전문 인력" },
                { label: "Solution", value: 18, suffix: "", sub: "AX를 리딩하는 자체 개발 솔루션" },
                { label: "Clients", value: 150, suffix: "+", sub: "금융·공공·유통·미디어 등 다양한 산업 고객" },
                { label: "AI Agent", value: 600, suffix: "+", sub: "도메인별 특화 AI 에이전트" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-start font-pretendard">
                  <div className="text-[80px] font-medium text-white tracking-tighter leading-none mb-12">
                    <AnimatedCounter from={0} to={stat.value} />
                    <span className="text-[#1A75FF] ml-1">{stat.suffix}</span>
                  </div>
                  <span className="text-white text-[18px] font-bold mb-1">{stat.label}</span>
                  <p className="text-white/80 text-[16px] leading-relaxed font-normal break-keep">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 px-6 bg-[#000000] relative">
          <div className="max-w-[1000px] mx-auto">
            <div className="max-w-[1000px] mx-auto relative group">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
                {[
                  { user: "Musa M.", role: "Figma for web design.", stars: 4.5, quote: "kt ds의 AI 솔루션은 상상 그 이상이었습니다. No-code 기반으로 이렇게 정교한 에이전트를 만들 수 있다는 게 믿기지 않네요." },
                  { user: "Marcelo A.", role: "CEO and Co-Founder", stars: 5, quote: "Great marketing site building in no time. 복잡한 지식 베이스를 RAG로 구축하는 과정이 너무나 간결합니다." },
                  { user: "Jorge H.", role: "Founder", stars: 5, quote: "Web design and development brought to a new level - also friendly for non-tech people. 비전문가도 수준 높은 AI 서비스를 운영할 수 있습니다." },
                  { user: "Ayush S.", role: "Product Designer", stars: 5, quote: "Design and publish websites in minutes! And for free! 디자인 작업과 AI 로직 구현이 완벽하게 시너지를 냅니다." },
                  { user: "Priya P.", role: "Product Designer", stars: 5, quote: "Best tool in market to create and ship website live faster. 기업용 AI 도입 속도를 획기적으로 단축시켜주었습니다." },
                  { user: "Erman M.", role: "Freelance designer", stars: 5, quote: "The easiest web design tool I've ever used. 정말 직관적이고 강력합니다." },
                  { user: "Durvesh C.", role: "User Interface Designer", stars: 5, quote: "Smooth and easy to migrate no code tool. 기존 레거시 시스템과의 연동이 매끄럽게 이루어집니다." },
                  { user: "Alex C.", role: "Manager", stars: 4.5, quote: "A good balance between full customization and easy to use platform. 커스터마이징의 유연성과 편의성을 모두 잡았습니다." },
                  { user: "Selçuk K.", role: "Senior DevOps Consultant", stars: 5, quote: "Easy and powerful. 인프라와 AI의 결합이 완벽한 자동화를 만들어냅니다." },
                  { user: "Shaddy", role: "My go-to tool for website designing.", stars: 5, quote: "복잡했던 업무들이 AI 에이전트 하나로 자동화되는 경험은 놀라웠습니다." },
                  { user: "Nidhi B.", role: "Content Writer", stars: 4.5, quote: "The road to no-code interface designing has been made easy with applications like Framer." },
                  { user: "Leo A.", role: "Amazing tool for no-code modern web design and publishing", stars: 5, quote: "엔터프라이즈 AI의 패러다임을 바꿀 만한 강력한 도구입니다!" },
                ].slice(0, isMobile ? 4 : undefined).map((post, i) => (
                  <div key={i} className="break-inside-avoid bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-[20px] p-7 hover:border-white/20 transition-all duration-300 group/card">
                    <div className="mb-4">
                      <div className="text-white font-bold text-[18px] mb-1">{post.user}</div>
                      <div className="text-white/40 text-[14px] font-medium leading-tight mb-4">{post.role}</div>
                      <p className="text-white/80 text-[15px] leading-[1.6] font-normal break-keep mb-5">{post.quote}</p>

                      {/* 별점 */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={index < Math.floor(post.stars) ? "#3B82F6" : "rgba(255,255,255,0.1)"}
                            className="shrink-0"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 바닥 그라데이션 페이드 아웃 */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* 새로운 소식 섹션: 우측 블리드(Bleed) 레이아웃 */}
        <section id="news" className="py-32 bg-[#000000] relative">
          {/* 헤더 영역: 컨테이너 내부 */}
          <div className="max-w-[1280px] mx-auto container-responsive mb-16">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start text-left">
                <h2 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                  새로운 소식
                </h2>
                <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                  Biz.AI가 전하는 최신 업데이트와 인사이트를 확인하세요.
                </p>
              </div>

              {/* 내비게이션 버튼 (우측 상단) */}
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

          {/* 뉴스 카드 리스트: 타이틀 정렬 + 우측 블리드 */}
          <div
            ref={newsScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 pr-6"
            style={{
              paddingLeft: `calc(max(0px, (100% - 1200px) / 2) + var(--responsive-padding))`
            }}
          >
            {[...HIGHLIGHT_NEWS, ...REGULAR_NEWS].slice(0, 8).map((news: any, i) => (
              <motion.div
                key={i}
                className="group cursor-pointer shrink-0 w-[380px]"
                onClick={() => {
                  navigate(`/news/${i + 1}`, { state: { news } });
                }}
              >
                {/* 썸네일: 380 * 240 사이즈 */}
                <div className="relative w-full aspect-[380/240] rounded-[20px] overflow-hidden mb-5 bg-zinc-900 border border-white/5 shadow-2xl">
                  <motion.img
                    src={news.이미지}
                    alt={news.타이틀}
                    className="w-full h-full object-cover transition-all duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                </div>

                <div className="flex flex-col" style={{ paddingLeft: 'var(--responsive-padding)' }}>
                  <span className="text-blue-400 text-[14px] font-bold mb-3">{news.태그}</span>
                  <h3 className="text-white text-[24px] font-bold leading-snug mb-3 whitespace-pre-line group-hover:text-blue-400 transition-colors">
                    {news.타이틀}
                  </h3>
                  <div className="flex items-center text-white/40 text-[14px] font-medium">
                    <span>{news.솔루션}</span>
                    <span className="mx-2 text-[4px] opacity-50">●</span>
                    <span>{news.날짜}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 더보기 버튼: 중앙 정렬 */}
          <div className="flex justify-center mt-8">
            <Link to="/news">
              <button className="cursor-pointer w-[120px] h-[48px] text-[16px] font-medium border border-white/20 bg-transparent text-white rounded-lg transition-all group flex items-center justify-center p-0 hover:border-white/60 hover:bg-transparent">
                <span>전체보기</span><ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[2px] transition-all duration-300 overflow-hidden" />
              </button>
            </Link>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section id="faq" className="py-24 bg-[#000000] relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto container-responsive">
            <div className="flex flex-col lg:flex-row gap-20">
              {/* 왼쪽: 헤더 */}
              <div className="lg:w-1/3">
                <h2 className="text-[36px] lg:text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-8 tracking-tight leading-tight font-pretendard">
                  FAQ
                </h2>
              </div>

              {/* 오른쪽: 아코디언 리스트 */}
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  {/* self-invoking function을 사용하여 지역 상태(openFaqIndex)를 FAQ 목록 전체에서 관리합니다. */}
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
                                className="border-b border-white/20"
                                initial={false}
                              >
                                <button
                                  onClick={() => setOpenIndex(isOpen ? null : i)}
                                  className="w-full py-8 flex items-center justify-between text-left group cursor-pointer"
                                >
                                  <span className={`text-[20px] font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                                    {item.q}
                                  </span>
                                  <div className="relative w-6 h-6 flex items-center justify-center">
                                    {/* Horizontal line (always visible) */}
                                    <motion.div
                                      className="absolute w-5 h-[2px] bg-[#0066FF]"
                                      animate={{ rotate: 0 }}
                                    />
                                    {/* Vertical line (rotates to become horizontal to make '-') */}
                                    <motion.div
                                      className="absolute w-5 h-[2px] bg-[#0066FF]"
                                      animate={{ rotate: isOpen ? 0 : 90 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                    />
                                  </div>
                                </button>
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                    >
                                      <p className="pb-8 text-white/50 text-[17px] leading-relaxed font-normal break-keep max-w-2xl">
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


        {/* AI Agent 스튜디오 섹션 */}
        <StudioSection />

        {/* CTA 배너 - Full Width (Premium Aurora Style) 복구 */}
        <div className="w-full py-0">
          <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60">
              <Silk
                speed={5}
                scale={0.6}
                color="#5d7cda"
                noiseIntensity={2.5}
                rotation={1.2}
              />
            </div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center font-pretendard px-6 py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-white text-[32px] lg:text-[52px] font-bold mb-10 tracking-tighter leading-[1.2] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                  Biz.AI와 함께<br />
                  AI 혁신을 지금 실행하세요.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    className="group bg-white text-[#000000] hover:bg-white/90 w-[140px] h-[48px] py-0 text-[15px] font-semibold rounded-full transition-all flex items-center justify-center gap-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    무료체험 신청
                    <ChevronRight size={18} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                  </Button>
                  <Button
                    className="group bg-white/10 text-white border-none hover:bg-white/20 w-[140px] h-[48px] py-0 text-[15px] font-semibold rounded-full transition-all flex items-center justify-center gap-0 mt-3 sm:mt-0"
                  >
                    솔루션 문의
                    <ChevronRight size={18} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* 풋터 */}
        <footer className="bg-[#000000] py-16 px-6 border-t border-white/20 relative z-20">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0 font-pretendard">
            {/* 좌측: 로고 + 주소 */}
            <div className="flex flex-col items-start gap-8">
              <img
                src="/ktds_white.png"
                alt="kt ds"
                className="h-8 w-auto object-contain"
              />
              <p className="text-[14px] text-white/90 font-medium text-left">
                (06707) 서울 서초구 효령로 176, 02-523-7029
              </p>
            </div>

            {/* 우측: 메뉴 + 저작권 (이 부분도 좌측 정렬로 통일) */}
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-white/90 font-medium">
                <a href="#" className="hover:text-white transition-colors">사이트맵</a>
                <a href="#" className="hover:text-white transition-colors">공지사항</a>
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
              </div>
              <p className="text-[13px] text-white/30 font-medium text-left">
                © 2026 AI Biz Portal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] w-[48px] h-[48px] flex items-center justify-center bg-[#000000]/60 text-white hover:bg-[#000000]/80 rounded-full transition-all border border-white/20 backdrop-blur-sm shadow-xl"
            aria-label="맨 위로 가기"
          >
            <ArrowUp size={24} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
