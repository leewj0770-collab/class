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
```

#wrap은 화면 전체를 감싸는 레이아웃용 요소다.

### 3-2. 시맨틱 HTML

HTML 태그는 단순히 화면에서 보이는 모양이 아니라 콘텐츠의 의미를 기준으로 선택한다.

- header: 페이지 또는 사이트의 상단 영역
- nav: 주요 이동 메뉴
- main: 현재 페이지의 핵심 콘텐츠
- section: 하나의 주제에 해당하는 콘텐츠 그룹
- article: 독립적으로 사용될 수 있는 콘텐츠
- footer: 페이지 하단의 정보
- div: 특별한 의미 없이 레이아웃이나 그룹화가 필요한 경우

### 3-3. 제목

h1~h6은 글자 크기가 아니라 문서의 제목 계층을 나타낸다.

- h1: 페이지의 대표 제목
- h2: 주요 콘텐츠 제목
- h3 이하: 하위 콘텐츠 제목

### 3-4. form

사용자가 정보를 입력하고 제출하는 화면은 form을 사용한다.

- form: 입력과 제출 전체 영역
- fieldset: 관련 입력 그룹
- legend: 입력 그룹의 의미
- label: 입력 항목 설명
- input: 사용자 입력
- button: 제출 또는 기능 실행

### 3-5. 링크와 버튼

- 다른 화면이나 페이지로 이동: a
- 현재 화면에서 동작 실행: button

### 3-6. 반복 콘텐츠

같은 종류의 콘텐츠가 반복되면 먼저 실제 의미가 목록인지 확인한다. 의미상 목록이면 ul > li를 고려한다.

### 3-7. div

div는 의미가 없는 단순 레이아웃 또는 그룹화가 필요한 경우 사용한다. 다른 의미 요소가 적절한데 단순히 모양 때문에 div를 선택하지 않는다.

---

## 4. 접근성

현재 프로젝트에는 .sr-only 유틸리티가 있다.

```html
<button class="prev_btn">
    <span class="sr-only">이전버튼</span>
</button>
```

아이콘만 있는 버튼이나 이미지로 의미를 전달하는 요소에는 기능을 설명하는 텍스트를 제공한다.

---

## 5. CSS 작성 기준

현재 프로젝트는 공통 CSS와 화면별 CSS를 구분한다.

CSS/default.css
→ 공통 reset / 기본 설정 / 접근성

BK/login.html의 <style>
→ 버거킹 로그인 화면에 필요한 개별 스타일

새 화면에서도 default.css의 역할을 임의로 변경하지 않는다. 화면에만 필요한 스타일은 기존 프로젝트와 같은 방식으로 화면별 CSS에서 처리하는 것을 우선한다.

---

## 6. CSS 변수

현재 버거킹 로그인 UI는 :root에서 주요 디자인 값을 변수로 관리한다.

```css
:root {
    --font: "Sandoll GothicNeoRound", sans-serif;
    --font-pre: "Pretendard Variable", sans-serif;
    --font-BKR: "BKR", sans-serif;
    --primary: #512314;
    --focus: #D62302;
    --baseBorder: #D9CFC6;
    --inputBg: #FFFCF9;
    --errorColor: #C54734;
    --placeholder: #EBE6E2;
    --text: #766053;
    --bg: #F4EBDC;
    --button: #E9DDCD;
}
```

새 브랜드 화면에서도 반복되는 색상이나 폰트는 같은 방식으로 CSS 변수화한다. 실제 값은 Figma나 제공된 디자인 자료를 기준으로 한다.

---

## 7. 현재 사용하는 CSS 방식

별도의 UI 라이브러리 없이 기본 CSS를 중심으로 작성한다.

주요 방식:

- display: flex
- justify-content
- align-items
- flex-direction
- gap
- position: relative
- position: absolute
- width / max-width / min-width
- height
- padding / margin
- background
- border
- border-radius

새 화면에서도 먼저 현재 프로젝트의 기본 CSS를 활용하고, 불필요하게 새로운 라이브러리나 복잡한 기술을 추가하지 않는다.

---

## 8. 화면 폭과 반응형

현재 #wrap:

```css
#wrap {
    width: 100%;
    max-width: 1024px;
    min-width: 360px;
    min-height: 100dvh;
    margin: 0 auto;
}
```

새 화면에서도 현재 프로젝트의 기본 화면 폭 처리 방식을 우선 유지한다. 필요한 경우에만 추가적인 반응형 CSS를 작성한다.

---

## 9. Form 요소 CSS

현재 default.css에서는 form 요소에 공통 설정을 적용한다.

```css
input,
button,
textarea,
select {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
}
```

새 화면에서도 브라우저 기본 스타일과 default.css의 reset이 적용된다는 것을 고려한다.

---

## 10. 클래스 이름 작성 기준

현재 버거킹 로그인 UI에는 역할을 설명하는 클래스가 사용된다.

- .prev_btn: 이전 버튼
- .title: 주요 제목 영역
- .input_box: input을 감싸는 영역
- .rela: absolute 요소 배치를 위한 relative 영역
- .pw_btu: 비밀번호 보기 버튼
- .login_option: 로그인 옵션
- .login_btu: 로그인 버튼
- .login_link: 관련 링크
- .sns_login: SNS 로그인 영역
- .sns_list: SNS 로그인 목록

새 화면에서도 클래스 이름은 콘텐츠 또는 역할을 이해할 수 있도록 작성한다. 역할이 다르면 기존 클래스를 억지로 재사용하지 않는다.

---

## 11. 이미지와 아이콘 경로

현재 BK/login.html은 BK 폴더 안에 있으므로 이미지 경로는 상대경로를 사용한다.

```css
background: url(img/back_icon.svg) no-repeat center / auto;
```

새 HTML의 위치가 달라지면 상대경로도 달라질 수 있으므로 파일 위치를 먼저 확인한다.

---

## 12. 새 브랜드 로그인 UI 제작 순서

### STEP 1. 기존 프로젝트 확인

1. 현재 폴더 구조
2. 새 HTML 파일 위치
3. 연결 CSS
4. 이미지 / SVG 위치
5. 폰트 위치
6. default.css
7. 기존 버거킹 login.html

### STEP 2. 디자인 분석

Figma 또는 화면에서 다음을 확인한다.

- 화면 제목
- 상단 영역
- 입력 항목
- 버튼
- 안내 문구
- 링크
- 아이콘
- 이미지
- 반복 콘텐츠
- 색상
- 폰트
- 콘텐츠 순서

화면 모양만 보고 HTML 태그를 결정하지 않는다. 콘텐츠 의미와 사용자의 행동을 먼저 파악한다.

### STEP 3. HTML 작성

기존 버거킹 로그인 UI의 구조를 기본 참고로 사용하되 새 화면의 콘텐츠 의미에 맞게 필요한 부분만 변경한다.

### STEP 4. CSS 작성

기존 reset, CSS 변수, 폰트, flex, position, spacing, form 스타일 등을 우선 활용한다.

### STEP 5. 경로 확인

이미지와 폰트의 실제 파일 경로와 HTML/CSS 연결 상태를 확인한다.

### STEP 6. 테스트

- HTML 구조
- CSS 연결
- 이미지 표시
- 폰트 적용
- input / button 표시
- 화면 폭 변화
- 아이콘 버튼의 접근성 설명

을 확인한다.

---

## 13. AI가 기존 코드를 수정할 때

### 원칙 1. 전체 코드를 무조건 새로 작성하지 않는다.

먼저 기존 코드에서 문제가 있는 부분을 찾는다.

### 원칙 2. 기존 작성 방식을 유지한다.

새로운 방법이 있다는 이유만으로 현재 프로젝트의 구조를 전부 바꾸지 않는다.

### 원칙 3. 오류 원인을 먼저 확인한다.

문제가 발생하면 HTML 구조, CSS 선택자/속성, 파일 경로, 이미지, 폰트, HTML/CSS 연결, 저장 상태, Live Server 등 작업환경을 구분해서 확인한다.

### 원칙 4. 기존 코드와 새 코드를 구분한다.

원래 존재하던 코드, 새 화면을 위해 추가한 코드, AI가 제안하는 개선을 가능한 한 구분해서 설명한다.

### 원칙 5. 학생이 직접 수정할 수 있는 문제라면

문제가 발생한 위치와 이유, 수정할 부분, 힌트를 먼저 제공한다. 필요한 경우에만 완성 코드를 제공한다.

---

## 14. Figma 분석과 HTML 구조

Figma에서 보이는 디자인 요소를 HTML 태그에 1:1로 대응시키지 않는다.

```text
사용자 입력 → input
다른 페이지로 이동 → a
기능 실행 → button
콘텐츠 제목 → h1 ~ h6
관련 입력 그룹 → fieldset
단순 레이아웃 그룹 → div
```

즉,

디자인 → 콘텐츠 의미 → HTML 구조 → CSS 디자인

순서로 생각한다.

---

## 15. 사실과 추론 구분

Figma나 이미지에서 직접 확인할 수 있는 내용과 일반적인 UI 관례를 바탕으로 추론한 내용을 구분한다.

디자인에 명확하게 표시되지 않은 이름이나 기능을 AI가 임의로 확정하지 않는다.

필요한 경우 다음을 구분해서 설명한다.

- 디자인에서 확인된 내용
- 기존 버거킹 코드에서 가져온 구조
- AI가 새 화면에 제안하는 부분

---

## 16. 코드 작성 전 체크리스트

- [ ] 현재 저장소의 폴더 구조를 확인했는가?
- [ ] 기존 버거킹 login.html을 확인했는가?
- [ ] CSS/default.css를 확인했는가?
- [ ] 새 HTML 파일의 위치를 확인했는가?
- [ ] 이미지와 SVG 경로를 확인했는가?
- [ ] 폰트 경로를 확인했는가?
- [ ] HTML 요소의 의미를 먼저 파악했는가?
- [ ] 기존 구조에서 재사용할 부분을 확인했는가?
- [ ] 새로운 클래스가 정말 필요한가?
- [ ] 기존 CSS를 불필요하게 반복하지 않았는가?
- [ ] 아이콘 버튼에 접근성 설명이 있는가?
- [ ] 화면 폭 변화에 문제가 없는가?

---

## 17. 핵심 원칙

이 프로젝트에서 AI의 역할은 코드를 대신 완성하는 것이 아니라, 사용자가 만든 버거킹 로그인 UI의 구조와 스타일을 이해하고 다른 브랜드와 화면에 적용할 수 있도록 돕는 것이다.

기본 흐름:

기존 버거킹 코드 확인
        ↓
HTML / CSS 구조 파악
        ↓
새 디자인의 콘텐츠와 기능 분석
        ↓
재사용할 기존 구조 선택
        ↓
필요한 HTML 수정
        ↓
필요한 CSS 수정
        ↓
파일 경로와 연결 확인
        ↓
브라우저 테스트
        ↓
문제 원인 확인 및 수정

새로운 코드를 만드는 것보다 기존 코드와의 일관성을 우선한다.

디자인을 그대로 HTML로 옮기는 것이 아니라 콘텐츠의 의미를 먼저 파악하고 HTML 구조를 결정한다.

AI가 코드를 대신 완성하는 것이 아니라 사용자가 기존 버거킹 UI의 구조를 이해하고 다른 브랜드 UI에도 적용할 수 있도록 돕는다.
