/* =========================================================
   SWISSLIN RAJ V
   ENGINEERING PORTFOLIO — INTERACTIONS
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", function () {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(function () {

        preloader.classList.add("hide");

    }, 1800);

});


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.getElementById("cursorGlow");

if (cursorGlow) {

    window.addEventListener("mousemove", function (event) {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

        cursorGlow.style.opacity = "1";

    });

    document.addEventListener("mouseleave", function () {

        cursorGlow.style.opacity = "0";

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


const sectionObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                navLinks.forEach(function (link) {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },

        {
            threshold: 0.35
        }

    );


sections.forEach(function (section) {

    sectionObserver.observe(section);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".project-card, .expertise-item, .research-item, .profile-card, .stat"
    );


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

});


const revealObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(function (card) {

    card.addEventListener(
        "mousemove",
        function (event) {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                "perspective(900px) " +
                "rotateX(" + rotateX + "deg) " +
                "rotateY(" + rotateY + "deg)";

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform =
                "perspective(900px) " +
                "rotateX(0deg) " +
                "rotateY(0deg)";

        }
    );

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }
    );

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroContent =
    document.querySelector(".hero-content");


window.addEventListener(
    "scroll",
    function () {

        if (!heroContent) return;

        if (window.innerWidth < 700) {
            return;
        }

        const scroll =
            window.scrollY;

        if (
            scroll <
            window.innerHeight
        ) {

            heroContent.style.transform =
                "translateY(" +
                scroll * 0.12 +
                "px)";

        }

    }
);


/* =========================================================
   VERA-E CHIP ANIMATION
========================================================= */

const chip =
    document.querySelector(".chip-outline");


if (chip) {

    let rotation = 45;

    function animateChip() {

        rotation += 0.08;

        chip.style.transform =
            "rotate(" +
            rotation +
            "deg)";

        requestAnimationFrame(
            animateChip
        );

    }

    animateChip();

}


/* =========================================================
   PROJECT HOVER GLOW
========================================================= */

projectCards.forEach(function (card) {

    card.addEventListener(
        "mouseenter",
        function () {

            card.style.boxShadow =
                "0 20px 70px rgba(102,230,255,0.05)";

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.boxShadow =
                "none";

        }
    );

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements =
    document.querySelectorAll(
        ".current-year"
    );


yearElements.forEach(function (element) {

    element.textContent =
        new Date().getFullYear();

});


/* =========================================================
   PAGE READY
========================================================= */

document.body.classList.add(
    "page-ready"
);
