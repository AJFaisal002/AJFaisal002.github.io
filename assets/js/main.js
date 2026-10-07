/* =========================================================
   ADNAN FAISAL — ACADEMIC PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("show");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        /* Close menu after clicking a link */

        const navLinks = navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }



    /* =====================================================
       2. DARK / LIGHT MODE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("adnanPortfolioTheme");


    /* Load previously selected theme */

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        updateThemeIcon(true);

    } else {

        updateThemeIcon(false);

    }



    /* Theme button click */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const darkModeActive =
                document.body.classList.contains("dark-mode");


            if (darkModeActive) {

                localStorage.setItem(
                    "adnanPortfolioTheme",
                    "dark"
                );

            } else {

                localStorage.setItem(
                    "adnanPortfolioTheme",
                    "light"
                );

            }


            updateThemeIcon(darkModeActive);

        });

    }



    /* =====================================================
       3. UPDATE THEME ICON
    ===================================================== */

    function updateThemeIcon(isDark) {

        if (!themeToggle) {
            return;
        }

        const icon = themeToggle.querySelector("i");

        if (!icon) {
            return;
        }


        if (isDark) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }



    /* =====================================================
       4. AUTOMATIC FOOTER YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       5. CLOSE MOBILE MENU WHEN WINDOW RESIZES
    ===================================================== */

    window.addEventListener("resize", function () {

        if (
            window.innerWidth > 700 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove("show");

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });



    /* =====================================================
       6. PUBLICATION SEARCH

       This will automatically work later when we create
       publications.html
    ===================================================== */

    const publicationSearch =
        document.getElementById("publicationSearch");

    const publicationCards =
        document.querySelectorAll(".publication-search-item");


    if (
        publicationSearch &&
        publicationCards.length > 0
    ) {

        publicationSearch.addEventListener(
            "input",
            function () {

                const searchValue =
                    publicationSearch.value
                        .toLowerCase()
                        .trim();


                publicationCards.forEach(
                    function (publication) {

                        const publicationText =
                            publication.textContent
                                .toLowerCase();


                        if (
                            publicationText.includes(
                                searchValue
                            )
                        ) {

                            publication.style.display = "";

                        } else {

                            publication.style.display = "none";

                        }

                    }
                );

            }
        );

    }



    /* =====================================================
       7. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                /*
                   Ignore placeholder href="#"
                */

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });

        /* =====================================================
       8. GALLERY FILTER
    ===================================================== */

    const galleryFilterButtons =
        document.querySelectorAll(".gallery-filter-btn");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    if (
        galleryFilterButtons.length > 0 &&
        galleryItems.length > 0
    ) {

        galleryFilterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const filter =
                    button.getAttribute("data-filter");


                /* Remove active class */

                galleryFilterButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");

                    }
                );


                /* Activate selected button */

                button.classList.add("active");


                /* Filter gallery */

                galleryItems.forEach(function (item) {

                    const category =
                        item.getAttribute("data-category");


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        item.classList.remove(
                            "gallery-hidden"
                        );

                    } else {

                        item.classList.add(
                            "gallery-hidden"
                        );

                    }

                });

            });

        });

    }



    /* =====================================================
       9. GALLERY LIGHTBOX
    ===================================================== */

    const galleryLightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const lightboxClose =
        document.getElementById("lightboxClose");


    if (
        galleryLightbox &&
        lightboxImage &&
        galleryItems.length > 0
    ) {

        galleryItems.forEach(function (item) {

            item.addEventListener("click", function () {

                const image =
                    item.querySelector("img");

                const heading =
                    item.querySelector(
                        ".gallery-overlay h2"
                    );


                if (!image) {
                    return;
                }


                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;


                if (
                    lightboxCaption &&
                    heading
                ) {

                    lightboxCaption.textContent =
                        heading.textContent;

                }


                galleryLightbox.classList.add("open");

                document.body.style.overflow =
                    "hidden";

            });

        });

    }



    /* Close lightbox button */

    if (
        lightboxClose &&
        galleryLightbox
    ) {

        lightboxClose.addEventListener(
            "click",
            function () {

                closeGalleryLightbox();

            }
        );

    }



    /* Click dark background to close */

    if (galleryLightbox) {

        galleryLightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === galleryLightbox
                ) {

                    closeGalleryLightbox();

                }

            }
        );

    }



    /* ESC key closes image */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                galleryLightbox &&
                galleryLightbox.classList.contains(
                    "open"
                )
            ) {

                closeGalleryLightbox();

            }

        }
    );



    function closeGalleryLightbox() {

        if (!galleryLightbox) {
            return;
        }

        galleryLightbox.classList.remove("open");

        document.body.style.overflow = "";

    }
});