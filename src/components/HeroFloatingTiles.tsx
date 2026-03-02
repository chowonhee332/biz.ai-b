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

// Reusable 3D Tile Component providing true thickness
const Thick3DTile = ({ children, thickness = 15, ...props }: any) => {
    // We create multiple layers stacked on the Z-axis to simulate physical depth.
    // The top layer gets the main gradient and content, the bottom layer provides shadow,
    // and the middle ones act as the "sides".
    return (
        <motion.div {...props} style={{ transformStyle: 'preserve-3d', ...props.style }}>
            {/* Base/Bottom Shadow Layer */}
            <div
                className="absolute inset-0 rounded-[30px] md:rounded-[40px] bg-black shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                style={{ transform: `translateZ(-${thickness}px)`, filter: 'blur(4px)' }}
            />

            {/* Extrusion / Sides (Stacked layers) */}
            {Array.from({ length: thickness }).map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0 rounded-[30px] md:rounded-[40px] bg-[#111] border border-white/5"
                    style={{ transform: `translateZ(-${i}px)` }}
                />
            ))}

            {/* Top Surface Layer */}
            <div
                className="absolute inset-0 rounded-[30px] md:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#010101] flex items-center justify-center border-t border-white/10"
                style={{
                    transform: 'translateZ(0px)',
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 1px 0 2px rgba(255,255,255,0.1)'
                }}
            >
                <NoiseFilter />
                <div className="relative z-10 w-2/3 h-2/3 flex items-center justify-center">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default function HeroFloatingTiles() {
    // 5개의 타일을 원형으로 배치하되, 첨부된 이미지와 일치하도록 위치, 가파른 각도 조절
    const tiles = [
        {
            id: 1, // 10시 방향 (화살표 꺾인 아이콘)
            icon: <CornerRightUp size={64} strokeWidth={2} />,
            initialRotation: { rotateX: 45, rotateY: 15, rotateZ: -25 },
            yAnim: [-8, 8, -8],
            delay: 0,
            style: { top: '8%', left: '8%', zIndex: 10 },
            thickness: 18
        },
        {
            id: 2, // 2시 방향 (점 9개 아이콘)
            icon: <Grip size={64} strokeWidth={2} />,
            initialRotation: { rotateX: 40, rotateY: -20, rotateZ: 30 },
            yAnim: [8, -8, 8],
            delay: 0.5,
            style: { top: '-5%', left: '55%', zIndex: 5 },
            thickness: 16
        },
        {
            id: 3, // 4시 방향 (물결 M 로고 모양 모방)
            icon: <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22l5-5 5 5 10-10V2H12l-5 5-5-5z" /></svg>,
            initialRotation: { rotateX: 20, rotateY: -45, rotateZ: 15 },
            yAnim: [-10, 10, -10],
            delay: 1,
            style: { top: '35%', left: '68%', zIndex: 20 },
            thickness: 20
        },
        {
            id: 4, // 6시 방향 (별표 들어간 원 로고)
            icon: <Sparkles size={64} strokeWidth={1.5} />,
            initialRotation: { rotateX: -30, rotateY: 15, rotateZ: -10 },
            yAnim: [10, -10, 10],
            delay: 1.5,
            style: { top: '65%', left: '45%', zIndex: 30 },
            thickness: 22
        },
        {
            id: 5, // 8시 방향 (육면체 큐브 아이콘)
            icon: <Box size={64} strokeWidth={2} />,
            initialRotation: { rotateX: -25, rotateY: 35, rotateZ: -20 },
            yAnim: [-9, 9, -9],
            delay: 2,
            style: { top: '55%', left: '10%', zIndex: 25 },
            thickness: 20
        },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center perspective-[1200px]">
            {tiles.map((tile) => (
                <Thick3DTile
                    key={tile.id}
                    className="absolute w-40 h-40 md:w-48 md:h-48"
                    thickness={tile.thickness}
                    style={tile.style}
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                        rotateX: tile.initialRotation.rotateX,
                        rotateY: tile.initialRotation.rotateY,
                        rotateZ: tile.initialRotation.rotateZ,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: tile.yAnim,
                        rotateX: [tile.initialRotation.rotateX, tile.initialRotation.rotateX + 4, tile.initialRotation.rotateX],
                        rotateY: [tile.initialRotation.rotateY, tile.initialRotation.rotateY - 4, tile.initialRotation.rotateY],
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
                >
                    <EngravedIcon>
                        {tile.icon}
                    </EngravedIcon>
                </Thick3DTile>
            ))}
        </div>
    );
}
