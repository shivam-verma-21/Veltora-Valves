const headerContainer = document.getElementById("header");

function initializeAutocomplete() {


    const keywordLinks = {
        // Category pages linked in the existing product menu.
        "automation": "automation.html",
        "ball valves": "ball-valves.html",
        "butterfly valves": "butterfly-valves.html",
        "check valves": "check-valves.html",
        "gate valves": "gate-valves.html",
        "globe valves": "globe-valves.html",
        "safety valves": "safety-valves.html",
        "y-type strainers": "y-type-basket-strainers.html",
        "y-type & basket type strainers": "y-type-basket-strainers.html",
        "glass lined valves": "glass-lined-valves.html",

        // Automation product pages linked in header.html.
        "solenoid control valves": "automation-control-valves-solenoid.html",
        "electric actuated ball valves": "automation-electric-actuated-ball-valve.html",
        "automated gate valves": "automation-actuated-gate-valves.html",
        "pneumatic control valves": "automation-pneumatic-valves.html",

        // Ball valve product pages linked in header.html.
        "1-piece flanged end ball valve": "ball-valve-one-piece.html",
        "one piece ball valve": "ball-valve-one-piece.html",
        "one-piece ball valve": "ball-valve-one-piece.html",
        "2-piece flanged end ball valve": "ball-valve-two-piece.html",
        "two piece ball valve": "ball-valve-two-piece.html",
        "two-piece ball valve": "ball-valve-two-piece.html",
        "3-piece flanged end ball valve": "ball-valve-three-piece.html",
        "three piece ball valve": "ball-valve-three-piece.html",
        "three-piece ball valve": "ball-valve-three-piece.html",
        "1-piece threaded ball valve": "ball-valve-one-piece-threaded.html",
        "one piece threaded ball valve": "ball-valve-one-piece-threaded.html",
        "one-piece threaded ball valve": "ball-valve-one-piece-threaded.html",
        "2-piece threaded ball valve": "ball-valve-two-piece-threaded.html",
        "two piece threaded ball valve": "ball-valve-two-piece-threaded.html",
        "two-piece threaded ball valve": "ball-valve-two-piece-threaded.html",
        "3-piece threaded ball valve": "ball-valve-three-piece-threaded.html",
        "three piece threaded ball valve": "ball-valve-three-piece-threaded.html",
        "three-piece threaded ball valve": "ball-valve-three-piece-threaded.html",
        "3-way ball valve": "ball-valve-three-way-flanged.html",
        "three way ball valve": "ball-valve-three-way-flanged.html",
        "3-piece forged steel full bore ball valve": "ball-valves-forged-steel-full-bore.html",
        "forged steel full bore ball valve": "ball-valves-forged-steel-full-bore.html",

        // Butterfly valve product pages linked in header.html.
        "high performance offset disc butterfly valve": "butterfly-valve-offset-disc.html",
        "wafer butterfly valve": "butterfly-valves-wafer.html",
        "lug style butterfly valve": "butterfly-valves-lug-style.html",
        "double flange butterfly valve": "butterfly-valves-double-flanged.html",
        "ptfe seated butterfly valve": "butterfly-valve-ptfe-seated.html",

        // Check valve product pages linked in header.html.
        "forged steel check valve": "check-valves-forged-steel.html",
        "disc check valve": "check-valves-disc.html",
        "dual plate check valve": "check-valves-dual-plate.html",
        "swing check valve": "check-valves-swing.html",
        "wafer check valve": "check-valves-wafer.html",
        "general purpose check valves": "check-valves-general-purpose.html",

        // Gate valve product pages linked in header.html.
        "stainless steel gate valve": "gate-valves-stainless-steel.html",
        "forged steel gate valve": "gate-valves-forged-steel.html",
        "resilient seated gate valves": "gate-valves-resilient-seated.html",

        // Globe valve product pages linked in header.html.
        "stainless steel globe valve": "globe-valve-stainless-steel.html",
        "stainless steel globe valves": "globe-valve-stainless-steel.html",
        "forged steel globe valve": "globe-valve-forged-steel.html",
        "forged steel globe valves": "globe-valve-forged-steel.html"
    };

    const availablekeywords = Object.keys(keywordLinks);
    const normalizeKeyword = (value) => value.toLowerCase().trim().replace(/\s+/g, " ");

    const resultBox = document.querySelector(".result-box");
    const main = document.querySelector(".main");
    const inputBox = document.getElementById("input-box");
    const searchBox = document.querySelector(".search-box");
    const navbar = document.querySelector(".navbar");
    const translate = document.getElementById("language-switcher");
    let toastActive = false;

    // If essential elements are not present (header not injected yet), bail out.
    if (!resultBox || !inputBox) return;

    function showToast(value) {

        if (toastActive) return;

        toastActive = true;

        let toastBox = document.getElementById("toastBox");
        if (!toastBox) return;

        let toast = document.createElement('div');
        toast.classList.add("toast", "search-feedback");
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.innerHTML = value;
        toastBox.appendChild(toast);

        if (value.includes('something')) toast.classList.add('something');
        if (value.includes('error')) toast.classList.add('error');

        setTimeout(() => {
            toast.remove();
            toastActive = false;
        }, 3000);
    }


    // ⭐ FIXED Display function (only one active)
    function display(result) {
        const content = (result || []).map((list) => {
            return `<li onclick="selectKeyword('${list}')">${list}</li>`;
        }).join("");

        resultBox.innerHTML = "<ul>" + content + "</ul>";
        resultBox.classList.remove("active"); // show dropdown
    }

    // ⭐ Autocomplete typing
    inputBox.onkeyup = function () {
        const input = normalizeKeyword(inputBox.value);

        if (input.length) {
            const result = availablekeywords.filter((keyword) =>
                keyword.includes(input)
            );
            display(result);
        } else {
            resultBox.innerHTML = "";
        }
    };

    // ⭐ Close result on scroll / outside click
    window.addEventListener("scroll", () => {
        resultBox.classList.add("active");
    });
    document.addEventListener("click", () => {
        resultBox.classList.add("active");
    });

    // ========== SEARCH REDIRECT ==========
    window.selectKeyword = function (keyword) {
        const key = normalizeKeyword(keyword);
        const page = keywordLinks[key];
        if (page) window.location.href = page;
    };

    // ⭐ Best match (exact + partial)
    function findBestMatch(input) {
        return keywordLinks[normalizeKeyword(input)] || null;
    }

    // ⭐ Redirect on Enter or Search Icon
    function redirectSearch() {
        const value = normalizeKeyword(inputBox.value);
        if (!value) return showToast('<i class="fa-regular fa-circle-xmark"></i> Please type something.');

        const page = findBestMatch(value);
        if (page) window.location.href = page;
        else showToast('<i class="fa-regular fa-circle-xmark"></i> No matching products found');
    }

    inputBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter") redirectSearch();
    });

    const searchBtn = document.querySelector(".search-btn");
    if (searchBtn) {
        searchBtn.addEventListener("click", redirectSearch);
    }

    if (translate) {
        translate.addEventListener("click", () => {
            resultBox.classList.add("active");
        });
    }

    if (main) {
        main.addEventListener("click", () => {
            resultBox.classList.add("active");
        });
    }


    if (searchBox && navbar) {
        searchBox.onclick = () => {
            navbar.classList.remove('active');
        }
    }

    // Use event delegation for the chat/message button so it works even
    // if the footer (which contains the button) is injected after this script runs.
    document.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('.message-btn');
        if (!btn) return;

        const chat = document.querySelector('.chaticon');
        const hideIcon = document.querySelector('.chat .image span');

        if (chat) chat.classList.toggle('active');
        if (hideIcon) hideIcon.classList.toggle('active');

        btn.classList.toggle('fa-comments');
        btn.classList.toggle('fa-xmark');
    });

    const myNum = document.querySelectorAll('.count');
    // console.log(myNum)
    let speed = 200;

    let started = false;

    function startCounter() {
        myNum.forEach((myCount) => {
            // console.log(myCount.innerText);
            let target_count = myCount.dataset.count;
            let init_count = +myCount.innerText;
            // console.log(target_count);

            let new_increment_num = Math.max(1, Math.floor(target_count / speed));

            const updateNumber = () => {
                init_count += new_increment_num;
                myCount.innerText = init_count;

                if (init_count < target_count) {
                    setTimeout(() => {
                        updateNumber();
                    }, 10);
                }
            }
            updateNumber();
        });
    }
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            startCounter();
            started = true;
        }
    });

    observer.observe(document.querySelector('.counter-sec'));

}

window.initializeAutocomplete = initializeAutocomplete;

// If the header placeholder is not present but the input exists (header inline),
// initialize immediately. Otherwise `script.js` will call `initializeAutocomplete`
// after it injects `header.html` into `#header`.
if (!headerContainer && document.getElementById("input-box")) {
    initializeAutocomplete();
}
