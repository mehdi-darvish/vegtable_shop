document.addEventListener("popularProductsRendered", () => {

    const swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            480: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            834: { slidesPerView: 3 },
        },
    })
})
