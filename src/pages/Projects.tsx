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
      "Docker",
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
          "음성파일 업로드 → 음성인식 → AI ChatGPT 후처리 → 구간별 요약 데이터 제공",
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
    role: "프론트엔드 개발",
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
    role: "프론트엔드 개발",
    techs: [
      "React",
      "JavaScript",
      "SCSS",
      "Redux",
      "Styled-Components",
      "gRPC",
      "Express",
      "MongoDB",
      "MySQL",
    ],
    features: [
      "실시간 녹음 및 음성인식",
      "파일 기반 음성인식",
      "컨텐츠 공유 플랫폼",
      "MSA 아키텍처 기반 서비스",
    ],
    type: "web",
    detailDescription:
      "웹에서 실시간 음성인식 서비스 및 회의록 작성 등의 기능을 제공하며 컨텐츠를 공유할 수 있는 플랫폼 서비스입니다. MSA(Microservices Architecture) 기반으로 구성되어 확장성과 유지 보수성을 고려한 설계를 적용했습니다.",
    history: [
      {
        version: "1차 업데이트",
        title: "핵심 기능 구현",
        items: ["음성인식 솔루션을 연계하여 실시간 녹음 기능 제공", "파일 음성인식 기능 구현"],
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
    features: ["자동 번역 API 연동", "번역 키 관리", "JSON/Excel 내보내기", "번역 히스토리 관리"],
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

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const handleLinkClick = () => {
    if (project.link) {
      if (project.link.startsWith("http")) {
        window.open(project.link, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = project.link;
      }
    }
  };

  return (
    <div className="project-detail">
      <button type="button" className="project-detail__back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <button type="button" className="project-detail__link" onClick={handleLinkClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
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
                <span className="tech-tag tech-tag--more">+{project.techs.length - 4}</span>
              )}
            </div>

            <ul className="project-features">
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
              {project.features.length > 3 && (
                <li className="feature-more">외 {project.features.length - 3}개</li>
              )}
            </ul>

            <button
              type="button"
              className="project-link-btn"
              onClick={() => setSelectedProject(project)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
