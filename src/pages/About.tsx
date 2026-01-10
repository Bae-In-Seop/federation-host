import "./About.css";
import profileImage from "../assets/images/증명사진.png";

const experiences = [
  {
    company: "(주)팀벨",
    period: "2020.03 - 현재",
    role: "AI솔루션사업부 / 선임연구원",
    tasks: [
      "React, Vue 프레임워크를 활용한 개발",
      "재사용성 및 유지보수를 고려한 컴포넌트 개발",
      "Electron을 활용한 PC Application 개발",
    ],
  },
  {
    company: "(주)모비젠",
    period: "2013.01 - 2014.12",
    role: "개발1팀 / 연구원",
    tasks: ["C#을 활용한 개발", "빅데이터 솔루션 개발"],
  },
];

const skills = {
  Frontend: [
    "ReactJS",
    "VueJS",
    "TypeScript",
    "Styled-Components",
    "TailwindCSS",
    "Zustand",
    "React-Query",
    "Material-UI",
    "Shadcn-UI",
    "Element-Plus",
  ],
  Backend: ["NodeJS", "Express"],
  DevOps: ["Docker", "MongoDB", "Git"],
  Collaboration: ["Figma", "Docker Desktop", "Notion"],
};

const certificates = [
  { name: "정보처리기사", date: "2024.07" },
  { name: "사무자동화산업기사", date: "2013.11" },
];

const education = {
  school: "인하공업전문대학",
  major: "컴퓨터시스템과",
  period: "2008.03 - 2013.02",
};

const contact = {
  email: "bis0212@naver.com",
  phone: "010-2446-0238",
  github: "https://github.com/BaeInSeop",
};

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-photo">
          <img src={profileImage} alt="배인섭" />
          <div className="hero-photo-accent" />
        </div>
        <div className="hero-info">
          <span className="hero-badge">Frontend Developer</span>
          <h1 className="hero-name">
            배인섭 <span className="hero-eng">(Toby)</span>
          </h1>
          <p className="hero-tagline">끊임없이 발전하는 프론트엔드 개발자</p>
          <div className="hero-contact">
            <a href={`mailto:${contact.email}`} className="contact-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              {contact.email}
            </a>
            <a href={`tel:${contact.phone}`} className="contact-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {contact.phone}
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-chip"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="about-section story-section">
        <div className="story-content">
          <p>
            <span className="story-highlight">2013년</span>, 개발자로서 첫걸음을 내딛었습니다.
            시간이 흐르며 프론트엔드라는 분야가 뚜렷하게 자리 잡았고, UI/UX를 고민하며 직관적인
            화면을 만들어가는 과정에 매력을 느껴 다시 이 길을 선택하게 되었습니다.
          </p>

          <p>
            최근 개발 환경에서는 개별 기술 숙련도뿐 아니라{" "}
            <span className="story-highlight">
              제품을 깊이 이해하고 AI를 효율적으로 활용해 빠르게 결과를 만들어내는 역량
            </span>
            이 더욱 중요해지고 있다고 생각합니다. 이러한 흐름에 맞춰 Cursor, Codex, Claude Code 등
            다양한 AI 에이전트를 적극적으로 활용하며, 개발 속도와 완성도를 동시에 높이기 위한 방법을
            지속적으로 고민하고 있습니다.
          </p>

          <p>
            또한 단순한 기능 구현에 그치지 않고{" "}
            <span className="story-highlight">
              직관적이고 아름다운 사용자 경험을 제공하기 위해 UI·UX와 디자인 전반에 대한 학습을 병행
            </span>
            하며, 기술과 디자인의 균형을 갖춘 프론트엔드 개발자로 성장하고자 합니다.
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="about-section">
        <h2 className="section-label">Experience</h2>
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={exp.company} className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-dot" />
                {idx < experiences.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.company}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <p className="timeline-role">{exp.role}</p>
                <ul>
                  {exp.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="about-section">
        <h2 className="section-label">Skills</h2>
        <div className="skills-container">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-group">
              <span className="skill-category">{category}</span>
              <div className="skill-list">
                {items.map((skill) => (
                  <span key={skill} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        {/* Certificates */}
        <section className="about-section mini-section">
          <h2 className="section-label">Certificates</h2>
          <ul className="simple-list">
            {certificates.map((cert) => (
              <li key={cert.name}>
                <span>{cert.name}</span>
                <span className="list-date">{cert.date}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="about-section mini-section">
          <h2 className="section-label">Education</h2>
          <ul className="simple-list">
            <li>
              <span>{education.school}</span>
              <span className="list-date">{education.period}</span>
            </li>
            <li className="list-sub">{education.major}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
