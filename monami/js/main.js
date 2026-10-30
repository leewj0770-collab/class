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

// 아래 콘텐츠는 원래 HTML과 줄바꿈을 유지한 채 요소 단위로 나타납니다.
const revealTargets = document.querySelectorAll(
    ".story-copy h2, .story-quote, .story-description, " +
    ".product-sidebar h2, .product-sidebar-desc, .product-content > h2, " +
    ".news-section .section-title, .news-section .section-desc"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((target) => target.classList.add("text-reveal"));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealTargets.forEach((target) => revealObserver.observe(target));
} 


// 제품 카테고리: 클릭한 항목의 강조 상태를 유지합니다.
// 브랜드 스토어로 이동하는 전체 메뉴는 외부 링크이므로 선택 상태에서 제외합니다.
const productCategories = document.querySelectorAll(".product-category:not(.product-category-external)");

productCategories.forEach((category) => {
    category.addEventListener("click", () => {
        productCategories.forEach((item) => item.classList.remove("is-active"));
        category.classList.add("is-active");
    });
});

// 전체 메뉴의 외부 주소가 정해지기 전에는 임시 링크가 페이지를 위로 이동시키지 않도록 합니다.
const externalProductLink = document.querySelector(".product-category-external");

if (externalProductLink) {
    externalProductLink.addEventListener("click", (event) => {
        if (externalProductLink.getAttribute("href") === "#") {
            event.preventDefault();
        }
    });
}

// 이미지 인터랙션
const storyImageTargets = document.querySelectorAll(".story-gallery .story-image");
const inquiryCards = document.querySelectorAll(".inquiry-card .card-image-box");
const productImages = document.querySelectorAll(".product-card .product-image-link");
const allRevealImages = [...storyImageTargets, ...inquiryCards, ...productImages];

if ("IntersectionObserver" in window) {
    allRevealImages.forEach((image) => image.classList.add("image-reveal"));
    storyImageTargets.forEach((image, index) => {
        image.style.setProperty("--image-delay", `${index * 0.12}s`);
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        allRevealImages.forEach((image) => image.classList.add("is-visible"));
    } else {
        // 모나미 이야기 이미지는 사용자가 실제로 스크롤하기 전에는 관찰을 시작하지 않습니다.
        const storyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -100px 0px" });

        const initialScrollY = window.scrollY;
        const startStoryImageReveal = () => {
            if (Math.abs(window.scrollY - initialScrollY) < 5) return;

            storyImageTargets.forEach((image) => storyImageObserver.observe(image));
            window.removeEventListener("scroll", startStoryImageReveal);
        };
        window.addEventListener("scroll", startStoryImageReveal, { passive: true });

        // 기업 문의와 단체 문의는 두 카드가 함께 나타나도록 같은 그룹으로 처리합니다.
        const inquiryObserver = new IntersectionObserver((entries, observer) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                inquiryCards.forEach((image) => image.classList.add("is-visible"));
                observer.disconnect();
            }
        }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });
        inquiryCards.forEach((image) => inquiryObserver.observe(image));

        const productImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });
        productImages.forEach((image) => productImageObserver.observe(image));
    }
} else {
    allRevealImages.forEach((image) => image.classList.add("is-visible"));
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
