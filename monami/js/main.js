// HERO 제목을 글자 단위로 나누어 순서대로 나타나게 합니다.
const heroLines = document.querySelectorAll(".hero-sec .hero-line");

let charIndex = 0;

heroLines.forEach((line) => {
    const text = line.textContent;
    line.textContent = "";

    Array.from(text).forEach((character) => {
        const span = document.createElement("span");

        span.className = "hero-char";
        span.textContent = character;
        span.style.setProperty("--char-delay", `${charIndex * 0.045}s`);

        line.appendChild(span);
        charIndex += 1;
    });
});

// 모바일 헤더 메뉴 열기/닫기
const menuToggle = document.querySelector(".menu-toggle");
const gnb = document.querySelector("#gnb");

if (menuToggle && gnb) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "메뉴 열기" : "메뉴 닫기");
        gnb.classList.toggle("is-open", !isExpanded);
    });

    // 메뉴 항목을 선택하면 모바일 메뉴를 닫습니다.
    gnb.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "메뉴 열기");
            gnb.classList.remove("is-open");
        });
    });

    // Escape 키로 메뉴를 닫을 수 있도록 합니다.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "메뉴 열기");
            gnb.classList.remove("is-open");
        }
    });
}
