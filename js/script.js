// Load Header
function loadHeader() {
    const headerContainer = document.getElementById("header");

    if (!headerContainer) return;

    fetch("header.html")
        .then(response => {
            if (!response.ok) throw new Error('not found');
            return response.text();
        })
        .then(data => {
            headerContainer.innerHTML = data;

            const header = document.querySelector("header .flex");
            const productBtn = document.querySelector('.navbar .product');
            const productToggle = productBtn?.querySelector('.product-toggle');
            const menuBtn = document.querySelector('header .menu');
            const navbar = document.querySelector('header .navbar');
            const searchToggle = document.querySelector('header .search-toggle');
            const searchBox = document.querySelector('header .search-box');
            const childItems = productBtn?.querySelectorAll('.has-child') || [];

            const setProductOpen = (isOpen) => {
                productBtn?.classList.toggle("open", isOpen);
                productToggle?.setAttribute("aria-expanded", String(isOpen));
                if (!isOpen) {
                    childItems.forEach((item) => {
                        item.classList.remove("open");
                        item.querySelector('.child-toggle')?.setAttribute("aria-expanded", "false");
                    });
                }
            };

            const setSearchOpen = (isOpen) => {
                searchBox?.classList.toggle("search-open", isOpen);
                searchToggle?.classList.toggle("active", isOpen);
                searchToggle?.setAttribute("aria-expanded", String(isOpen));
                searchToggle?.setAttribute("aria-label", isOpen ? "Close product search" : "Open product search");

                if (isOpen) {
                    window.setTimeout(() => searchBox?.querySelector('input')?.focus(), 150);
                }
            };


            productToggle?.addEventListener("click", () => {
                setSearchOpen(false);
                setProductOpen(!productBtn.classList.contains("open"));
            });

            searchToggle?.addEventListener("click", () => {
                const isOpen = !searchBox?.classList.contains("search-open");
                navbar?.classList.remove("active");
                menuBtn?.classList.remove("active");
                menuBtn?.setAttribute("aria-expanded", "false");
                setProductOpen(false);
                setSearchOpen(isOpen);
            });

            childItems.forEach((item) => {
                const childToggle = item.querySelector('.child-toggle');
                childToggle?.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const isOpen = !item.classList.contains("open");

                    childItems.forEach((sibling) => {
                        if (sibling !== item) {
                            sibling.classList.remove("open");
                            sibling.querySelector('.child-toggle')?.setAttribute("aria-expanded", "false");
                        }
                    });

                    item.classList.toggle("open", isOpen);
                    childToggle.setAttribute("aria-expanded", String(isOpen));
                });
            });

            if (menuBtn && navbar) {
                menuBtn.addEventListener("click", () => {
                    const isOpen = navbar.classList.toggle("active");
                    setSearchOpen(false);
                    menuBtn.classList.toggle("active", isOpen);
                    menuBtn.setAttribute("aria-expanded", String(isOpen));
                    if (!isOpen) setProductOpen(false);
                });

                navbar.querySelectorAll("a").forEach((link) => {
                    link.addEventListener("click", () => {
                        if (window.innerWidth <= 992) {
                            navbar.classList.remove("active");
                            menuBtn.classList.remove("active");
                            menuBtn.setAttribute("aria-expanded", "false");
                            setProductOpen(false);
                            setSearchOpen(false);
                        }
                    });
                });

                document.addEventListener("click", (event) => {
                    if (window.innerWidth <= 992 && !header?.contains(event.target)) {
                        navbar.classList.remove("active");
                        menuBtn.classList.remove("active");
                        menuBtn.setAttribute("aria-expanded", "false");
                        setProductOpen(false);
                        setSearchOpen(false);
                    }
                });

                window.addEventListener("resize", () => {
                    if (window.innerWidth > 992) {
                        navbar.classList.remove("active");
                        menuBtn.classList.remove("active");
                        menuBtn.setAttribute("aria-expanded", "false");
                        setProductOpen(false);
                        setSearchOpen(false);
                    }
                });

            }


            window.addEventListener("scroll", () => {
                if (window.scrollY > 100) {
                    if (header) header.classList.add('active');
                }

                else if (window.scrollY < 100) {
                    if (header) header.classList.remove('active');
                    if (navbar) navbar.classList.remove("active");
                    if (menuBtn) menuBtn.classList.remove("active");
                    if (productBtn) productBtn.classList.remove("open");
                    setProductOpen(false);
                    setSearchOpen(false);
                }
            });


            if (window.initializeAutocomplete) {
                window.initializeAutocomplete();
            }



        })

        .catch(error => {
            // try parent folder (for pages inside products/)
            fetch("../header.html")
                .then(resp => resp.text())
                .then(data => {
                    headerContainer.innerHTML = data;

                    initializeFallbackHeader(headerContainer);



                    // Initialize autocomplete if available (for product pages)
                    if (window.initializeAutocomplete) {
                        window.initializeAutocomplete();
                    }


                })
                .catch(err => console.error("Header load failed:", err));
        });
}

// Product detail pages load the shared header from their parent directory.
// Bind the same mobile menu controls after that fallback request succeeds.
function initializeFallbackHeader(headerContainer) {
    const header = headerContainer.querySelector("header .flex");
    const navbar = headerContainer.querySelector('.navbar');
    const menuBtn = headerContainer.querySelector('header .menu');
    const searchToggle = headerContainer.querySelector('header .search-toggle');
    const searchBox = headerContainer.querySelector('header .search-box');
    const product = headerContainer.querySelector('.navbar .product');
    const productToggle = product?.querySelector('.product-toggle');
    const childItems = product?.querySelectorAll('.has-child') || [];

    const closeProduct = () => {
        product?.classList.remove('open');
        productToggle?.setAttribute('aria-expanded', 'false');
        childItems.forEach((item) => {
            item.classList.remove('open');
            item.querySelector('.child-toggle')?.setAttribute('aria-expanded', 'false');
        });
    };

    const setSearchOpen = (isOpen) => {
        searchBox?.classList.toggle('search-open', isOpen);
        searchToggle?.classList.toggle('active', isOpen);
        searchToggle?.setAttribute('aria-expanded', String(isOpen));
        searchToggle?.setAttribute('aria-label', isOpen ? 'Close product search' : 'Open product search');
        if (isOpen) window.setTimeout(() => searchBox?.querySelector('input')?.focus(), 150);
    };

    productToggle?.addEventListener('click', () => {
        const isOpen = !product.classList.contains('open');
        setSearchOpen(false);
        closeProduct();
        product.classList.toggle('open', isOpen);
        productToggle.setAttribute('aria-expanded', String(isOpen));
    });

    searchToggle?.addEventListener('click', () => {
        const isOpen = !searchBox?.classList.contains('search-open');
        navbar?.classList.remove('active');
        menuBtn?.classList.remove('active');
        menuBtn?.setAttribute('aria-expanded', 'false');
        closeProduct();
        setSearchOpen(isOpen);
    });

    childItems.forEach((item) => {
        const childToggle = item.querySelector('.child-toggle');
        childToggle?.addEventListener('click', (event) => {
            event.preventDefault();
            const isOpen = !item.classList.contains('open');
            childItems.forEach((sibling) => {
                sibling.classList.remove('open');
                sibling.querySelector('.child-toggle')?.setAttribute('aria-expanded', 'false');
            });
            item.classList.toggle('open', isOpen);
            childToggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    menuBtn?.addEventListener('click', () => {
        const isOpen = navbar?.classList.toggle('active');
        setSearchOpen(false);
        menuBtn.classList.toggle('active', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) closeProduct();
    });

    navbar?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navbar.classList.remove('active');
                menuBtn?.classList.remove('active');
                menuBtn?.setAttribute('aria-expanded', 'false');
                closeProduct();
                setSearchOpen(false);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 992 && !header?.contains(event.target)) {
            navbar?.classList.remove('active');
            menuBtn?.classList.remove('active');
            menuBtn?.setAttribute('aria-expanded', 'false');
            closeProduct();
            setSearchOpen(false);
        }
    });
}

// Load Footer 
function loadFooter() {
    const footer = document.getElementById("footer");


    if (!footer) return;

    fetch("footer.html")
        .then(response => {
            if (!response.ok) throw new Error('not found');
            return response.text();
        })
        .then(data => {
            footer.innerHTML = data;
            initRevealAnimations(footer);

            const arrowAnimation = document.querySelector('.arrow i');
            const arrow = document.querySelector('.arrow');

            if (arrowAnimation) {
                arrowAnimation.addEventListener('mouseenter', () => {
                    arrowAnimation.classList.add('bx-fade-up');
                });

                arrowAnimation.addEventListener('mouseleave', () => {
                    arrowAnimation.classList.remove('bx-fade-up');
                });
            }

            window.addEventListener("scroll", () => {
                if (window.scrollY > 100) {
                    if (arrow) arrow.classList.add('active');
                }
                else if (window.scrollY < 100) {
                    if (arrow) arrow.classList.remove('active');
                }
            });

            if (arrow) {
                arrow.addEventListener("click", (event) => {
                    event.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });
            }

            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();

        })
        .catch(error => {
            // try parent folder (for pages inside products/)
            fetch("../footer.html")
                .then(resp => resp.text())
                .then(data => {
                    footer.innerHTML = data;
                    initRevealAnimations(footer);
                })
                .catch(err => console.error("Footer load failed:", err));
        });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
});

document.addEventListener("DOMContentLoaded", () => {
    try {
        const galleryEl = document.querySelector('.gallery');
        if (galleryEl && typeof lightGallery === 'function') {
            lightGallery(galleryEl, { selector: '.gallery-item' });
        }
    } catch (err) {
        console.warn('LightGallery init failed:', err);
    }
});

const sendBtn = document.querySelector(".formbold-main-wrapper .formbold-form-wrapper form #send");
const question = document.querySelectorAll(".question");

question.forEach((button) => {
    button.addEventListener("click", () => {
        const currentAnswer = button.nextElementSibling;
        const plusIcon = button.querySelector(".plus");


        document.querySelectorAll(".question.active").forEach((btn) => {
            if (btn !== button) {
                btn.classList.remove("active");
            }
        });

        document.querySelectorAll(".answer.active").forEach((answer) => {
            if (answer !== currentAnswer) {
                answer.classList.remove("active");
            }
        });


        button.classList.toggle("active");

        document.querySelectorAll(".plus.active").forEach((icon) => {
            if (icon !== plusIcon) {
                icon.classList.remove("active");
            }
        });

        currentAnswer.classList.toggle("active");
        plusIcon.classList.toggle("active");
    });
});

let product_img = document.querySelector('.product-img img');
let product_thumbnail = document.querySelectorAll('.product-thumbnail');

product_thumbnail.forEach((product) => {
    product.addEventListener('click', () => {
        product_thumbnail.forEach((product) => {
            product.classList.remove('active');
        });
        product.classList.add('active');

        let img = product.querySelector('img').getAttribute('src');
        let index = product.querySelector('img').getAttribute('data-index');

        product_img.setAttribute('src', img);
        product_img.setAttribute('data-index', index);

        product_img.classList.add('product-down-animation');
        setTimeout(() => {
            product_img.classList.remove('product-down-animation');
        }, 500);
    });
});


let revealObserver;

function initRevealAnimations(root = document) {
    const selector = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .mask-reveal, .line-reveal, .clip-reveal, .stagger";

    // Preserve content visibility in browsers without IntersectionObserver support.
    if (!("IntersectionObserver" in window)) {
        root.querySelectorAll(selector).forEach((element) => element.classList.add("active"));
        return;
    }

    if (!revealObserver) {
        revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px",
            }
        );
    }

    const elements = root.querySelectorAll(selector);

    elements.forEach((element) => {
        if (!element.classList.contains("active") && element.dataset.revealObserved !== "true") {
            element.dataset.revealObserved = "true";
            revealObserver.observe(element);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
});



window.addEventListener('load', () => {
    initRevealAnimations();
});


if (sendBtn && sendBtn.dataset.bound !== "true") {


    sendBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const phoneNumber = "919825122447";
        const firstName = document.querySelector("#firstname")?.value || "";
        const lastName = document.querySelector("#lastname")?.value || "";
        const email = document.querySelector("#email")?.value || "";
        const phone = document.querySelector("#phone")?.value || "";
        const sector = document.querySelector("select#sector")?.value || "";
        const cname = document.querySelector("#company")?.value || "";
        const message = document.querySelector("#message")?.value || "";

        if (!firstName || !lastName || !email || !phone || !sector) {
            alert("Please fill all required fields.");
            return;
        }


        const url = "https://wa.me/" + phoneNumber + "?text="
            + "Hello, I would like to contact you: %0a%0a"
            + "*Name:* " + firstName + " " + lastName + "%0a"
            + "*Email:* " + email + "%0a"
            + "*Phone No.:* " + phone + "%0a"
            + "*Sector:* " + sector + "%0a"
            + "*Comany Name:* " + cname + "%0a"
            + "*Message:* " + message + "%0a%0a";

        const popup = window.open(url, "_blank");
        if (popup) {
            popup.focus();
        }
    });

    sendBtn.dataset.bound = "true";
}
