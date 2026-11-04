# Design.md — 모나미 리뉴얼 메인페이지 디자인 가이드

> 이 문서는 현재 `monami/index.html`과 연결된 CSS/JavaScript를 확인해 정리한 구현 기준이다. 기존 메인페이지의 시각 디자인을 바꾸기 위한 제안서가 아니라, 현재 디자인을 유지·확장하기 위한 기록이다.
>
> **값의 기준:** 코드에서 직접 확인한 색상·크기·간격만 명시한다. 값이 변수로 정의되어 있으면 변수명을 함께 기록한다. 별도 표시가 없는 CSS 수치는 새 디자인 토큰이 아니라 현재 코드에 쓰인 실제 값이다.

## 1. Project Overview

### 사이트 목적
- 모나미 브랜드와 브랜드 이야기를 소개한다.
- 주요 제품을 보여주고 제품 상세 영역으로 진입하도록 돕는다.
- 모나미 뉴스와 기업·단체 문의 진입점을 제공한다.
- 상단 내비게이션과 모바일 메뉴를 통해 세부 페이지로 이동하게 한다.

### 메인페이지 콘텐츠 순서
1. Header / GNB
2. HERO 배너
3. 모나미 이야기
4. 제품소개
5. 모나미 뉴스
6. 기업·단체 문의 Quick Link
7. Footer

콘텐츠 순서는 `monami/index.html`의 실제 DOM 순서에 따른다.

### 디자인 방향 — 코드에서 확인한 특징
- 흰색 바탕과 검정·회색 텍스트를 중심으로 한 차분한 구성이다.
- 모나미 레드(`#D93636`)는 공통 액션 및 포커스 강조에 사용된다.
- 큰 이미지와 넓은 콘텐츠 영역으로 브랜드·제품을 소개한다.
- 섹션별 CSS 파일을 분리하고, 일부 공통 색상은 CSS 사용자 정의 속성(Custom Properties)으로 관리한다.
- 기존 레이아웃, 이미지 배치, 콘텐츠 순서를 임의로 변경하지 않는다.

## 2. Brand Identity

### 브랜드 표현
- 브랜드 로고 이미지: `monami/index.html`의 `img/monamu_log.png`
- 주요 제품 및 브랜드 이미지: `monami/img/` 안의 실제 이미지 파일
- 브랜드 포인트 컬러: CSS 변수 `--color-pen-red: #D93636`
- 기본 시각 언어: 흰색 표면, 짙은 텍스트, 얇은 경계선, 제한적인 포인트 컬러, 이미지 중심 콘텐츠

위 내용은 코드에서 확인한 시각적 특징이다. 브랜드의 공식 가이드라인 전체를 의미하지는 않는다.

## 3. Design Principles

1. **기존 레이아웃 유지:** 섹션 순서, HERO 문구 위치, 이미지 그리드, 내비게이션 정렬을 임의로 바꾸지 않는다.
2. **기존 변수 우선:** 이미 정의된 색상은 `--color-*`, `--text-*`, `--surface-*`, `--background-*`, `--border-*`, `--action-*`, `--accent-*` 변수를 우선 사용한다.
3. **콘텐츠 역할에 맞는 계층:** 섹션 제목, 설명, 보조 정보, 링크를 크기·굵기·간격으로 구분한다.
4. **상태가 보이는 인터랙션:** Hover와 키보드 Focus에서 색상, 배경, 위치 또는 강조 상태를 제공한다.
5. **반응형 구조 유지:** 화면 폭이 줄어들면 메뉴, 그리드, 섹션 패딩을 현재 미디어 쿼리 규칙에 따라 재배치한다.
6. **움직임 접근성:** `prefers-reduced-motion: reduce` 설정을 존중해 애니메이션과 전환을 줄이거나 제거한다.
7. **새 값 발명 금지:** 기존 코드에 없는 컬러·폰트 크기·간격을 현재 디자인 규칙인 것처럼 기록하지 않는다. 새로운 값이 정말 필요하다면 별도 변경 사항으로 검토한다.

## 4. Color System

### 4.1 Primitives — `:root`의 기본 컬러

| CSS 변수 | 실제 값 | 역할 |
|---|---|---|
| `--color-black` | `#1D1D1B` | 검정 계열, 반전 배경 |
| `--color-white` | `#FFFFFF` | 흰색 |
| `--color-graphite` | `#4B4B4B` | 그래파이트 회색 |
| `--color-paper` | `#F7F7F5` | 종이색 계열의 밝은 배경 |
| `--color-text-main` | `#222222` | 주요 텍스트 |
| `--color-text-muted` | `#70706C` | 보조 텍스트 |
| `--color-border` | `#E3E3DF` | 기본 경계선 |
| `--color-pen-red` | `#D93636` | 모나미 레드 포인트 |
| `--color-soft-red` | `#FCECEC` | 연한 레드 강조 배경 |

### 4.2 Semantic — 사용 목적별 컬러

| CSS 변수 | 실제 연결 값 | 적용 목적 |
|---|---|---|
| `--background-default` | `var(--color-paper)` | 기본 배경 |
| `--background-inverse` | `var(--color-black)` | 반전 배경 |
| `--surface-default` | `var(--color-white)` | 기본 표면, 헤더·카드 등 |
| `--surface-secondary` | `var(--color-paper)` | 보조 표면 |
| `--text-primary` | `var(--color-text-main)` | 주요 텍스트 |
| `--text-secondary` | `var(--color-text-muted)` | 보조 텍스트 |
| `--text-inverse` | `var(--color-white)` | 어두운 배경 위 텍스트 |
| `--border-default` | `var(--color-border)` | 기본 경계선 |
| `--border-strong` | `var(--color-graphite)` | 강조 경계선 |
| `--action-primary` | `var(--color-pen-red)` | 주요 액션·포커스 |
| `--action-primary-hover` | `var(--color-graphite)` | 주요 액션 Hover용 |
| `--action-secondary` | `var(--color-graphite)` | 보조 액션 |
| `--action-secondary-hover` | `var(--color-black)` | 보조 액션 Hover용 |
| `--accent-primary` | `var(--color-pen-red)` | 핵심 정보 강조 |
| `--accent-subtle` | `var(--color-soft-red)` | 은은한 강조 배경 |
| `--accent-neutral` | `var(--color-graphite)` | 중립 강조 |

### 4.3 코드에 직접 쓰인 추가 색상
일부 섹션 CSS에는 토큰이 아닌 직접 지정 색상도 있다. 아래는 실제 코드에 있는 값이며 새 토큰으로 정의된 것은 아니다.

| 값 | 사용 예 |
|---|---|
| `#fff`, `#FFFFFF` | 섹션 배경, 흰색 |
| `#111` | 제목·강조 텍스트, Hover 배경 |
| `#222`, `#292929` | 텍스트 및 아이콘 배경 |
| `#666`, `#70706C`, `#777`, `#888`, `#999` | 보조 텍스트 |
| `#aaa`, `#bdbdbd`, `#c9c9c5`, `#ddd`, `#e5e5e5` | 구분선 및 경계선 |
| `#f6f6f5`, `#f9f9f9` | 제품 이미지 영역 및 Hover 배경 |
| `rgba(0, 0, 0, 0.08)` | GNB 드롭다운 그림자 |
| `rgba(0, 0, 0, 0.35)` | HERO 텍스트 그림자 |
| `rgba(0, 0, 0, 0.4)` | 문의 카드 오버레이 |

**주의:** CSS에 변수 정의가 있더라도 일부 섹션은 색상을 직접 지정하고 있다. 리뉴얼 작업에서 이를 일괄 치환하면 현재 화면이 달라질 수 있으므로, 변경 전 실제 렌더링을 확인한다.

## 5. Typography

### 글꼴
- 본문 기본 글꼴: `"Pretendard Variable", sans-serif` — `monami/css/main.css`의 `body`
- 폰트 선언 파일: `font/CSS/pretendardvariable.css`
- 실제 폰트 파일 경로: `font/PretendardVariable.woff2`
- `@font-face`의 `font-weight`: `45 920`
- `font-display: swap`

### 코드에서 확인한 주요 타이포그래피
| 요소 / 상황 | 크기 | 굵기 | 행간 | 적용 규칙 |
|---|---:|---:|---:|---|
| GNB 1차 메뉴 | `18px` | `500` | 명시 없음 | PC 메뉴 링크 |
| GNB 1차 메뉴 Hover/Focus | `18px` | `700` | 명시 없음 | 메뉴 강조 |
| GNB 하위 메뉴 | `16px` | `400` | `1.4` | 드롭다운 링크 |
| HERO 제목 데스크톱 | `clamp(32px, 3vw, 48px)` | `500` | `1.5` | 화면 너비에 따라 크기 조절 |
| HERO 설명 | `20px` | `400` | `1.6` | 제목 아래 설명 |
| 모나미 이야기 제목 | `30px` | `700` | `1.35` | `.story-copy h2` |
| 모나미 이야기 인용문 | `16px` | `600` | `1.6` | `.story-quote` |
| 모나미 이야기 설명 | `20px` | `400` | `1.55` | `.story-description` |
| 제품 섹션 제목 | `30px` | `600` | `1.35` | 사이드바·콘텐츠 제목 |
| 제품명 | `14px` | `600` | `1.45` | `.product-card h3` |
| 뉴스 섹션 제목 | `30px` | `700` | `1.35` | `.section-title` |
| 뉴스 제목 | `16px` | `500` | `1.5` | 데스크톱 뉴스 항목 |
| 푸터 기본 정보 | `12px` | 미지정 | `1.8` | `.footer-info` |

### 타이포그래피 적용 규칙
- 위 수치는 각 CSS 파일에서 확인한 실제 값이다. 모든 요소가 하나의 공통 타입 스케일을 사용한다고 가정하지 않는다.
- `clamp()`가 있는 제목은 최소값·화면 너비 기반 값·최대값에 따라 크기가 변한다.
- 한국어 문구는 공통 CSS의 `word-break: keep-all`을 기본으로 하며, 긴 텍스트가 레이아웃을 밀지 않도록 `overflow-wrap: break-word`도 적용한다.
- 섹션별 예외와 모바일 크기는 각 해당 CSS 파일의 미디어 쿼리를 우선 확인한다.

## 6. Layout & Spacing

### 컨테이너·레이아웃 규칙
| 선택자 | 실제 규칙 | 적용 이유 |
|---|---|---|
| `.header-inner` | `width: min(100%, 1440px)`, `padding: 0 40px`, `min-height: 80px` | PC 헤더 내부 너비 제한 및 정렬 |
| `.gnb` | `position: absolute; left: 50%; transform: translateX(-50%)` | 로고와 별개로 GNB를 중앙 정렬 |
| `.story-intro` | 최대 너비 `1720px`, 2열 Grid, `gap: clamp(36px, 5vw, 76px)` | 소개 텍스트와 이미지 갤러리 배치 |
| `.story-gallery` | 2열 Grid, `gap: 10px`, 높이 `720px` | 비대칭 브랜드 이미지 배치 |
| `.product-section` | 최대 너비 `1720px`, 사이드바+콘텐츠 2열 Grid | 카테고리와 제품 카드 영역 분리 |
| `.product-grid` | 데스크톱 3열 Grid | 제품 카드 나열 |
| `.news-inner` | `width: min(100%, 1720px)` | 뉴스 콘텐츠 너비 제한 |
| `.inquiry-list` | Flex, 카드 간격 `24px` | 기업·단체 문의 카드 나란히 배치 |
| `.footer-inner` | `width: min(100%, 1720px)` | 푸터 콘텐츠 너비 제한 |

### 간격·모서리
- 간격은 하나의 고정 스케일로 통일되어 있지 않다. 각 선택자에 지정된 `gap`, `padding`, `margin`을 해당 구성 요소의 기준으로 삼는다.
- 헤더 PC 좌우 패딩은 `40px`; 1200px 이하에서 `24px`; 모바일 헤더는 `20px`이다.
- 카드 이미지 모서리는 제품 이미지 기본 `20px`, 태블릿 규칙에서 `14px`; 문의 카드 기본 `20px`, 작은 화면에서 `16px`; 이야기 이미지 기본 `14px`, 작은 화면에서 `12px`이다.
- `width: min(100%, 1720px)`는 부모 화면보다 넓어지지 않으면서 최대 콘텐츠 너비를 제한한다.
- `minmax(0, 1fr)`는 Grid 열의 최소 크기 때문에 콘텐츠가 넘치는 현상을 줄이기 위해 사용한다.

## 7. Components

### Header / GNB
- 파일: `monami/index.html`, `monami/css/main.css`, `monami/js/main.js`
- PC: 로고, 중앙 GNB, Hover 또는 Focus 시 나타나는 하위 메뉴.
- 1차 메뉴는 `.gnb-list > .gnb-item > a`, 하위 메뉴는 `.sub-menu a`.
- 키보드 사용 시 `:focus-within`, `:focus-visible` 상태를 유지한다.
- 모바일 메뉴 버튼 `.menu-toggle`은 `aria-expanded` 값과 `.gnb.is-open` 상태를 함께 변경한다.

### HERO
- 파일: `monami/index.html`, `monami/css/main.css`, `monami/js/main.js`
- 이미지 비율: 데스크톱 `aspect-ratio: 12 / 5`.
- 이미지에는 `object-fit: cover`를 적용한다.
- 제목은 `.hero-line`으로 두 줄을 유지하고 JavaScript가 글자별 `.hero-char`를 생성한다.
- 제목 위치: `top: 37%`, `left: 50%`; 모바일 규칙은 별도 미디어 쿼리에 있다.

### 모나미 이야기 이미지 갤러리
- 파일: `monami/css/story.css`
- 2열 비대칭 Grid와 `.story-image-pen`, `.story-image-building`, `.story-image-markers` 배치 클래스를 사용한다.
- 이미지에는 `object-fit: cover`를 적용한다. 기존 이미지별 위치와 너비 설정을 유지한다.

### 제품 카테고리 / 제품 카드
- 파일: `monami/css/product.css`, `monami/js/main.js`
- 데스크톱 제품 카드는 3열, 모바일은 2열이다.
- 제품 이미지 영역은 `aspect-ratio: 0.75`이며 이미지에는 `object-fit: contain`을 적용한다.
- 카테고리 클릭 시 `.is-active`를 이동시켜 현재 선택 항목을 표시한다.
- 외부 스토어 주소가 확정되지 않은 `.product-category-external`은 현재 임시 링크 `#`의 기본 이동을 막는다.

### 뉴스 목록
- 파일: `monami/css/news.css`
- `.news-item`마다 아래 경계선을 두고 제목, 날짜, 화살표를 한 행에 배치한다.
- Hover/Focus 시 배경이 바뀌며 화살표가 오른쪽으로 `4px` 이동한다.

### 기업·단체 문의 카드
- 파일: `monami/css/inquiry.css`
- 기본적으로 두 카드를 가로로 배치하고 작은 화면에서는 세로로 쌓는다.
- Hover/Focus 시 이미지가 흐려지고 확대되며 텍스트 오버레이가 나타난다.
- 현재 HTML 링크는 `href="#"`이므로 실제 문의 페이지 이동 기능은 연결 전 상태다.

### Footer
- 파일: `monami/css/footer.css`
- 정책 링크, 로고, 회사 정보, 고객센터 정보를 포함한다.
- 작은 화면에서는 로고와 정보 영역을 세로로 쌓고 회사 주소 구분선을 숨긴다.

## 8. Interaction

| 대상 | 상태 / 동작 | 현재 구현 |
|---|---|---|
| GNB 링크 | Hover / Focus | 글자 굵기 강조, 하위 메뉴 표시 |
| 하위 메뉴 링크 | Hover / Focus | 텍스트·배경색 변경 |
| 링크·버튼 Focus | `:focus-visible` | 색상 테두리 또는 배경 강조 |
| HERO 제목 | 페이지 로드 | 글자별 순차 등장, 지연 간격 `0.045s` |
| 본문 일부 제목·설명 | 스크롤 진입 | `IntersectionObserver`로 `.is-visible` 부여 |
| 이야기·제품·문의 이미지 | 스크롤 진입 | `.image-reveal`에서 `.is-visible`로 전환 |
| 제품 카테고리 | 클릭 | `.is-active` 클래스 변경 |
| 모바일 GNB | 메뉴 버튼 클릭 | `aria-expanded`, `aria-label`, `.is-open` 변경 |
| 모바일 GNB | 링크 클릭 / Escape | 메뉴 닫기 |
| 문의 카드 | Hover / Focus | 이미지 확대·블러, 오버레이와 문구 노출 |

### Transition / Animation
- 주로 `0.2s ease`, `0.25s ease`, `0.35s ease`, `0.4s ease`, `0.45s ease`, `0.65s ease`가 코드에 사용된다.
- 애니메이션을 새로 추가하기보다 해당 컴포넌트에 이미 존재하는 전환 규칙을 재사용한다.
- `prefers-reduced-motion: reduce`에서는 장식적인 움직임을 제거하거나 최소화한다.
- JavaScript가 없는 경우에도 주요 링크와 콘텐츠는 HTML에 존재해야 한다.

## 8-1. Typography Rules

### 메인 콘텐츠 최소 글자 크기
- 메인 콘텐츠에서 일반 텍스트의 최소 글자 크기는 **16px**로 유지한다.
- 적용 범위: 메인 페이지, 이야기 페이지, 제품 페이지, 뉴스 페이지, 문의 페이지의 콘텐츠 영역.
- 적용 대상: 본문, 설명, 날짜, 보조 라벨, 카드 제목 등 콘텐츠를 읽거나 정보를 확인하는 텍스트.
- 기존에 `12px`, `13px`, `14px`, `15px` 등으로 지정된 메인 콘텐츠 글자 크기는 `16px` 이상으로 조정한다.
- 제목과 강조 문구는 기존의 크기 및 반응형 `clamp()` 설정을 유지해 시각적 위계를 보존한다.
- **푸터는 이 규칙의 적용 대상에서 제외한다.** 푸터 글자 크기는 `monami/css/footer.css`의 별도 기준을 따른다.

## 9. Responsive Rules

현재 코드에서 확인한 주요 브레이크포인트:

| 미디어 쿼리 | 적용 규칙 |
|---|---|
| `max-width: 1200px` | 헤더 좌우 패딩 `24px`, GNB 간격 `20px` |
| `max-width: 1024px` | PC/모바일 요소 전환, 고정 헤더, 햄버거 메뉴, 모바일 GNB, HERO 높이 규칙 |
| `max-width: 900px` | 제품 섹션의 열 비율·간격 조정 |
| `max-width: 760px` | 이야기·뉴스·문의·푸터의 레이아웃 재배치 |
| `max-width: 680px` | 제품 섹션 1열, 제품 카드 2열 |
| `max-width: 560px` | 이야기 섹션 패딩 및 갤러리 크기 조정 |
| `max-width: 520px` | 뉴스 헤더 세로 배치, 문의 카드 세로 배치 |
| `max-width: 480px` | 푸터 정책·주소·로고 규칙 조정 |

### 반응형 작업 원칙
- 새 브레이크포인트를 추가하기 전에 현재 미디어 쿼리로 해결 가능한지 확인한다.
- 기존 이미지 비율과 순서를 임의로 바꾸지 않는다.
- 모바일에서는 메뉴, 제품 그리드, 문의 카드, 푸터가 현재 코드처럼 재배치되어야 한다.
- 1024px 이하 HERO는 `height: calc(100dvh - 60px)`, `min-height: 480px` 규칙을 사용한다.
- 작은 화면에서 긴 제목·링크가 겹치지 않는지 확인한다.

## 10. Do & Don't

### Do
- [ ] 현재 `monami/index.html`의 콘텐츠 순서를 유지한다.
- [ ] 기존 CSS 변수와 섹션별 스타일을 먼저 확인한다.
- [ ] CSS 변수 값을 문서에 적을 때 변수명과 실제 값을 함께 기록한다.
- [ ] HTML, CSS, 이미지, 폰트의 실제 경로를 확인한 후 수정한다.
- [ ] 기존 클래스와 상태 클래스(`.is-open`, `.is-active`, `.is-visible`)를 재사용할 수 있는지 확인한다.
- [ ] 키보드 포커스와 `prefers-reduced-motion` 대응을 유지한다.
- [ ] 변경 후 데스크톱과 모바일에서 레이아웃 및 링크 동작을 확인한다.

### Don't
- [ ] 기존 메인페이지의 레이아웃이나 디자인을 요청 없이 변경하지 않는다.
- [ ] 코드에 없는 컬러 코드, 폰트 크기, 간격을 현재 디자인 규칙처럼 만들어 기록하지 않는다.
- [ ] CSS 변수로 이미 정의된 색상을 무조건 새 하드코딩 값으로 대체하지 않는다.
- [ ] 기존의 이미지 경로·이미지별 배치 클래스를 확인하지 않고 변경하지 않는다.
- [ ] Hover만 제공하고 키보드 Focus 상태를 누락하지 않는다.
- [ ] `href="#"`인 임시 링크를 실제 기능이 완성된 링크처럼 취급하지 않는다.
- [ ] `prefers-reduced-motion: reduce` 대응을 제거하지 않는다.
- [ ] 코드 확인 없이 새 라이브러리나 복잡한 구현 방식을 추가하지 않는다.

## 파일 참조

- 메인 HTML: `monami/index.html`
- 공통 리셋: `CSS/default.css`
- 메인/HERO/GNB CSS: `monami/css/main.css`
- 이야기 CSS: `monami/css/story.css`
- 제품 CSS: `monami/css/product.css`
- 뉴스 CSS: `monami/css/news.css`
- 문의 CSS: `monami/css/inquiry.css`
- 푸터 CSS: `monami/css/footer.css`
- 인터랙션: `monami/js/main.js`
- 폰트 선언: `font/CSS/pretendardvariable.css`
 
## 11. Product Introduction Subpage Extension

### 페이지 구성
- HTML: `monami/product.html`
- 전용 스타일: `monami/css/product-page.css`
- 공통 Header/GNB와 Footer는 메인 페이지의 마크업 구조 및 `main.css`, `footer.css` 규칙을 재사용한다.
- 제품 소개 페이지는 HOME 경로 표시, 페이지 소개 영역, 3개 카테고리 내비게이션, 카테고리별 상품 목록 순서로 구성한다.

### 제품 카테고리 정보 구조
1. 대표상품 — 현재 저장소에서 확인된 `monami_pen1.png`, `monami_pen2.png`, `monami_pen3.png`를 사용한다.
2. 신상품 — 실제 제품 이미지와 제품 정보가 아직 제공되지 않아 이미지 준비 박스로 표시한다.
3. 인기상품 — 실제 제품 이미지와 제품 정보가 아직 제공되지 않아 이미지 준비 박스로 표시한다.

### 서브페이지 전용 레이아웃
- 콘텐츠 최대 너비는 기존 메인 섹션과 동일하게 `1720px`로 제한한다.
- HERO 영역은 텍스트와 이미지 준비 영역의 2열 Grid로 구성하고, 모바일에서는 1열로 변경한다.
- 카테고리 메뉴는 3열 Grid로 구성하며 각 메뉴는 페이지 내 해당 섹션으로 이동한다.
- 상품 목록은 데스크톱 3열, 작은 화면에서는 2열 Grid를 사용한다.
- 제품 이미지는 `object-fit: contain`으로 표시해 제품 비율을 유지한다.
- 일반 콘텐츠 텍스트의 최소 크기는 기존 프로젝트 기준인 `16px`을 따른다. 푸터는 별도 기준을 유지한다.

### 링크 및 동작
- 제품 카테고리 링크는 `product.html` 내부의 섹션 ID로 연결한다.
- GNB의 제품소개 메뉴 및 하위 메뉴는 새 제품 소개 페이지로 연결한다.
- 외부 브랜드 스토어 주소를 임의로 사용하지 않는다.
- 상품 상세 URL이 확정되지 않은 카드에는 임의의 외부 링크를 추가하지 않는다.
- 이미지 준비 박스는 실제 이미지와 제품 정보가 제공된 후 교체한다.

### 일관성 점검 기준
- 로고, GNB, 모바일 메뉴, 푸터는 메인 페이지와 동일한 파일 및 규칙을 사용한다.
- 색상은 기존 Semantic CSS 변수를 우선 사용한다.
- Pretendard Variable, 16px 최소 본문 크기, 모나미 레드 포인트, 얇은 경계선과 밝은 중립 배경을 유지한다.
- Hover와 Focus-visible 상태를 함께 제공하고, `prefers-reduced-motion` 설정을 존중한다.
