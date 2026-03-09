export interface UseCaseItem {
    타이틀: string;
    산업군: string;
    태그: string;
    카테고리: string;
    이미지: string;
    날짜: string;
    설명: string;
}

export const USE_CASES: UseCaseItem[] = [
    {
        타이틀: "공공·기업용 AI Gateway 구축",
        산업군: "공공/기업",
        태그: "Beast AI Gateway",
        카테고리: "강력한 보안",
        이미지: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        날짜: "Feb 2026",
        설명: "전사 AI 활용을 단일 게이트웨이로 통합하고, AI 사용 비용 30~50% 절감 및 민감정보 유출 위험을 제로 수준으로 감소시켰습니다."
    },
    {
        타이틀: "국정감사 AI Agent 구축",
        산업군: "공공",
        태그: "감사 대응 Agent",
        카테고리: "내부 업무 처리 향상",
        이미지: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
        날짜: "Jan 2026",
        설명: "답변서 생성 시간 80% 단축, 문서 탐색 시간 90% 단축으로 국정감사 대응의 속도·정확도·품질을 혁신했습니다."
    },
    {
        타이틀: "공공기관 데이터 분석 챗봇 구축",
        산업군: "공공기관",
        태그: "AI:ON-U",
        카테고리: "데이터 분석",
        이미지: "https://images.unsplash.com/photo-1504868584819-f8e8b496d74b?auto=format&fit=crop&q=80&w=800",
        날짜: "Jan 2026",
        설명: "자연어 기반 데이터 분석 플랫폼으로 민원 처리 시간 80% 단축, 보고서 작성 시간을 3일에서 30분으로 혁신했습니다."
    },
    {
        타이틀: "AI 회의록 구축 사례",
        산업군: "기업",
        태그: "AI 회의록",
        카테고리: "내부 업무 처리 향상",
        이미지: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
        날짜: "Dec 2025",
        설명: "화자 분리와 겹침 발화 처리로 회의록 작성 시간 85% 단축, 온프레미스 보안으로 회의 생산성의 기준을 바꿨습니다."
    },
    {
        타이틀: "Works AI 도입 사례",
        산업군: "기업",
        태그: "Works AI",
        카테고리: "보고 / 의사결정 향상",
        이미지: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        날짜: "Nov 2025",
        설명: "사내 AI Agent Portal로 업무 처리 클릭 수 대폭 감소, CSAT 40% 향상, 전사 업무 혁신을 실현했습니다."
    },
    {
        타이틀: "Cloud TR 엔지니어링 솔루션 적용 사례",
        산업군: "통신·ICT",
        태그: "Codebox",
        카테고리: "데이터 분석",
        이미지: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        날짜: "Oct 2025",
        설명: "대규모 레거시 전환 공수 48% 절감, 전환율 100% 달성으로 Cloud 전환 경쟁력을 강화했습니다."
    },
    {
        타이틀: "CloudWiz 멀티클라우드 운영혁신 사례",
        산업군: "제조",
        태그: "Cloudwiz",
        카테고리: "리스크 관리 효율화",
        이미지: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        날짜: "Sep 2025",
        설명: "멀티클라우드 비용 30% 절감, 운영 생산성 2배 향상으로 비용·보안·운영 자동화를 실현했습니다."
    },
    {
        타이틀: "AI:ON-U 지능형 검색 챗봇 구축",
        산업군: "금융",
        태그: "AI:ON-U",
        카테고리: "데이터 분석",
        이미지: "https://images.unsplash.com/photo-1551288049-bbda38a10ad1?auto=format&fit=crop&q=80&w=800",
        날짜: "Aug 2025",
        설명: "상담 응답 시간 80% 단축, 리포트 리드타임 수일에서 30분으로 혁신한 금융 지능형 검색 플랫폼입니다."
    }
];

export const USE_CASE_CATEGORIES = ["전체", "데이터 분석", "보고 / 의사결정 향상", "리스크 관리 효율화", "강력한 보안", "내부 업무 처리 향상"];
