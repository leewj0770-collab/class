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
