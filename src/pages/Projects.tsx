import { useState } from "react";
import "./Projects.css";

interface ProjectHistory {
  version: string;
  title: string;
  items: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  period?: string;
  team?: string;
  role: string;
  techs: string[];
  features: string[];
  type: "web" | "desktop" | "tool";
  link?: string;
  // Detail page content
  detailDescription?: string;
  history?: ProjectHistory[];
  challenges?: string[];
}

const projects: Project[] = [
  {
    id: "design-system",
    title: "Design System",
    description:
      "Figma 토큰 연동부터 React 컴포넌트 라이브러리, Storybook 문서화, CI/CD 자동 배포까지 갖춘 모노레포 디자인 시스템",
    role: "설계 및 프론트엔드 개발 (1인)",
    techs: [
      "React",
      "TypeScript",
      "CSS Modules",
      "Storybook 10",
      "Vitest",
      "tsup",
      "Turborepo",
      "pnpm Workspaces",
      "Figma Tokens Studio",
      "GitHub Actions",
      "Changesets",
    ],
    features: [
      "Figma Tokens Studio(W3C DTCG) → CSS 변수 + TS 타입 자동 생성 파이프라인",
      "Primitive/Semantic 2계층 토큰 아키텍처 — Light/Dark 테마 자동 전환",
      "ThemeProvider + useTheme 훅 기반 React 네이티브 테마 제어",
      "10개 React 컴포넌트 — 컴포넌트당 구현, 스타일, 스토리, 테스트, 배럴 5파일 구조",
      "Storybook 10 인터랙티브 문서 + GitHub Actions CI/CD 자동 배포",
    ],
    type: "tool",
    link: "/federation-host/design-system-storybook",
    detailDescription:
      "디자인과 개발 사이의 간극을 해소하기 위해 설계한 모노레포 디자인 시스템입니다. Figma Tokens Studio에서 추출한 디자인 토큰을 Primitive/Semantic 2계층으로 구조화하고, CSS 커스텀 프로퍼티와 TypeScript 타입 상수로 자동 변환합니다. Semantic 토큰은 Light/Dark 테마에 따라 값이 달라지며, ThemeProvider와 useTheme 훅으로 React 컴포넌트에서 테마를 제어합니다. Changesets 버전 관리, npm 자동 퍼블리싱, Storybook GitHub Pages 배포까지 전체 릴리즈 파이프라인을 구축했습니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "모노레포 및 토큰 파이프라인 구축",
        items: [
          "pnpm Workspaces + Turborepo 기반 모노레포 구성",
          "Figma Tokens Studio JSON(W3C DTCG 포맷) 파싱 및 토큰 동기화 스크립트 구현",
          "토큰 컴파일러가 CSS 커스텀 프로퍼티, TypeScript 타입 상수, JSON 3개 아티팩트 동시 생성",
        ],
      },
      {
        version: "2차 업데이트",
        title: "컴포넌트 라이브러리 구현",
        items: [
          "Button, Input, Select, Dialog, Toast, Tabs 등 10개 컴포넌트 구현",
          "컴포넌트당 5파일 표준 구조 확립 및 Handlebars 기반 CLI 스캐폴딩 도구 제작",
          "CSS Modules + data-* attribute 패턴으로 variant/size 표현, 모든 스타일 값 토큰 참조",
          "tsup ESM/CJS 듀얼 빌드, Vitest + Testing Library 테스트 환경 구성",
        ],
      },
      {
        version: "3차 업데이트",
        title: "Storybook 문서화 및 CI/CD",
        items: [
          "Storybook 10 기반 인터랙티브 문서 구축 (CSF3 + autodocs Props 자동 문서화)",
          "GitHub Actions CI — lint, type-check, test, build 자동 실행",
          "Changesets 기반 npm 자동 퍼블리싱 및 Storybook GitHub Pages 자동 배포",
        ],
      },
      {
        version: "4차 업데이트",
        title: "시맨틱 토큰 + 다크 테마",
        items: [
          "Primitive/Semantic 2계층 토큰 아키텍처로 재설계 (74개 토큰)",
          "Light/Dark 테마 — [data-theme] CSS 변수 오버라이드 방식",
          "ThemeProvider + useTheme 훅 — React Context 기반 테마 제어",
          "10개 컴포넌트 전체 다크 모드 대응 및 시맨틱 토큰 마이그레이션",
        ],
      },
    ],
    challenges: [
      "Figma 토큰의 중첩 구조를 플랫한 CSS 변수로 변환 시 네이밍 충돌 — 재귀 flatten 함수로 kebab-case 변환 및 토큰 타입별 단위 자동 부여로 해결",
      "variant/size 조합의 스타일 분기 복잡도 — data-* attribute 패턴 도입으로 className 조합 로직 제거, CSS 셀렉터만으로 모든 변형 표현",
      "다크 모드에서 컴포넌트 가시성 문제 — surface/surface-muted 분리로 배경 대비 확보, on-primary/on-error 토큰으로 컬러 위 텍스트 가독성 보장",
    ],
  },
  {
    id: "advisor-assistant",
    title: "상담 어시스턴트",
    description:
      "상담사와 고객 간의 실시간 통화 데이터를 표시하고, KMS(지식관리시스템)에서 관련 정보를 검색하여 상담사에게 제공하는 웹 애플리케이션",
    period: "2025.09 - 현재",
    role: "프론트엔드 개발",
    techs: ["Vue 3", "TypeScript", "Element Plus", "Pinia", "Socket.io"],
    link: "/federation-host/assistant-demo",
    features: [
      "실시간 통화 데이터 표시",
      "KMS 연동 검색 기능",
      "상담 이력 조회",
      "실시간 상담 지원 정보 제공",
      "관리자 대시보드",
    ],
    type: "web",
    detailDescription:
      "상담사와 고객 간의 통화 내용을 실시간으로 표시하고, KMS(지식관리시스템)에서 관련 정보를 검색하여 상담사가 빠르게 고객 응대를 할 수 있도록 지원하는 웹 애플리케이션입니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "상담사 편의 기능 추가",
        items: [
          "공지사항 기능 추가",
          "메모 기능 추가",
          "할일 기능 추가",
          "북마크 기능 추가",
        ],
      },
      {
        version: "2차 업데이트",
        title: "AI 기능 연동",
        items: [
          "LLM을 통한 상담 요약 기능 추가",
          "LLM을 통한 할일 자동 생성 기능 추가",
        ],
      },
    ],
  },
  {
    id: "call-analytics",
    title: "콜 분석 대시보드",
    description:
      "상담 콜 데이터를 집계하여 유형, 키워드 등 다양한 카테고리별로 분석 결과를 시각화하는 대시보드",
    period: "2026.01 - 현재",
    role: "풀스택 개발",
    techs: [
      "Vue 3",
      "TypeScript",
      "Element Plus",
      "Pinia",
      "Highcharts",
      "NestJS",
      "Prisma",
      "PostgreSQL",
    ],
    features: [
      "콜 데이터 집계 및 통계",
      "유형/키워드별 카테고리 분석",
      "다양한 차트를 통한 데이터 시각화",
      "기간별 트렌드 분석",
    ],
    type: "web",
    detailDescription:
      "상담 어시스턴트에서 발생한 콜 데이터를 DB에서 집계하여, 유형, 키워드 등 다양한 카테고리를 적용한 분석 결과를 대시보드 형태로 제공하는 웹 애플리케이션입니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "사용자 편의성 개선",
        items: [
          "Grid Layout 적용으로 대시보드 위젯 자유 배치 가능",
          "사용자별 레이아웃 저장 기능 추가",
        ],
      },
    ],
  },
  {
    id: "mcp-ui-assistant",
    title: "MCP UI Assistant",
    description:
      "AI 어시스턴트가 실제 UI 디자인을 검색하고 와이어프레임 생성을 도와주는 MCP(Model Context Protocol) 서버",
    role: "백엔드 개발",
    techs: ["TypeScript", "Node.js", "MCP SDK"],
    features: [
      "UI 디자인 이미지 검색 (DuckDuckGo)",
      "스타일/키워드로 검색 결과 정제",
      "검색 결과 상세 정보 조회",
      "Google, Dribbble, Behance 검색 링크 제공",
    ],
    type: "tool",
    link: "https://github.com/bae-in-seop/mcp-ui-assistant",
    detailDescription:
      "Claude Code, Claude Desktop, Codex 등의 AI 어시스턴트에서 사용할 수 있는 MCP 서버입니다. DuckDuckGo 이미지 검색을 활용하여 API 키 없이 UI 디자인 레퍼런스를 검색하고, AI가 이를 참고하여 ASCII 와이어프레임을 생성할 수 있도록 도와줍니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "Claude Code 지원",
        items: [
          "Claude Code MCP 서버 연동",
          "DuckDuckGo 이미지 검색을 통한 UI 디자인 레퍼런스 검색 기능 구현",
          "검색 결과 정제 및 상세 정보 조회 기능 추가",
        ],
      },
      {
        version: "2차 업데이트",
        title: "Codex 지원 및 환경설정 커스터마이징",
        items: [
          "Codex MCP 서버 연동 추가",
          "setup.bat을 통한 사용자 니즈에 맞는 환경설정 커스터마이징 기능 추가",
        ],
      },
    ],
  },
  {
    id: "adot-meeting",
    title: "SK A.Biz 에이닷 회의록 시스템",
    description:
      "음성인식 솔루션과 AI 기술을 활용하여 사용자에게 회의록을 빠르게 작성해주는 웹 애플리케이션",
    period: "2024.08 - 현재",
    team: "Front 2명 / Back 3명",
    role: "프론트엔드 개발",
    techs: [
      "React",
      "JavaScript",
      "Styled-Components",
      "Material-UI",
      "Zustand",
      "Socket.io",
    ],
    features: [
      "실시간 음성인식 및 텍스트 변환",
      "AI 기반 회의 요약 기능",
      "회의록 편집 및 내보내기",
      "참석자 관리 및 공유 기능",
    ],
    type: "web",
    link: "https://skt.timblo.io",
    detailDescription:
      "음성인식 솔루션과 AI를 결합하여 사용자에게 회의록을 빠르게 작성해주는 서비스입니다. SK Telecom B2B 서비스로 도입되었으며, SK Hynix POC 진행 중입니다. B2C 서비스도 준비 중입니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "최소 기능 제공",
        items: [
          "홈, 컨텐츠 리스트, 휴지통 등 기본 기능 구현",
          "음성파일 업로드 → 음성인식 → AI 후처리 → 구간별 요약 데이터 제공",
        ],
      },
      {
        version: "2차 업데이트",
        title: "디자인 개편 및 성능 최적화",
        items: [
          "전체 디자인 교체",
          "BackOffice, 캘린더, 환경 설정 등 기능 추가",
          "Socket Message를 통해 음성인식 완료 시 자동 Refresh",
          "대용량 데이터 렌더링 최적화 - 1시간 이상 녹음 파일의 경우 렌더링 Element가 많아 페이지 멈춤 현상 발생 → 가상화 적용하여 성능 이슈 해결",
        ],
      },
      {
        version: "3차 업데이트",
        title: "녹음기 및 에디터 기능 추가",
        items: [
          "로그인 페이지 개선",
          "웹페이지에서 녹음 후 바로 음성인식 진행하는 녹음기 기능 추가",
          "알림 메시지, 북마크 등 페이지 추가",
          "가상화 처리된 Element에 편집 기능 추가",
          "음성 재생시간에 따른 음성 기록 Scroll 동기화 기능 추가",
          "Playtime State 무분별한 업데이트 이슈 → Interval 처리로 성능 이슈 해소",
          "대용량 음성 데이터에서 현재 재생시간에 맞는 데이터 찾기 → 알고리즘 변경으로 성능 이슈 해소",
        ],
      },
      {
        version: "4차 업데이트",
        title: "리팩토링 및 사용자 편의 기능",
        items: [
          "Atomic 패턴 기반 리팩토링 진행",
          "사용자 인터렉션 개선",
          "하이라이트, 재요약 및 기존 데이터 수정 기능 추가",
          "브라우저 강제종료, 업로드 중 오류 등 예외 발생 시 녹음파일 백업 기능 추가",
        ],
      },
    ],
    challenges: [
      "1시간 이상 녹음 파일 렌더링 시 페이지 멈춤 → 가상화(Virtualization) 적용으로 해결",
      "음성 재생 시간과 스크롤 동기화 시 State 업데이트 성능 이슈 → Interval 처리로 최적화",
      "대용량 데이터에서 현재 재생 위치 찾기 성능 저하 → 검색 알고리즘 개선",
    ],
  },
  {
    id: "baronote-pc",
    title: "바로노트 PC App",
    description:
      "실시간 음성인식, 파일 음성인식 등 음성인식 솔루션을 활용하여 사용자가 원하는 형태의 음성기록본을 제공하는 PC 애플리케이션",
    period: "2023.11 - 2024.03",
    team: "Front 1명 / Back 1명",
    role: "프론트엔드 개발, 로컬 DB 연동",
    techs: ["Electron", "React", "JavaScript", "Redux", "Express", "MongoDB"],
    features: [
      "실시간/파일 음성인식 지원",
      "리치 텍스트 에디터 기능",
      "다양한 형식으로 내보내기",
      "로컬 파일 관리",
    ],
    type: "desktop",
    link: "http://naver.me/FDngYwpN",
    detailDescription:
      "실시간 음성인식, 파일 음성인식 등 음성인식 솔루션을 활용하여 음성인식 텍스트를 실시간으로 편집하고 다운로드 받을 수 있는 PC 애플리케이션입니다. 국가기관 의회 및 사기업 등에서 라이센스를 구입하여 사용 중이며, 요구 기능을 지속 업데이트하고 있습니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "최소 기능 제공",
        items: ["컨텐츠 리스트, 휴지통 등 기본 기능 구현"],
      },
      {
        version: "2차 업데이트",
        title: "멀티 마이크 지원 및 성능 최적화",
        items: [
          "최근 생성된 컨텐츠, 음성 화자 지정 화면 추가",
          "10개의 마이크 동시 사용 시 Streaming 렌더링 성능 이슈 발생 → Stack 처리 방식으로 변경하여 완료된 텍스트만 출력되도록 최적화",
          "대용량 데이터 렌더링 최적화 - 가상화 적용하여 성능 이슈 해결",
        ],
      },
      {
        version: "3차 업데이트",
        title: "환경설정 및 라이센스 시스템",
        items: [
          "시스템 부팅 시 HDD 초기화 이슈 대응 - 사용자 지정 경로에서 프로그램 실행 가능하도록 상대경로 지원",
          "무분별한 사용 방지를 위한 라이센스 시스템 구축 - PC 정보 + 암호화 알고리즘 적용하여 인증된 사용자만 사용 가능",
        ],
      },
    ],
    challenges: [
      "10개 마이크 동시 사용 시 Streaming 렌더링 성능 저하 → Stack 처리 방식으로 전환하여 해결",
      "대용량 음성인식 데이터 렌더링 성능 이슈 → 가상화(Virtualization) 적용으로 해결",
      "시스템 부팅 시 HDD 초기화로 인한 경로 문제 → 상대경로 지원으로 해결",
    ],
  },
  {
    id: "baronote-web",
    title: "바로노트 Web",
    description:
      "웹에서 실시간 음성인식 서비스 및 회의록 작성 등의 기능을 제공하며 컨텐츠를 공유할 수 있는 플랫폼 서비스",
    period: "2023.01 - 2023.06",
    team: "Front 2명 / Back 1명",
    role: "프론트엔드 개발, BFF 서버 개발",
    techs: [
      "React",
      "JavaScript",
      "SCSS",
      "Redux",
      "Styled-Components",
      "Express",
      "gRPC",
    ],
    features: [
      "실시간 녹음 및 음성인식",
      "파일 기반 음성인식",
      "컨텐츠 공유 플랫폼",
      "BFF 서버 구축 (Express + gRPC 클라이언트)",
    ],
    type: "web",
    detailDescription:
      "웹에서 실시간 음성인식 서비스 및 회의록 작성 등의 기능을 제공하며 컨텐츠를 공유할 수 있는 플랫폼 서비스입니다. MSA(Microservices Architecture) 기반 환경에서 개발했습니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "핵심 기능 구현",
        items: [
          "음성인식 솔루션을 연계하여 실시간 녹음 기능 제공",
          "파일 음성인식 기능 구현",
        ],
      },
      {
        version: "2차 업데이트",
        title: "공통 컴포넌트 및 성능 최적화",
        items: [
          "공통 컴포넌트 NPM 패키지로 퍼블리싱",
          "사용자 편의를 위한 페이지 추가",
          "대용량 데이터 렌더링 최적화 - 가상화 적용",
          "IntersectionObserver API를 활용한 스크롤링 성능 최적화 및 사용자 경험 향상",
        ],
      },
      {
        version: "3차 업데이트",
        title: "BFF 서버 구축",
        items: [
          "Express 기반 BFF(Backend For Frontend) 서버 구현",
          "gRPC 클라이언트 구현 - 백엔드 마이크로서비스와 통신",
        ],
      },
    ],
    challenges: [
      "대용량 데이터 렌더링 성능 이슈 → 가상화 + IntersectionObserver API 적용으로 해결",
      "MSA 환경에서 소규모 팀의 관리 포인트 증가 문제 인식 → 팀 규모에 따른 아키텍처 선택의 중요성 학습",
    ],
  },
  {
    id: "flow-builder",
    title: "Flow Builder",
    description:
      "시나리오 기반의 워크플로우를 시각적으로 설계하고 관리할 수 있는 플로우 빌더 웹 애플리케이션",
    role: "프론트엔드 개발",
    techs: ["React", "React Flow", "Ant Design", "Zustand", "React-Query"],
    features: [
      "드래그 앤 드롭 플로우 디자인",
      "시나리오 및 워크플로우 관리",
      "에이전트 노드 설정",
      "실시간 플로우 미리보기",
    ],
    type: "web",
    link: "/federation-host/flow-builder",
    detailDescription:
      "React Flow 라이브러리를 활용한 비주얼 워크플로우 빌더입니다. 드래그 앤 드롭으로 복잡한 시나리오를 시각적으로 설계할 수 있습니다.",
  },
  {
    id: "i18n-manager",
    title: "다국어 번역 관리 시스템",
    description:
      "사용자가 입력한 단어를 여러 국가의 언어로 자동 번역하여 결과를 DB에 저장하고 JSON 형식으로 내보낼 수 있는 관리 도구",
    role: "풀스택 개발",
    techs: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "자동 번역 API 연동",
      "번역 키 관리",
      "JSON/Excel 내보내기",
      "번역 히스토리 관리",
    ],
    type: "tool",
    detailDescription:
      "다국어 지원이 필요한 프로젝트를 위한 번역 관리 도구입니다. 번역 API와 연동하여 자동 번역을 지원하며, JSON/Excel 형식으로 내보내기가 가능합니다.",
  },
];

const typeLabels: Record<Project["type"], string> = {
  web: "Web Application",
  desktop: "Desktop Application",
  tool: "Development Tool",
};

const typeIcons: Record<Project["type"], React.ReactNode> = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  desktop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const handleLinkClick = () => {
    if (project.link?.startsWith("http")) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    } else if (project.link) {
      window.location.href = project.link;
    }
  };

  return (
    <div className="project-detail">
      <button type="button" className="project-detail__back" onClick={onBack}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        목록으로
      </button>

      <header className="project-detail__header">
        <span className={`project-type type-${project.type}`}>
          {typeIcons[project.type]}
          {typeLabels[project.type]}
        </span>
        <h1 className="project-detail__title">{project.title}</h1>
        <p className="project-detail__description">
          {project.detailDescription || project.description}
        </p>

        <div className="project-detail__meta">
          {project.period && (
            <div className="meta-item">
              <span className="meta-label">기간</span>
              <span className="meta-value">{project.period}</span>
            </div>
          )}
          {project.team && (
            <div className="meta-item">
              <span className="meta-label">팀 구성</span>
              <span className="meta-value">{project.team}</span>
            </div>
          )}
          <div className="meta-item">
            <span className="meta-label">담당</span>
            <span className="meta-value">{project.role}</span>
          </div>
        </div>

        {project.link && (
          <button
            type="button"
            className="project-detail__link"
            onClick={handleLinkClick}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            서비스 바로가기
          </button>
        )}
      </header>

      <section className="project-detail__section">
        <h2>기술 스택</h2>
        <div className="project-detail__techs">
          {project.techs.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="project-detail__section">
        <h2>주요 기능</h2>
        <ul className="project-detail__features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      {project.history && project.history.length > 0 && (
        <section className="project-detail__section">
          <h2>프로젝트 히스토리</h2>
          <div className="project-detail__history">
            {project.history.map((h, index) => (
              <div key={index} className="history-item">
                <div className="history-item__header">
                  <span className="history-item__version">{h.version}</span>
                  <span className="history-item__title">{h.title}</span>
                </div>
                <ul className="history-item__list">
                  {h.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <section className="project-detail__section">
          <h2>기술적 도전 및 해결</h2>
          <ul className="project-detail__challenges">
            {project.challenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div className="projects-page">
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-header">
              <span className={`project-type type-${project.type}`}>
                {typeIcons[project.type]}
                {typeLabels[project.type]}
              </span>
            </div>

            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>

            <div className="project-role">
              <span className="role-label">담당</span>
              <span className="role-value">{project.role}</span>
            </div>

            <div className="project-techs">
              {project.techs.slice(0, 4).map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
              {project.techs.length > 4 && (
                <span className="tech-tag tech-tag--more">
                  +{project.techs.length - 4}
                </span>
              )}
            </div>

            <ul className="project-features">
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
              {project.features.length > 3 && (
                <li className="feature-more">
                  외 {project.features.length - 3}개
                </li>
              )}
            </ul>

            <button
              type="button"
              className="project-link-btn"
              onClick={() => setSelectedProject(project)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              자세히 보기
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
