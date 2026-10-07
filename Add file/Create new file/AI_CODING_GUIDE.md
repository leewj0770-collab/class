# AI_CODING_GUIDE.md

## 목적

이 문서는 현재 저장소의 버거킹 로그인 UI를 기준으로,
이후 다른 브랜드와 다른 화면을 만들 때 기존 HTML/CSS 작성 방식과 구조를 유지하기 위한 가이드다.

AI는 기존 코드를 전부 새로운 방식으로 교체하지 않는다.
먼저 현재 파일 구조와 코드를 확인하고,
기존 작업 방식을 최대한 유지하면서 필요한 부분만 추가·수정한다.

---

## 1. 현재 프로젝트 구조

현재 저장소의 주요 구조는 다음과 같다.

class/
├─ BK/
│  ├─ login.html
│  └─ img/
│     ├─ back_icon.svg
│     ├─ eye_icon.svg
│     ├─ checkbox_Default.svg
│     ├─ checkbox_Active.svg
│     ├─ kakao_logo.svg
│     ├─ naver_logo.svg
│     ├─ apple_logo.svg
│     └─ samsung_logo.svg
│
├─ CSS/
│  └─ default.css
│
├─ font/
│  ├─ BKBulMatPro-Bold.woff
│  ├─ PretendardVariable.woff2
│  └─ CSS/
│     ├─ BKBu.CSS
│     ├─ SD.CSS
│     └─ pretendardvariable.css
│
└─ index.html

### 파일 역할

- BK/login.html
  - 버거킹 로그인 화면의 HTML 구조와 화면별 CSS를 담당한다.

- CSS/default.css
  - 공통 reset
  - 기본 HTML 요소 설정
  - form 요소 초기화
  - 접근성용 .sr-only
  - 공통적인 브라우저 기본 스타일 초기화

- font/
  - 프로젝트에서 사용하는 폰트 파일과 @font-face 설정을 관리한다.

- BK/img/
  - 로그인 UI에서 사용하는 이미지와 SVG 아이콘을 관리한다.

- index.html
  - 현재 버거킹 로그인 화면으로 이동할 수 있는 시작 페이지다.

---

## 2. 현재 버거킹 HTML 구조

현재 BK/login.html은 다음과 같은 구조를 사용한다.

#wrap
├─ header
│  ├─ h1 로그인
│  └─ button 이전 버튼
│
└─ main
   ├─ h2 .title
   │
   ├─ form
   │  └─ fieldset
   │     ├─ legend
   │     ├─ label
   │     ├─ input
   │     ├─ 비밀번호 보기 button
   │     ├─ 로그인 옵션
   │     └─ 로그인 button
   │
   ├─ .login_link
   │  ├─ 아이디 찾기
   │  ├─ 비밀번호 재설정
   │  └─ 회원가입
   │
   └─ .sns_login
      ├─ SNS 안내
      └─ .sns_list

새 화면을 만들 때도 이 구조를 기본적인 참고 기준으로 사용한다.

단, 새 화면의 콘텐츠와 기능에 따라 HTML 구조는 달라질 수 있다.

---

## 3. HTML 작성 기준

### 3-1. #wrap

현재 버거킹 화면은 전체 화면을 #wrap으로 감싼다.

```html
<div id="wrap">
    ...
</div>
