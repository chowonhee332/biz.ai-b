import React from 'react';
import { motion } from 'framer-motion';

// SVG Noise Filter definition to overlap on tiles for texture
const NoiseFilter = () => (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.45] mix-blend-overlay">
        <filter id="noiseFilter">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
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
            className="text-[#030406] flex items-center justify-center w-full h-full opacity-90 drop-shadow-lg"
            style={{
                filter: 'drop-shadow(0px 1.5px 1.5px rgba(160, 190, 255, 0.25))',
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
                className="absolute inset-0 rounded-[36px] md:rounded-[52px] bg-[#020304] shadow-[0_45px_100px_rgba(0,0,0,1)]"
                style={{ transform: `translateZ(-${thickness}px)`, filter: 'blur(8px)' }}
            />

            {/* Extrusion / Sides (Stacked layers) */}
            {Array.from({ length: thickness }).map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0 rounded-[36px] md:rounded-[52px] bg-[#090b0e]"
                    style={{
                        transform: `translateZ(-${i}px)`,
                        // Add slight side lighting based on depth to simulate edge highlight
                        boxShadow: i === 0 ? 'none' : 'inset 1px 1.5px 1px rgba(180,200,255,0.03)'
                    }}
                />
            ))}

            {/* Top Surface Layer */}
            <div
                className="absolute inset-0 rounded-[36px] md:rounded-[52px] overflow-hidden bg-gradient-to-br from-[#2a374b] via-[#0f141a] to-[#040608] flex items-center justify-center border-t border-l border-white/20"
                style={{
                    transform: 'translateZ(0px)',
                    boxShadow: 'inset 0 4px 12px rgba(255,255,255,0.1), inset 1.5px 0 4px rgba(255,255,255,0.1)'
                }}
            >
                <NoiseFilter />
                <div className="relative z-10 w-[60%] h-[60%] flex items-center justify-center">
                    <EngravedIcon>
                        {children}
                    </EngravedIcon>
                </div>
            </div>
        </motion.div>
    );
};

export default function HeroFloatingTiles() {
    // 첨부된 이미지를 극도로 정밀하게 분석하여 위치(top, left), 오버랩 순서(zIndex), 
    // 그리고 측면 두께가 보여지는 방향(rotateX, rotateY, rotateZ) 및 최신 아이콘을 적용했습니다.
    const tiles = [
        {
            id: 1, // Top Right (Framer) -> Left & Bottom thickness -> rotateX > 0, rotateY > 0
            icon: <svg width="90" height="90" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8l-8-8z" /></svg>,
            initialRotation: { rotateX: 25, rotateY: 20, rotateZ: 5 },
            yAnim: [-4, 4, -4],
            delay: 0,
            style: { top: '5%', left: '42%', zIndex: 10 },
            thickness: 26
        },
        {
            id: 2, // Right (Shield) -> Left & Top thickness -> rotateX < 0, rotateY > 0
            icon: <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
            initialRotation: { rotateX: -20, rotateY: 25, rotateZ: -15 },
            yAnim: [4, -4, 4],
            delay: 0.5,
            style: { top: '35%', left: '58%', zIndex: 40 },
            thickness: 24
        },
        {
            id: 3, // Bottom (Check) -> Left & Top thickness -> rotateX < 0, rotateY > 0
            icon: <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            initialRotation: { rotateX: -35, rotateY: 15, rotateZ: -25 },
            yAnim: [-5, 5, -5],
            delay: 1,
            style: { top: '65%', left: '38%', zIndex: 20 },
            thickness: 26
        },
        {
            id: 4, // Bottom Left (Grip) -> Right & Top thickness -> rotateX < 0, rotateY < 0
            icon: <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="5" r="2.5" /><circle cx="12" cy="5" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="5" cy="12" r="2.5" /><circle cx="12" cy="12" r="2.5" /><circle cx="19" cy="12" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="12" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /></svg>,
            initialRotation: { rotateX: -25, rotateY: -35, rotateZ: 30 },
            yAnim: [5, -5, 5],
            delay: 1.5,
            style: { top: '50%', left: '8%', zIndex: 30 },
            thickness: 24
        },
        {
            id: 5, // Top Left (Dollar) -> Right & Bottom thickness -> rotateX > 0, rotateY < 0
            icon: <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
            initialRotation: { rotateX: 25, rotateY: -20, rotateZ: 15 },
            yAnim: [-6, 6, -6],
            delay: 2,
            style: { top: '22%', left: '10%', zIndex: 50 },
            thickness: 24
        },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[650px] mx-auto flex items-center justify-center perspective-[1400px]">
            {tiles.map((tile) => (
                <Thick3DTile
                    key={tile.id}
                    className="absolute w-48 h-48 md:w-[260px] md:h-[260px]"
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
                    {tile.icon}
                </Thick3DTile>
            ))}
        </div>
    );
}
