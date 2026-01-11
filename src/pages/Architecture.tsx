import "./Architecture.css";

export default function Architecture() {
  return (
    <div className="architecture-page">
      {/* Header */}
      <section className="arch-hero">
        <div className="arch-hero-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Module Federation
        </div>
        <h1 className="arch-hero-title">Site Architecture</h1>
        <p className="arch-hero-desc">
          이 포트폴리오 사이트는 <strong>Module Federation</strong>을 활용한 마이크로 프론트엔드
          아키텍처로 구성되어 있습니다. 각 프로젝트는 독립적인 애플리케이션으로 개발되어 런타임에
          동적으로 통합됩니다.
        </p>
      </section>

      {/* Diagram */}
      <section className="arch-diagram-section">
        <h2 className="arch-section-title">System Overview</h2>
        <div className="architecture-diagram">
          {/* Host App */}
          <div className="arch-host">
            <div className="arch-box host-box">
              <div className="arch-box-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                Host App
              </div>
              <div className="arch-box-content">
                <span className="arch-tech">Vite + React 19</span>
                <span className="arch-tech">Zustand</span>
              </div>
              <div className="arch-box-features">
                <span>레이아웃 & 라우팅</span>
                <span>테마 시스템</span>
                <span>탭 관리</span>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="arch-connections">
            <div className="arch-line" />
            <div className="arch-line" />
            <span className="arch-label">Runtime Import</span>
          </div>

          {/* Remote Apps by Framework */}
          <div className="arch-remotes">
            <div className="arch-box remote-box framework-box">
              <div className="arch-box-header remote react">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="2.5" />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    transform="rotate(60 12 12)"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="10"
                    ry="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    transform="rotate(120 12 12)"
                  />
                </svg>
                React Apps
              </div>
              <div className="arch-app-list">
                <span className="arch-app-item">Playground</span>
                <span className="arch-app-item">Flow Builder</span>
                <span className="arch-app-item more">+ more</span>
              </div>
              <span className="arch-framework-badge react">React 19</span>
            </div>

            <div className="arch-box remote-box framework-box">
              <div className="arch-box-header remote vue">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 3h3.5L12 15l6.5-12H22L12 21 2 3zm5 0h4l3 5.5L17 3h4l-9 16L3 3z" />
                </svg>
                Vue Apps
              </div>
              <div className="arch-app-list">
                <span className="arch-app-item">Playground</span>
                <span className="arch-app-item more">+ more</span>
              </div>
              <span className="arch-framework-badge vue">Vue 3</span>
            </div>
          </div>

          <p className="arch-note">
            다양한 프레임워크로 개발된 앱들이 하나의 Host에서 통합되어 동작합니다.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="arch-benefits-section">
        <h2 className="arch-section-title">Why Module Federation?</h2>
        <div className="architecture-benefits">
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div className="benefit-text">
              <strong>독립적 배포</strong>
              <span>각 앱을 개별적으로 배포 가능</span>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
              </svg>
            </div>
            <div className="benefit-text">
              <strong>기술 스택 자유</strong>
              <span>React, Vue 등 다양한 프레임워크 혼용</span>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="benefit-text">
              <strong>런타임 통합</strong>
              <span>빌드 없이 실시간 모듈 로딩</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="arch-stack-section">
        <h2 className="arch-section-title">Tech Stack</h2>
        <div className="arch-stack-grid">
          <div className="arch-stack-card">
            <h3>Host App</h3>
            <ul>
              <li>
                <strong>Vite 7</strong> - 빌드 도구
              </li>
              <li>
                <strong>React 19</strong> - UI 프레임워크
              </li>
              <li>
                <strong>TypeScript</strong> - 타입 시스템
              </li>
              <li>
                <strong>Zustand</strong> - 상태 관리
              </li>
              <li>
                <strong>@module-federation/vite</strong> - 모듈 페더레이션
              </li>
            </ul>
          </div>
          <div className="arch-stack-card">
            <h3>Remote Apps</h3>
            <ul>
              <li>
                <strong>React 19</strong> - Playground, Flow Builder
              </li>
              <li>
                <strong>Vue 3</strong> - Playground, Dashboard (예정)
              </li>
              <li>
                <strong>독립 배포</strong> - GitHub Pages / Vercel
              </li>
              <li>
                <strong>공유 의존성</strong> - React, Zustand 싱글톤
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
