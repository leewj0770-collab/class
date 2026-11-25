// 모나미 뉴스: 제품소개 페이지와 같은 탭 및 갤러리 페이지네이션
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = Array.from(document.querySelectorAll("[data-news-tab]"));
    const tabPanels = Array.from(document.querySelectorAll(".news-list-section[role='tabpanel']"));

    const activateTab = (button, moveFocus = false) => {
        const targetId = button.dataset.newsTab;

        tabButtons.forEach((tab) => {
            const selected = tab === button;
            tab.classList.toggle("is-active", selected);
            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
        });

        tabPanels.forEach((panel) => {
            panel.hidden = panel.id !== targetId;
        });

        if (moveFocus) button.focus();
    };

    const activateNewsTabFromHash = () => {
        const targetId = window.location.hash.slice(1);
        const targetButton = tabButtons.find((button) => button.dataset.newsTab === targetId);
        if (targetButton) activateTab(targetButton);
    };

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => activateTab(button));
        button.addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();

            let nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
            if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = tabButtons.length - 1;

            activateTab(tabButtons[nextIndex], true);
        });
    });

    // 헤더 서브 메뉴의 주소(#video-library 등)에 맞춰 해당 탭을 엽니다.
    activateNewsTabFromHash();
    window.addEventListener("hashchange", activateNewsTabFromHash);

    // 각 탭의 갤러리는 한 페이지에 3개씩 보여줍니다.
    tabPanels.forEach((panel) => {
        const cards = Array.from(panel.querySelectorAll(".news-gallery-card"));
        const pagination = panel.querySelector(".news-pagination");
        if (!cards.length || !pagination) return;

        const itemsPerPage = 3;
        const totalPages = Math.ceil(cards.length / itemsPerPage);
        let currentPage = 1;

        const renderPage = () => {
            cards.forEach((card, index) => {
                const firstIndex = (currentPage - 1) * itemsPerPage;
                card.hidden = index < firstIndex || index >= firstIndex + itemsPerPage;
            });

            pagination.innerHTML = "";

            const previous = document.createElement("button");
            previous.type = "button";
            previous.textContent = "<";
            previous.setAttribute("aria-label", "이전 페이지");
            previous.disabled = currentPage === 1;
            previous.addEventListener("click", () => {
                if (currentPage > 1) {
                    currentPage -= 1;
                    renderPage();
                }
            });

            const numbers = document.createElement("div");
            numbers.className = "news-pagination-pages";

            for (let page = 1; page <= totalPages; page += 1) {
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = String(page);
                button.setAttribute("aria-label", page + "페이지");
                button.setAttribute("aria-current", page === currentPage ? "page" : "false");
                if (page === currentPage) button.classList.add("is-current");
                button.addEventListener("click", () => {
                    currentPage = page;
                    renderPage();
                });
                numbers.appendChild(button);
            }

            const next = document.createElement("button");
            next.type = "button";
            next.textContent = ">";
            next.setAttribute("aria-label", "다음 페이지");
            next.disabled = currentPage === totalPages;
            next.addEventListener("click", () => {
                if (currentPage < totalPages) {
                    currentPage += 1;
                    renderPage();
                }
            });

            pagination.append(previous, numbers, next);
        };

        renderPage();
    });

    // 첫 번째 동영상 썸네일을 누르면 영상 팝업을 열어 재생합니다.
    const videoLink = document.querySelector(".news-gallery-link[data-video-src]");
    if (videoLink) {
        const videoModal = document.createElement("div");
        videoModal.className = "news-video-modal";
        videoModal.hidden = true;
        videoModal.innerHTML = `
            <div class="news-video-modal__backdrop" data-video-close></div>
            <div class="news-video-modal__dialog" role="dialog" aria-modal="true" aria-label="모나미 동영상 재생">
                <button class="news-video-modal__close" type="button" aria-label="영상 닫기" data-video-close>×</button>
                <video class="news-video-modal__player" controls playsinline preload="metadata">
                    <source src="${videoLink.dataset.videoSrc}" type="video/mp4">
                    브라우저가 동영상 재생을 지원하지 않습니다.
                </video>
            </div>
        `;
        document.body.appendChild(videoModal);

        const player = videoModal.querySelector("video");
        const closeVideo = () => {
            videoModal.hidden = true;
            player.pause();
            player.currentTime = 0;
            videoLink.focus();
        };

        videoLink.addEventListener("click", (event) => {
            event.preventDefault();
            videoModal.hidden = false;
            player.play().catch(() => {
                // 브라우저 정책상 자동 재생이 막히면 재생 버튼을 직접 누르면 됩니다.
            });
            videoModal.querySelector(".news-video-modal__close").focus();
        });

        videoModal.querySelectorAll("[data-video-close]").forEach((button) => {
            button.addEventListener("click", closeVideo);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !videoModal.hidden) closeVideo();
        });
    }

    // 상세 페이지가 아직 없는 나머지 준비용 링크는 임시 이동을 막습니다.
    document.querySelectorAll(".news-gallery-link[href='#']:not([data-video-src])").forEach((link) => {
        link.addEventListener("click", (event) => event.preventDefault());
    });
});
