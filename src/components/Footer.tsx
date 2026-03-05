import { useState, useEffect } from 'react';

// 모든 페이지에서 공통으로 사용하는 푸터 컴포넌트
export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 py-10 px-6 md:px-10 relative">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* 좌측: 로고 + 주소 */}
        <div className="flex flex-col gap-3">
          <span className="text-[22px] font-black text-white tracking-tight">kt ds</span>
          <p className="text-white/40 text-[13px] font-medium">
            (06707) 서울 서초구 효령로 176, 02-523-7029
          </p>
        </div>

        {/* 우측: 링크 + 카피라이트 */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-6 text-white/50 text-[13px] font-medium">
            <a href="#" className="hover:text-white transition-colors">사이트맵</a>
            <a href="#" className="hover:text-white transition-colors">공지사항</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
          <p className="text-white/30 text-[12px]">© 2026 AI Biz Portal. All rights reserved.</p>
        </div>
      </div>

      {/* 상단으로 스크롤 버튼 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 cursor-pointer z-50"
          aria-label="맨 위로"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </footer>
  );
}
