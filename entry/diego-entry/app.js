function adjustOpacityOnScroll() {
    const interviewElement = document.getElementById("interview");
    if (!interviewElement) return;

    const spans = Array.from(interviewElement.querySelectorAll("span"));
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const spanCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(spanCenter - viewportCenter);
            const maxDistance = viewportHeight / 2;
            span.style.opacity = (1 - distanceFromCenter / maxDistance).toFixed(2);
        } else {
            span.style.opacity = "0.1";
        }
    });
}

function wrapLinesInSpans() {
    const interviewElement = document.getElementById("interview");
    if (!interviewElement) return;

    const paragraphs = Array.from(interviewElement.querySelectorAll("p"));

    paragraphs.forEach((paragraph) => {
        const words = paragraph.textContent.split(" ");
        const wrappedHTML = words
            .map((word) => `<span style="display:inline-block; white-space:nowrap;">${word}</span>`)
            .join(" ");
        paragraph.innerHTML = wrappedHTML;
    });
}

let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            adjustOpacityOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

wrapLinesInSpans();
window.addEventListener("scroll", onScroll);
adjustOpacityOnScroll();

let formSubmitted = false;

window.addEventListener("beforeunload", (event) => {
    if (!formSubmitted) {
        event.preventDefault();
        event.returnValue = "";
    }
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    formSubmitted = true;
    alert("Do you actually mean it?");
    form.submit();
});