// 기업·단체 구매 탭: URL 해시와 선택한 탭을 연결합니다.
document.addEventListener("DOMContentLoaded", () => {
    const buttons = Array.from(document.querySelectorAll("[data-business-tab]"));
    const panels = Array.from(document.querySelectorAll(".business-panel[role='tabpanel']"));
    if (!buttons.length || !panels.length) return;

    const activateTab = (button, moveFocus = false) => {
        const targetId = button.dataset.businessTab;
        buttons.forEach((tab) => {
            const selected = tab === button;
            tab.classList.toggle("is-active", selected);
            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((panel) => { panel.hidden = panel.id !== targetId; });
        if (moveFocus) button.focus();
    };

    const activateFromHash = () => {
        const targetId = window.location.hash.slice(1);
        const targetButton = buttons.find((button) => button.dataset.businessTab === targetId);
        if (targetButton) activateTab(targetButton);
    };

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => activateTab(button));
        button.addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            let nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
            if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = buttons.length - 1;
            activateTab(buttons[nextIndex], true);
        });
    });

    document.querySelectorAll("[data-business-link]").forEach((link) => {
        link.addEventListener("click", (event) => {
            const button = buttons.find((tab) => tab.dataset.businessTab === link.dataset.businessLink);
            if (!button) return;
            event.preventDefault();
            activateTab(button);
            history.replaceState(null, "", "#" + button.dataset.businessTab);
            button.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    activateFromHash();
    window.addEventListener("hashchange", activateFromHash);
});