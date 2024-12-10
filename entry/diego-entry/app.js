function adjustOpacityOnScroll() {
    const interviewElement = document.getElementById("interview");
    const spans = [...interviewElement.querySelectorAll("span")];
    const viewportHeight = window.innerHeight;

    spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const spanCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        // Ensure calculation for elements partially visible at the top or bottom
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const distanceFromCenter = Math.abs(spanCenter - viewportCenter);
            const maxDistance = viewportHeight / 2;

            // Smooth opacity adjustment
            const opacity = Math.max(1 - distanceFromCenter / maxDistance, 0.1);
            span.style.opacity = opacity.toFixed(2);
        } else {
            // Ensure elements outside the viewport are dimmed
            span.style.opacity = "0.1";
        }
    });
}

function wrapLinesInSpans() {
    const interviewElement = document.getElementById("interview");
    const paragraphs = [...interviewElement.querySelectorAll("p")];

    paragraphs.forEach((paragraph) => {
        const words = paragraph.textContent.split(" ");
        const wrappedHTML = words
            .map((word) => `<span style="display:inline-block; white-space:nowrap;">${word}</span>`)
            .join(" ");
        paragraph.innerHTML = wrappedHTML;
    });
}

function animateStickySections() {
    const stickySections = [...document.querySelectorAll('section .sticky')];
    const marqueeText = document.querySelector('.marquee-text');

    stickySections.forEach((section, index) => {
        const { top } = section.getBoundingClientRect();
        let transTop = top > 0 ? 0 : Math.abs(top);

        if (transTop >= 1000) transTop = 1000;

        if (top <= 0 && index !== stickySections.length - 1) {
            section.style.filter = `blur(${transTop * 0.05}px)`;
            section.style.transform = `scale3d(${1 + transTop * 0.005}, ${1 + transTop * 0.005}, 1)`;
            section.style.opacity = `${1 - transTop * 0.0015}`;

            if (transTop > 0 && marqueeText) {
                marqueeText.style.filter = `blur(${Math.min(transTop * 0.02, 10)}px)`;
            }
        } else {
            section.style.filter = "blur(0px)";
            section.style.transform = "scale3d(1, 1, 1)";
            section.style.opacity = "1";

            if (marqueeText) {
                marqueeText.style.filter = "blur(0px)";
            }
        }
    });

    requestAnimationFrame(animateStickySections);
}

wrapLinesInSpans();

window.addEventListener("scroll", () => {
    window.requestAnimationFrame(adjustOpacityOnScroll);
});

adjustOpacityOnScroll();
animateStickySections();

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