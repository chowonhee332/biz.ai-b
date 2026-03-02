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
            className="text-[#050505] flex items-center justify-center w-full h-full opacity-95"
            style={{
                filter: 'drop-shadow(1px 1.5px 1px rgba(255, 255, 255, 0.15))',
            }}
        >
            {children}
        </div>
    );
};

// Reusable 3D Tile Component providing true thickness
const Thick3DTile = ({ children, thickness = 24, ...props }: any) => {
    return (
        <motion.div {...props} style={{ transformStyle: 'preserve-3d', ...props.style }}>
            {/* Base/Bottom Shadow Layer */}
            <div
                className="absolute inset-0 rounded-[32px] md:rounded-[48px] bg-black shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                style={{ transform: `translateZ(-${thickness}px)`, filter: 'blur(8px)' }}
            />

            {/* Extrusion / Sides (Stacked layers) */}
            {Array.from({ length: thickness }).map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0 rounded-[32px] md:rounded-[48px] bg-[#181818]"
                    style={{ transform: `translateZ(-${i}px)` }}
                />
            ))}

            {/* Top Surface Layer */}
            <div
                className="absolute inset-0 rounded-[32px] md:rounded-[48px] overflow-hidden bg-gradient-to-br from-[#2f2f2f] via-[#111111] to-[#010101] flex items-center justify-center border-t border-white/10"
                style={{
                    transform: 'translateZ(0px)',
                    boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.1), inset 1px 0 2px rgba(255,255,255,0.1)'
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
            id: 1, // Arrow (Top Right)
            icon: <CornerRightUp size={72} strokeWidth={2.5} />,
            initialRotation: { rotateX: -25, rotateY: -35, rotateZ: 0 },
            yAnim: [-4, 4, -4],
            delay: 0,
            style: { top: '10%', left: '46%', zIndex: 10 },
            thickness: 24
        },
        {
            id: 2, // Grip (Right)
            icon: <Grip size={72} strokeWidth={2.5} />,
            initialRotation: { rotateX: 30, rotateY: -45, rotateZ: -10 },
            yAnim: [4, -4, 4],
            delay: 0.5,
            style: { top: '30%', left: '60%', zIndex: 20 },
            thickness: 24
        },
        {
            id: 3, // M (Bottom Right)
            icon: <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22l5-5 5 5 10-10V2H12l-5 5-5-5z" /></svg>,
            initialRotation: { rotateX: 40, rotateY: -20, rotateZ: 10 },
            yAnim: [-5, 5, -5],
            delay: 1,
            style: { top: '56%', left: '50%', zIndex: 30 },
            thickness: 24
        },
        {
            id: 4, // Sparkles (Bottom Left)
            icon: <Sparkles size={72} strokeWidth={2} />,
            initialRotation: { rotateX: 45, rotateY: 25, rotateZ: -15 },
            yAnim: [5, -5, 5],
            delay: 1.5,
            style: { top: '52%', left: '20%', zIndex: 40 },
            thickness: 24
        },
        {
            id: 5, // Box (Top Left)
            icon: <Box size={72} strokeWidth={2.5} />,
            initialRotation: { rotateX: -30, rotateY: 45, rotateZ: 25 },
            yAnim: [-6, 6, -6],
            delay: 2,
            style: { top: '22%', left: '16%', zIndex: 50 },
            thickness: 24
        },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[650px] mx-auto flex items-center justify-center perspective-[1200px]">
            {tiles.map((tile) => (
                <Thick3DTile
                    key={tile.id}
                    className="absolute w-44 h-44 md:w-56 md:h-56"
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
