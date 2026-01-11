# Federation Host

Module Federation 기반의 마이크로 프론트엔드 포트폴리오 애플리케이션입니다.

## Overview

이 프로젝트는 Webpack Module Federation을 활용하여 여러 독립적인 애플리케이션을 하나의 통합된 포트폴리오 사이트로 구성합니다. Host 앱은 메인 컨테이너 역할을 하며, React와 Vue로 개발된 Remote 앱들을 런타임에 동적으로 로드합니다.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Module Federation**: @module-federation/vite
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **Language**: TypeScript

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Host Application                        │
│                       (React + Vite)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   About     │  │  Projects   │  │    Architecture     │  │
│  │   Page      │  │    Page     │  │       Page          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Module Federation                         │
├──────────────┬──────────────────┬───────────────────────────┤
│   Remote 1   │     Remote 2     │         Remote 3          │
│  Playground  │   Flow Builder   │      Vue Playground       │
│   (React)    │     (React)      │          (Vue)            │
└──────────────┴──────────────────┴───────────────────────────┘
```

## Features

### Host Application
- **탭 기반 네비게이션**: 브라우저 탭처럼 여러 페이지를 동시에 열어둘 수 있음
- **URL 동기화**: 현재 활성 탭이 URL과 동기화되어 새로고침 시에도 상태 유지
- **카테고리별 메뉴**: Introduce, React, Vue 카테고리로 구분된 사이드바 메뉴
- **반응형 디자인**: 다양한 화면 크기에 대응

### Pages
- **About**: 자기소개, 경력, 기술 스택, 자격증, 학력 정보
- **Projects**: 프로젝트 목록 및 상세 페이지 (히스토리, 기술적 챌린지 포함)
- **Architecture**: Module Federation 아키텍처 설명

### Remote Applications
- **React Playground**: React 컴포넌트 데모 (Tabs, Accordion, Tree 등)
- **Flow Builder**: React Flow 기반 워크플로우 에디터
- **Vue Playground**: Vue 컴포넌트 데모 (Highcharts 등)

## Project Structure

```
host/
├── src/
│   ├── assets/
│   │   └── images/          # 이미지 리소스
│   ├── pages/
│   │   ├── About.tsx        # 자기소개 페이지
│   │   ├── About.css
│   │   ├── Projects.tsx     # 프로젝트 페이지
│   │   ├── Projects.css
│   │   ├── Architecture.tsx # 아키텍처 페이지
│   │   └── Architecture.css
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── VueWrapper.tsx       # Vue 앱 래퍼
│   ├── bootstrap.tsx        # 앱 부트스트랩
│   ├── main.tsx             # 엔트리 포인트
│   ├── menu.json            # 메뉴 구성
│   ├── remotes.d.ts         # Remote 타입 선언
│   └── style.css            # 전역 스타일
├── .env                     # 환경 변수
├── vite.config.ts           # Vite 설정
├── tsconfig.json            # TypeScript 설정
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- yarn or npm

### Installation

```bash
# 의존성 설치
yarn install
# or
npm install
```

### Environment Variables

`.env` 파일을 생성하고 Remote 앱 URL을 설정합니다:

```env
VITE_PLAYGROUND_URL=http://localhost:5001/remoteEntry.js
VITE_FLOWBUILDER_URL=http://localhost:5002/remoteEntry.js
VITE_VUE_PLAYGROUND_URL=http://localhost:5003/remoteEntry.js
```

### Development

```bash
# 개발 서버 실행 (포트 5000)
yarn dev
# or
npm run dev
```

### Build

```bash
# 프로덕션 빌드
yarn build
# or
npm run build
```

### Preview

```bash
# 빌드된 결과물 미리보기
yarn preview
# or
npm run preview
```

## Module Federation Configuration

```typescript
// vite.config.ts
federation({
  name: "host",
  remotes: {
    playground: {
      type: "module",
      name: "playground",
      entry: env.VITE_PLAYGROUND_URL,
    },
    flowbuilder: {
      type: "module",
      name: "flowbuilder",
      entry: env.VITE_FLOWBUILDER_URL,
    },
    vue_playground: {
      type: "module",
      name: "vue_playground",
      entry: env.VITE_VUE_PLAYGROUND_URL,
    },
  },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
    zustand: { singleton: true },
  },
})
```

## Related Repositories

- [Federation Playground](https://github.com/Bae-In-Seop/federation-playground) - React Remote App
- [Federation Vue Playground](https://github.com/Bae-In-Seop/federation-vue-playground) - Vue Remote App

## Demo

[Live Demo](https://bae-in-seop.github.io/federation-host/)

## License

MIT
