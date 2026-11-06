// 모나미 뉴스 영상 슬라이드: Swiper 라이브러리 사용
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".news-video-swiper");
    if (!slider || typeof Swiper === "undefined") return;

    new Swiper(slider, {
        slidesPerView: 1.15,
        spaceBetween: 18,
        speed: 500,
        watchOverflow: true,
        pagination: {
            el: ".news-video-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".video-next",
            prevEl: ".video-prev"
        },
        breakpoints: {
            560: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 24 }
        },
        a11y: {
            enabled: true
        }
    });
});
