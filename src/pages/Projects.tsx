import "./Projects.css";

interface Project {
  id: string;
  title: string;
  description: string;
  period?: string;
  role: string;
  techs: string[];
  features: string[];
  type: "web" | "desktop" | "tool";
}

const projects: Project[] = [
  {
    id: "adot-meeting",
    title: "SK A.Biz 에이닷 회의록 시스템",
    description:
      "음성인식 솔루션과 AI 기술을 활용하여 사용자에게 회의록을 빠르게 작성해주는 웹 애플리케이션",
    role: "프론트엔드 개발",
    techs: ["React", "TypeScript", "Styled-Components", "React-Query"],
    features: [
      "실시간 음성인식 및 텍스트 변환",
      "AI 기반 회의 요약 기능",
      "회의록 편집 및 내보내기",
      "참석자 관리 및 공유 기능",
    ],
    type: "web",
  },
  {
    id: "baronote-pc",
    title: "바로노트 PC App",
    description:
      "실시간 음성인식, 파일 음성인식 등 음성인식 솔루션을 활용하여 사용자가 원하는 형태의 음성기록본을 제공하는 PC 애플리케이션",
    role: "프론트엔드 개발",
    techs: ["Electron", "React", "TypeScript", "Zustand"],
    features: [
      "실시간/파일 음성인식 지원",
      "리치 텍스트 에디터 기능",
      "다양한 형식으로 내보내기",
      "로컬 파일 관리",
    ],
    type: "desktop",
  },
  {
    id: "baronote-web",
    title: "바로노트 Web",
    description:
      "음성인식 솔루션을 활용하여 사용자에게 회의록을 빠르게 작성해주는 웹 애플리케이션",
    role: "프론트엔드 개발",
    techs: ["React", "TypeScript", "TailwindCSS", "React-Query"],
    features: [
      "웹 기반 음성인식",
      "클라우드 저장 및 동기화",
      "협업 기능",
      "반응형 디자인",
    ],
    type: "web",
  },
  {
    id: "storybook",
    title: "Storybook 컴포넌트 라이브러리",
    description:
      "재사용 가능한 UI 컴포넌트들을 체계적으로 관리하고 테스트하기 위한 React 기반의 Storybook",
    role: "프론트엔드 개발 / 설계",
    techs: ["React", "Storybook", "TypeScript", "Styled-Components"],
    features: [
      "컴포넌트 문서화",
      "인터랙티브 테스트 환경",
      "디자인 시스템 구축",
      "접근성 테스트",
    ],
    type: "tool",
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

export default function Projects() {
  return (
    <div className="projects-page">
      <section className="projects-intro">
        <p>
          <span className="intro-highlight">팀벨</span>에서 진행한 주요
          프로젝트들입니다. 음성인식 AI 솔루션을 활용한 다양한 애플리케이션
          개발에 참여했으며, 사용자 경험을 최우선으로 고려한 인터페이스를
          구현했습니다.
        </p>
      </section>

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
              {project.techs.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>

            <ul className="project-features">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
