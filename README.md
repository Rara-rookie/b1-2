# 과제 b1-2: 버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기

> React 18 및 React Router v6 기반으로 구현한 라우터 및 CRUD 지원 Single Page Application (SPA) 서비스입니다.

---

## 📌 프로젝트 소개 및 목적

React의 핵심 동작 원리인 **컴포넌트 설계, 상태(state)와 이벤트를 중심으로 한 선언적 UI 렌더링, 라우팅, 비동기 데이터 처리**를 직접 구현한 Task Tracker 서비스입니다.

---

## 🛠️ 사용 기술 스택

- **Framework**: React 18
- **Routing**: React Router DOM v6
- **Build Tool**: Vite
- **Styling**: Pure CSS (CSS Variables, Flexbox, Grid)
- **State & Custom Hooks**: `useState`, `useEffect`, `useCallback`, 커스텀 훅 `useItems()`, `useItemDetail()`
- **Backend / Data Persistence**: Client-side API Layer (LocalStorage Fallback & Supabase API Integration Ready)

---

## ✨ 핵심 구현 요구사항 대조

### 1. 라우팅 (React Router v6) - 총 6개 라우트
- `/` : 홈/대시보드 (통계 및 최근 Task 카드)
- `/items` : 전체 Task 목록 (검색 및 카테고리 필터링)
- `/items/:id` : 특정 Task 상세 조회 페이지
- `/items/new` : 새 Task 등록 페이지
- `/items/:id/edit` : 기존 Task 수정 페이지
- `*` : 404 Not Found 안내 페이지

### 2. 재사용 컴포넌트 (총 9개 컴포넌트)
- `Layout` (공통 헤더/푸터 감싸기)
- `Navbar` (글로벌 내비게이션 & 테마 제어)
- `Button` (variant, size, loading 프로퍼티 지원)
- `Input` (error, helperText, textarea, select 파라미터 제어)
- `Card` (아이템 카드 렌더링)
- `Loading` (로딩 스피너)
- `ErrorState` (에러 문구 및 재시도 버튼)
- `EmptyState` (데이터가 없을 때 안내 화면)
- `Modal` (삭제 확인 모달 대화상자)

### 3. CRUD 기능
- **Create**: `/items/new`에서 유효성 검사 후 데이터 생성
- **Read**: 목록(`/items`) 및 상세(`/items/:id`) 데이터 비동기 조회
- **Update**: `/items/:id/edit`에서 기존 데이터 로딩 후 수정 저장
- **Delete**: 상세 페이지 삭제 모달 확인 후 데이터 삭제 및 목록 이동

### 4. 폼 UX & 상태 피드백
- Controlled Component 기반 폼 제어 및 필수값/최소길이 유효성 검사
- 제출 중 버튼 비활성화 및 로딩 스피너 표출
- 실패/에러 시 실패 피드백 안내 UI

---

## 📁 폴더 구조

```
b1-2/
├── b1-2.md
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── components/       # 재사용 UI 컴포넌트
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   ├── Modal.jsx
│   │   └── States.jsx    (Loading, ErrorState, EmptyState)
│   ├── hooks/            # 커스텀 훅
│   │   └── useItems.js
│   ├── lib/              # API Client & Data Layer
│   │   └── api.js
│   ├── pages/            # 라우트 페이지 컴포넌트
│   │   ├── HomePage.jsx
│   │   ├── ItemDetailPage.jsx
│   │   ├── ItemFormPage.jsx
│   │   ├── ItemListPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
└── README.md
```

---

## 🚀 실행 방법

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 개발 서버 실행 (localhost:3000)
npm run dev

# 3. 프로젝트 프로덕션 빌드
npm run build
```
