import { MEETING_MINUTES_DETAIL } from './details/meeting-minutes';
import { AION_PUBLIC_DETAIL } from './details/aion-public';
import { AUTOBUILDER_DETAIL } from './details/autobuilder';
import { BEAST_GATEWAY_DETAIL } from './details/beast-gateway';
import { CLOUDWIZ_DETAIL } from './details/cloudwiz';
import { WORKS_AI_HANWHA_DETAIL } from './details/works-ai-hanwha';
import { AUDIT_AGENT_DETAIL } from './details/audit-agent';

export interface UseCaseItem {
    타이틀: string;
    산업군: string;
    태그: string;
    카테고리: string;
    이미지: string;
    설명: string;
    상세내용: any; // PDF 원문 전체 내용을 담은 객체
}

export const USE_CASES: UseCaseItem[] = [
    {
        타이틀: "AI 회의록",
        산업군: "서비스/기업",
        태그: "AI 회의록",
        카테고리: "내부 업무 처리 향상",
        이미지: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
        설명: "화자 분리 및 겹침 발화 처리로 회의록 작성 리드타임 85% 단축, 온프레미스 보안으로 기밀 정보 보호 강화.",
        상세내용: MEETING_MINUTES_DETAIL
    },
    {
        타이틀: "공공기관 데이터 분석 챗봇 서비스",
        산업군: "공공기관",
        태그: "AI:ON-U",
        카테고리: "데이터 분석",
        이미지: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        설명: "자연어 기반 데이터 분석 플랫폼으로 민원 처리 시간 80% 단축, 보고서 작성 시간을 3일에서 30분으로 혁신했습니다.",
        상세내용: AION_PUBLIC_DETAIL
    },
    {
        타이틀: "AutoBuilder",
        산업군: "통신/ICT",
        태그: "Codebox",
        카테고리: "내부 업무 처리 향상",
        이미지: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
        설명: "대규모 레거시 전환 공수 48% 절감, 전환율 100% 달성으로 Cloud 전환 경쟁력을 강화했습니다.",
        상세내용: AUTOBUILDER_DETAIL
    },
    {
        타이틀: "디지털 플랫폼 정부 파이프라인 구축",
        산업군: "공공/기업",
        태그: "Beast AI Gateway",
        카테고리: "강력한 보안",
        이미지: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
        설명: "전사 AI 사용 통합 관리 및 실시간 PII 필터링으로 AI 사용 비용 30~50% 절감, 보안 안정성 제로 리스크를 실현했습니다.",
        상세내용: BEAST_GATEWAY_DETAIL
    },
    {
        타이틀: "CloudWiz",
        산업군: "제조",
        태그: "Cloudwiz",
        카테고리: "리스크 관리 효율화",
        이미지: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
        설명: "멀티클라우드 비용 30% 절감, 운영 생산성 2배 향상으로 비용·보안·운영 자동화를 실현했습니다.",
        상세내용: CLOUDWIZ_DETAIL
    },
    {
        타이틀: "Works AI 테크로스 ERP",
        산업군: "기업",
        태그: "Works AI",
        카테고리: "내부 업무 처리 향상",
        이미지: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        설명: "사내 AI Agent Portal 구축으로 업무 처리 클릭 수 대폭 감소, CSAT 40% 향상 및 전사 업무 혁신을 실현했습니다.",
        상세내용: WORKS_AI_HANWHA_DETAIL
    },
    {
        타이틀: "국정감사 Agent",
        산업군: "공공",
        태그: "감사 대응 Agent",
        카테고리: "내부 업무 처리 향상",
        이미지: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
        설명: "답변서 생성 시간 80% 단축, 문서 탐색 시간 90% 단축으로 국정감사 대응의 속도·정확도·품질을 혁신했습니다.",
        상세내용: AUDIT_AGENT_DETAIL
    }
];



export const USE_CASE_CATEGORIES = ["전체", "데이터 분석", "보고 / 의사결정 향상", "리스크 관리 효율화", "강력한 보안", "내부 업무 처리 향상"];

export const USE_CASE_CATEGORY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
    "데이터 분석": { text: "text-emerald", bg: "bg-emerald/10", border: "border-emerald/20" },
    "보고 / 의사결정 향상": { text: "text-brand-secondary", bg: "bg-brand-primary/10", border: "border-brand-primary/20" },
    "리스크 관리 효율화": { text: "text-sky", bg: "bg-sky/10", border: "border-sky/20" },
    "강력한 보안": { text: "text-purple", bg: "bg-purple/10", border: "border-purple/20" },
    "내부 업무 처리 향상": { text: "text-brand-primary", bg: "bg-brand-primary/10", border: "border-brand-primary/20" }
};
