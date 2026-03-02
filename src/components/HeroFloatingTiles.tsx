import React from 'react';
import { motion } from 'framer-motion';
import { CornerRightUp, Grip, Box, Triangle, Sparkles } from 'lucide-react';

// SVG Noise Filter definition to overlap on tiles for texture
const NoiseFilter = () => (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15] mix-blend-overlay">
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
            className="text-black/90 p-1"
            style={{
                filter: 'drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.15))',
            }}
        >
            {children}
        </div>
    );
};

export default function HeroFloatingTiles() {
    const tiles = [
        {
            id: 1,
            icon: <CornerRightUp size={48} strokeWidth={2.5} />,
            initialRotation: { rotateX: 15, rotateY: 15, rotateZ: -10 },
            yAnim: [-10, 15, -10],
            delay: 0,
            position: 'top-0 left-0', // Top left
        },
        {
            id: 2,
            icon: <Grip size={48} strokeWidth={2.5} />,
            initialRotation: { rotateX: -10, rotateY: 20, rotateZ: 10 },
            yAnim: [10, -15, 10],
            delay: 0.5,
            position: 'top-[10%] right-0', // Top right
        },
        {
            id: 3,
            icon: <Box size={48} strokeWidth={2.5} />,
            initialRotation: { rotateX: 20, rotateY: -15, rotateZ: -15 },
            yAnim: [-15, 10, -15],
            delay: 1,
            position: 'bottom-[20%] left-[5%]', // Bottom left
        },
        {
            id: 4,
            icon: <Triangle size={48} strokeWidth={2.5} />,
            initialRotation: { rotateX: -20, rotateY: -20, rotateZ: 15 },
            yAnim: [15, -10, 15],
            delay: 1.5,
            position: 'bottom-[15%] right-[5%]', // Bottom right
        },
        {
            id: 5,
            icon: <Sparkles size={48} strokeWidth={2.5} />,
            initialRotation: { rotateX: 10, rotateY: 10, rotateZ: 0 },
            yAnim: [-5, 20, -5],
            delay: 2,
            position: 'bottom-[-10%] left-1/2 -translate-x-1/2', // Bottom middle
        },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
            {tiles.map((tile) => (
                <motion.div
                    key={tile.id}
                    className={`absolute w-32 h-32 md:w-40 md:h-40 ${tile.position}`}
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
                        rotateX: [tile.initialRotation.rotateX, tile.initialRotation.rotateX + 5, tile.initialRotation.rotateX],
                        rotateY: [tile.initialRotation.rotateY, tile.initialRotation.rotateY - 5, tile.initialRotation.rotateY],
                    }}
                    transition={{
                        opacity: { duration: 1, delay: tile.delay },
                        scale: { duration: 1, delay: tile.delay, type: 'spring' },
                        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                        rotateY: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
                    }}
                    style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                >
                    {/* Detailed Tile Surface representing the 3D texture */}
                    <div className="relative w-full h-full rounded-[28px] md:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#050505] border border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),0_20px_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
                        {/* Inner glow for the top edge highlight */}
                        <div className="absolute inset-0 rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-white/10 to-transparent opacity-50 block" />

                        {/* The SVG Noise Texture */}
                        <NoiseFilter />

                        {/* Engraved Icon Container */}
                        <div className="relative z-10 drop-shadow-2xl scale-[1.2]">
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
