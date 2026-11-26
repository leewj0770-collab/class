// 기업 문의 폼: 현재 포트폴리오 화면에서는 실제 전송 대신 안내 메시지를 표시합니다.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#business-inquiry-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        alert("문의 양식 화면이 정상적으로 구성되었습니다. 현재는 실제 문의 전송 기능이 연결되어 있지 않습니다.");
    });
});