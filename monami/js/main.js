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

// HERO와 같은 글자 단위 등장 효과를 아래 콘텐츠에도 적용합니다.
// 해당 영역이 화면에 들어왔을 때 애니메이션이 시작되도록 합니다.
const revealTargets = document.querySelectorAll(
    ".story-copy h2, .story-quote, .story-description, " +
    ".product-sidebar h2, .product-sidebar-desc, .product-content > h2, " +
    ".news-section .section-title, .news-section .section-desc"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((target) => {
        target.classList.add("text-reveal");
        let delayIndex = 0;

        const wrapTextNodes = (node) => {
            Array.from(node.childNodes).forEach((child) => {
                if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
                    const fragment = document.createDocumentFragment();

                    Array.from(child.textContent).forEach((character) => {
                        const span = document.createElement("span");
                        span.className = "text-reveal-char";
                        span.textContent = character;
                        span.style.setProperty("--char-delay", `${delayIndex * 0.035}s`);
                        fragment.appendChild(span);
                        delayIndex += 1;
                    });

                    child.replaceWith(fragment);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    wrapTextNodes(child);
                }
            });
        };

        wrapTextNodes(target);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".text-reveal").forEach((target) => {
        revealObserver.observe(target);
    });
} else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
}

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
