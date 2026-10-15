const headerContainer = document.getElementById("header");

function initializeAutocomplete() {


    const availablekeywords = {

        /* ===========================
           Category: Industrial Valves
        ============================ */

        "industrial valves": "/industrial-valves.html",
        "industrial valve manufacturer": "/industrial-valves.html",
        "valve manufacturer in india": "/industrial-valves.html",
        "valve manufacturer in ahmedabad": "/industrial-valves.html",

        /* ===========================
           Category: Ball Valves
        ============================ */

        "ball valves": "/ball-valves.html",
        "ball valve manufacturer": "/ball-valves.html",
        "ball valve supplier india": "/ball-valves.html",
        "flanged ball valve": "/flanged-ball-valve.html",
        "screwed ball valve": "/screwed-ball-valve.html",
        "one piece ball valve": "/one-piece-ball-valve.html",
        "two piece ball valve": "/two-piece-ball-valve.html",
        "three piece ball valve": "/three-piece-ball-valve.html",
        "three way ball valve": "/three-way-ball-valve.html",
        "jacketed ball valve": "/jacketed-ball-valve.html",
        "high pressure ball valve": "/high-pressure-ball-valve.html",
        "ss ball valve": "/stainless-steel-ball-valve.html",
        "carbon steel ball valve": "/carbon-steel-ball-valve.html",

        /* ===========================
           Category: Gate Valves
        ============================ */

        "gate valves": "/gate-valves.html",
        "gate valve manufacturer": "/gate-valves.html",
        "flanged gate valve": "/flanged-gate-valve.html",
        "forged steel gate valve": "/forged-steel-gate-valve.html",
        "cast steel gate valve": "/cast-steel-gate-valve.html",
        "api gate valve": "/api-gate-valve.html",

        /* ===========================
           Category: Globe Valves
        ============================ */

        "globe valves": "/globe-valves.html",
        "globe valve manufacturer": "/globe-valves.html",
        "flanged globe valve": "/flanged-globe-valve.html",
        "forged globe valve": "/forged-globe-valve.html",
        "high pressure globe valve": "/high-pressure-globe-valve.html",

        /* ===========================
           Category: Check Valves
        ============================ */

        "check valves": "/check-valves.html",
        "non return valve": "/check-valves.html",
        "nr valve": "/check-valves.html",
        "swing check valve": "/swing-check-valve.html",
        "lift check valve": "/lift-check-valve.html",
        "dual plate check valve": "/dual-plate-check-valve.html",

        /* ===========================
           Category: Butterfly Valves
        ============================ */

        "butterfly valves": "/butterfly-valves.html",
        "butterfly valve manufacturer": "/butterfly-valves.html",
        "lug type butterfly valve": "/lug-type-butterfly-valve.html",
        "wafer type butterfly valve": "/wafer-type-butterfly-valve.html",
        "double eccentric butterfly valve": "/double-eccentric-butterfly-valve.html",

        /* ===========================
           Category: Safety Valves
        ============================ */

        "safety valves": "/safety-valves.html",
        "pressure safety valve": "/pressure-safety-valve.html",
        "industrial safety valve": "/industrial-safety-valve.html",

        /* ===========================
           Category: Strainers
        ============================ */

        "y strainer": "/y-strainer.html",
        "industrial strainer": "/y-strainer.html",
        "pipeline strainer": "/y-strainer.html",

        /* ===========================
           Category: Actuators & Automation
        ============================ */

        "actuated valves": "/actuated-valves.html",
        "pneumatic actuated valve": "/pneumatic-actuated-valve.html",
        "electric actuated valve": "/electric-actuated-valve.html",
        "valve automation": "/valve-automation.html",

        /* ===========================
           Category: Materials
        ============================ */

        "stainless steel valves": "/stainless-steel-valves.html",
        "carbon steel valves": "/carbon-steel-valves.html",
        "forged steel valves": "/forged-steel-valves.html",

        /* ===========================
           Category: Industries (SEO Boost)
        ============================ */

        "valves for oil and gas": "/industries.html",
        "valves for chemical industry": "/industries.html",
        "valves for water treatment": "/industries.html",
        "valves for power plant": "/industries.html",
        "valves for pharma industry": "/industries.html"

    };

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
        let toast = document.createElement('div');
        toast.classList.add("toast");
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
        const input = inputBox.value.trim();

        if (input.length) {
            const result = Object.keys(availablekeywords).filter((keyword) =>
                keyword.toLowerCase().includes(input.toLowerCase())
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
    const keywordLinks = {
        // Category: Printing Inks
        "printing inks": "../printing_inc.html",
        "flexographic printing ink": "/flexographic-printing-ink.html",
        "gravure printing ink": "/gravure-printing-ink.html",
        "screen printing ink": "/screen-printing-ink.html",
        "offset printing ink": "/offset-printing-ink.html",
        "packaging printing ink": "/packaging-printing-ink.html",
        "lamination ink": "/lamination-ink.html",
        "water based printing ink": "/water-based-printing-ink.html",
        "solvent based printing ink": "/solvent-based-printing-ink.html",
        "surface printing ink": "/surface-printing-ink.html",
        "reverse printing ink": "/reverse-printing-ink.html",

        // Category: Thinners
        "thinners": "../thinners.html",
        "general purpose thinner": "/general-purpose-thinner.html",
        "nc thinner": "/nc-thinner.html",
        "pu thinner": "/pu-thinner.html",
        "flexo ink thinner": "/flexo-ink-thinner.html",
        "gravure ink thinner": "/gravure-ink-thinner.html",
        "fast dry thinner": "/fast-dry-thinner.html",
        "slow dry thinner": "/slow-dry-thinner.html",
        "industrial thinner": "/industrial-thinner.html",

        // Category: Retarders
        "retarders": "../retarders.html",
        "printing ink retarder": "/printing-ink-retarder.html",
        "flexographic retarder": "/flexographic-retarder.html",
        "gravure retarder": "/gravure-retarder.html",
        "screen printing retarder": "/screen-printing-retarder.html",
        "slow evaporation retarder": "/slow-evaporation-retarder.html",
        "anti drying retarder": "/anti-drying-retarder.html",

        // Category: Specialty Products
        "specialty products": "/specialty-products.html",
        "ink additives": "/ink-additives.html",
        "ink reducer": "/ink-reducer.html",
        "printing solvents": "/printing-solvents.html",
        "cleaning solvents": "/cleaning-solvents.html",
        "press wash chemicals": "/press-wash-chemicals.html",
        "printing auxiliary chemicals": "printing-auxiliary-chemicals.html",
        "specialty printing chemicals": "specialty-printing-chemicals.html"
    };

    window.selectKeyword = function (keyword) {
        const key = keyword.toLowerCase();
        const page = keywordLinks[key];
        if (page) window.location.href = page;
    };

    // ⭐ Best match (exact + partial)
    function findBestMatch(input) {
        const lowerInput = input.toLowerCase().trim();

        if (keywordLinks[lowerInput]) {
            return keywordLinks[lowerInput];
        }

        const keys = Object.keys(keywordLinks);
        const match = keys.find((k) => k.includes(lowerInput));

        return match ? keywordLinks[match] : null;
    }

    // ⭐ Redirect on Enter or Search Icon
    function redirectSearch() {
        const value = inputBox.value.trim().toLowerCase();
        if (!value) return showToast('<i class="fa-regular fa-circle-xmark"></i> Please type something.');

        const page = findBestMatch(value);
        if (page) window.location.href = page;
        else showToast('<i class="fa-regular fa-circle-xmark"></i> No results found');
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