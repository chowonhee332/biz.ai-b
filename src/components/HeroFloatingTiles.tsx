import React from 'react';
import { motion } from 'framer-motion';
import { CornerRightUp, Grip, Box, Triangle, Sparkles } from 'lucide-react';

// SVG Noise Filter definition to overlap on tiles for texture
const NoiseFilter = () => (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.25] mix-blend-overlay">
        <filter id="noiseFilter">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                stitchTiles="stitch"
            />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
);

const EngravedIcon = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="text-black/80 flex items-center justify-center w-full h-full"
            style={{
                filter: 'drop-shadow(0px 1.5px 1px rgba(255, 255, 255, 0.15))',
            }}
        >
            {children}
        </div>
    );
};

export default function HeroFloatingTiles() {
    // 5개의 타일을 원형으로 배치하되, 첨부된 이미지와 일치하도록 위치와 각도를 조절합니다.
    const tiles = [
        {
            id: 1, // 10시 방향 (화살표 꺾인 아이콘)
            icon: <CornerRightUp size={56} strokeWidth={2} />,
            initialRotation: { rotateX: 25, rotateY: 15, rotateZ: -20 },
            yAnim: [-5, 5, -5],
            delay: 0,
            style: { top: '15%', left: '10%', zIndex: 10 },
        },
        {
            id: 2, // 2시 방향 (점 9개 아이콘)
            icon: <Grip size={56} strokeWidth={2} />,
            initialRotation: { rotateX: 30, rotateY: -15, rotateZ: 25 },
            yAnim: [5, -5, 5],
            delay: 0.5,
            style: { top: '0%', left: '55%', zIndex: 5 },
        },
        {
            id: 3, // 4시 방향 (물결 M 로고 모양 모방)
            icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22l5-5 5 5 10-10V2H12l-5 5-5-5z" /></svg>, // Placeholder for custom logo
            initialRotation: { rotateX: 10, rotateY: -35, rotateZ: 10 },
            yAnim: [-8, 8, -8],
            delay: 1,
            style: { top: '40%', left: '60%', zIndex: 20 },
        },
        {
            id: 4, // 6시 방향 (별표 들어간 원 로고)
            icon: <Sparkles size={56} strokeWidth={1.5} />,
            initialRotation: { rotateX: -20, rotateY: 10, rotateZ: -5 },
            yAnim: [8, -8, 8],
            delay: 1.5,
            style: { top: '65%', left: '40%', zIndex: 30 },
        },
        {
            id: 5, // 8시 방향 (육면체 큐브 아이콘)
            icon: <Box size={56} strokeWidth={2} />,
            initialRotation: { rotateX: -15, rotateY: 25, rotateZ: -15 },
            yAnim: [-6, 6, -6],
            delay: 2,
            style: { top: '55%', left: '15%', zIndex: 25 },
        },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center perspective-[1200px]">
            {tiles.map((tile) => (
                <motion.div
                    key={tile.id}
                    className="absolute w-36 h-36 md:w-44 md:h-44"
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                        rotateX: tile.initialRotation.rotateX,
                        rotateY: tile.initialRotation.rotateY,
                        rotateZ: tile.initialRotation.rotateZ,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: tile.yAnim,
                        rotateX: [tile.initialRotation.rotateX, tile.initialRotation.rotateX + 3, tile.initialRotation.rotateX],
                        rotateY: [tile.initialRotation.rotateY, tile.initialRotation.rotateY - 3, tile.initialRotation.rotateY],
                        rotateZ: [tile.initialRotation.rotateZ, tile.initialRotation.rotateZ + 2, tile.initialRotation.rotateZ],
                    }}
                    transition={{
                        opacity: { duration: 1.5, delay: tile.delay },
                        scale: { duration: 1.5, delay: tile.delay, type: 'spring', stiffness: 50 },
                        y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateX: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateZ: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                    }}
                    style={{ transformStyle: 'preserve-3d', ...tile.style }}
                >
                    {/* Detailed Tile Surface representing the 3D texture */}
                    {/* The gradient is very dark, almost black, with a subtle lighter edge at the top wrapper */}
                    <div className="relative w-full h-full rounded-[30px] md:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#010101] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_1px_0_2px_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(0,0,0,0.9)] flex items-center justify-center border-t border-white/5">

                        {/* The SVG Noise Texture for the granular material feel */}
                        <NoiseFilter />

                        {/* Engraved Icon Container */}
                        <div className="relative z-10 w-2/3 h-2/3 flex items-center justify-center">
                            <EngravedIcon>
                                {tile.icon}
                            </EngravedIcon>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
