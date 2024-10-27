const allChars = [
    // logic
    ["¬", "not, ~"],
    ["≡", "equivalent, congruent, ="],
    ["≢", "not equivalent, not congruent, !="],
    ["∧", "and"],
    ["∨", "or"],
    ["⊕", "xor (exclusive or)"],
    ["↑", "nand (not and)"],
    ["↓", "nor (not or)"],
    ["→", "implies"],
    ["←", "is implied by"],
    ["↔", "biconditional (iff, if and only if)"],
    ["⇒", "predicate implies"],
    ["⇐", "predicate is implied by"],
    ["⇔", "predicate biconditional (iff, if and only if)"],
    ["∴", "therefore"],
    ["∵", "because"],
    ["∎", "end of proof, quod erat demonstrandum, QED"],

    // sets
    ["∀", "for all"],
    ["∃", "there exists"],
    ["∄", "there does not exist"],
    ["∈", "element of (belongs to)"],
    ["∉", "not an element of (does not belong to)"],
    ["∩", "intersection"],
    ["∪", "union"],
    ["⊂", "subset of"],
    ["⊆", "subset of or equal to"],
    ["⊄", "not a subset of"],
    ["⊃", "superset of"],
    ["⊇", "superset of or equal to"],
    ["⊅", "not a superset of"],
    ["ℕ", "N (natural set)"],
    ["ℤ", "Z (integer set)"],
    ["ℚ", "Q (rational set)"],
    ["ℝ", "R (real set)"],
    ["ℂ", "C (complex set)"],

    // algebra, math
    ["×", "multiply, product, times, *"],
    ["÷", "divide, /"],
    ["≈", "approximately equal, almost equal, ~"],
    ["≠", "not equal, !="],
    ["≤", "less than or equal, <="],
    ["≥", "greater than or equal, >="],
    ["±", "plus-minus, +-"],
    ["∓", "minus-plus, -+"],
    ["∣", "divides, |"],
    ["∤", "does not divide, !|"],
    ["√", "root2, square root, radical"],
    ["∛", "root3, cube root"],
    ["∜", "root4"],
    ["∂", "partial differential (cursive d)"],
    ["∫", "integral"],
    ["∏", "product (capital pi)"],
    ["∑", "sum (capital sigma)"],
    ["∝", "proportional to"],
    ["∞", "infinity"],

    // superscript, subscript
    ["⁰", "^0, superscript 0, to the zeroth"],
    ["¹", "^1, superscript 1, to the first"],
    ["²", "^2, superscript 2, to the second, squared"],
    ["³", "^3, superscript 3, to the third, cubed"],
    ["⁴", "^4, superscript 4, to the fourth"],
    ["⁵", "^5, superscript 5, to the fifth"],
    ["⁶", "^6, superscript 6, to the sixth"],
    ["⁷", "^7, superscript 7, to the seventh"],
    ["⁸", "^8, superscript 8, to the eighth"],
    ["⁹", "^9, superscript 9, to the ninth"],
    ["ⁿ", "^n, superscript n, to the nth"],
    ["⁺", "^+, superscript plus"],
    ["⁻", "^-, superscript minus"],
    ["₀", "_0, subscript 0, sub-0"],
    ["₁", "_1, subscript 1, sub-1"],
    ["₂", "_2, subscript 2, sub-2"],
    ["₃", "_3, subscript 3, sub-3"],
    ["₄", "_4, subscript 4, sub-4"],
    ["₅", "_5, subscript 5, sub-5"],
    ["₆", "_6, subscript 6, sub-6"],
    ["₇", "_7, subscript 7, sub-7"],
    ["₈", "_8, subscript 8, sub-8"],
    ["₉", "_9, subscript 9, sub-9"],
    ["ₙ", "_n, subscript n, sub-n"],
    ["₊", "_+, subscript plus"],
    ["₋", "_-, subscript minus"],

    // greek
    ["α", "alpha"],
    ["β", "beta"],
    ["γ", "gamma"],
    ["ε", "epsilon"],
    ["η", "eta"],
    ["θ", "theta"],
    ["λ", "lambda"],
    ["μ", "mu"],
    ["ν", "nu"],
    ["ξ", "xi"],
    ["π", "pi"],
    ["ρ", "rho"],
    ["σ", "sigma"],
    ["τ", "tau"],
    ["φ", "phi"],
    ["ω", "omega"],
    ["∆", "delta (capital)"],
    ["Φ", "phi (capital)"],
    ["Ω", "omega (capital), ohm"],

    // misc
    ["–", "en dash, minus, -"],
    ["—", "em dash, -"],
    ["°", "degree"],
    ["µ", "micro (mu)"],
    ["½", "1/2, one-half"],
    ["¼", "1/4, one-quarter"],
    ["¾", "3/4, three-quarters"],
    ["·", "middle dot, dot product, ."],
    ["✓", "yes, check mark"],
    ["✕", "no, cross mark"],

    // other important symbols
    ["♈", "Aries"],
    ["♉", "Taurus"],
    ["♊", "Gemini"],
    ["♋", "Cancer"],
    ["♌", "Leo"],
    ["♍", "Virgo"],
    ["♎", "Libra"],
    ["♏", "Scorpius"],
    ["♐", "Sagittarius"],
    ["♑", "Capricorn"],
    ["♒", "Aquarius"],
    ["♓", "Pisces"],
    ["⛎", "Ophiuchus"],
    ["♀", "Venus, female"],
    ["♂", "Mars, male"],
    ["⛇", "snowman"],
];

const inputEl = document.getElementById("symbol-name")
const copyPopupDiv = document.getElementById("copy-popup");
const filteredListDiv = document.getElementById("filtered-list");

let currentCharactersList = [...allChars];
let selectedIdx = 0;

function showCopyPopup(character) {
    copyPopupDiv.querySelector(".symbol").textContent = character;
    copyPopupDiv.style.animation = "none";
    copyPopupDiv.offsetHeight; // force animation halt
    copyPopupDiv.style.animation = "1s linear 0s 1 normal forwards running popup-fade";
    copyPopupDiv.style.display = "block";
}

// Bring selectedIdx inside array bounds if outside.
function normalizeSelectedIndex() {
    const len = currentCharactersList.length;
    if (len === -1) {
        selectedIdx = 0;
    } else if (selectedIdx < 0) {
        selectedIdx = 0;
    } else if (selectedIdx > len - 1) {
        selectedIdx = len - 1;
    }
}

// If the passed key event is up/down, change selectedIndex.
function moveSelection(e) {
    let moveBy = {
        "ArrowUp": -1,
        "ArrowDown": 1,
        "PageUp": -10,
        "PageDown": 10,
    }[e.key];
    if (moveBy) {
        selectedIdx += moveBy;
        normalizeSelectedIndex();
        updateSelectedDiv();
        e.preventDefault();
    }
}

function filterList(enteredText, ignoreCase) {
    if (enteredText.trim() === "") {
        currentCharactersList = [...allChars];
        normalizeSelectedIndex();
        updateListDiv();
        return;
    }

    let showOnTop = [], theRest = [];
    let exactMatch;
    allChars.forEach((s) => {
        let [symbol, description] = s;
        if (ignoreCase) description = description.toLowerCase();

        if (description.toLowerCase() === enteredText.toLowerCase()) exactMatch = s;
        const include = description.includes(enteredText) || enteredText.includes(symbol);
        if (include) {
            if (description.startsWith(enteredText))
                showOnTop.push(s);
            else
                theRest.push(s);
        }
    });
    if (showOnTop.includes(exactMatch)) {
        showOnTop = [exactMatch, ...showOnTop.filter(s => s !== exactMatch)];
    }
    currentCharactersList = [...showOnTop, ...theRest];

    const noResults = currentCharactersList.length === 0
    if (!ignoreCase && noResults && enteredText.toLowerCase() !== enteredText.toUpperCase()) {
        filterList(enteredText.toLowerCase(), true);
        return;
    }

    normalizeSelectedIndex();
    updateListDiv();
}

function copyCurrentChar() {
    if (currentCharactersList.length === 0) return;
    const c = currentCharactersList[selectedIdx][0];
    navigator.clipboard.writeText(c);
    showCopyPopup(c);
}

function updateListDiv() {
    filteredListDiv.replaceChildren(...currentCharactersList.map(([character, description], i) => {
        const charDiv = document.createElement("div");
        const descDiv = document.createElement("div");
        charDiv.className = "character";
        descDiv.className = "description";
        charDiv.textContent = character;
        descDiv.textContent = description;

        const div = document.createElement("div");
        if (selectedIdx === i) div.className = "selected"
        div.appendChild(charDiv);
        div.appendChild(descDiv);
        return div;
    }));
    if (currentCharactersList.length === 0) {
        filteredListDiv.textContent = "No symbols found";
    }
}

function updateSelectedDiv() {
    const len = filteredListDiv.children.length;
    for (let i = 0; i < len; i++) {
        const n = filteredListDiv.children[i];
        if (i === selectedIdx) {
            n.classList.add("selected");
            n.scrollIntoView({ block: "center", behavior: "smooth" });
        } else if (n.classList.contains("selected")) {
            n.classList.remove("selected");
        }
    };
}

inputEl.addEventListener("keydown", e => {
    moveSelection(e);
    if (e.key === "Enter") {
        copyCurrentChar();
        inputEl.select();
    }
});

inputEl.addEventListener("input", e => {
    filterList(e.target.value);
});

filteredListDiv.addEventListener("click", e => {
    const charDiv = e.target?.closest("#filtered-list>div");
    if (!charDiv) return;
    selectedIdx = [...charDiv.parentElement.children].indexOf(charDiv);
    updateSelectedDiv();
    copyCurrentChar();
});

document.addEventListener("click", () => inputEl.focus());
