const imageWrapper = document.querySelector('.image__wrapper');
const projectLinks = [...document.querySelectorAll('.project')];

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

let mouseCoords = {
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0
};

let imageWidth = imageWrapper.offsetWidth / 2;
let imageHeight = imageWrapper.offsetHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseCoords.targetX = e.clientX;
    mouseCoords.targetY = e.clientY;
});

window.addEventListener('resize', () => {
    imageWidth = imageWrapper.offsetWidth / 2;
    imageHeight = imageWrapper.offsetHeight / 2;
});

class ImageItem {
    constructor(link, image) {
        this.link = link;
        this.image = image;
        this.pos = 0;
        this.active = false;
        this.appendImage();
        this.addEventListeners();
    }

    appendImage() {
        this.imageEl = document.createElement('img');
        this.imageEl.src = `./images/${this.image}`; 
        this.imageEl.alt = this.image; 
        imageWrapper.appendChild(this.imageEl);
    }

    addEventListeners() {
        this.link.addEventListener('mouseover', () => {
            this.active = true;
            this.imageEl.style.zIndex = 10;
            this.pos = -250;
        });

        this.link.addEventListener('mouseleave', () => {
            this.active = false;
            this.imageEl.style.zIndex = 0;
        });
    }

    animate() {
        if (this.active && this.pos < -125) {
            this.pos += 4;
        }
        if (!this.active && this.pos < 0) {
            this.pos += 4;
        }

        this.imageEl.style.maskImage = `linear-gradient(to top, transparent ${this.pos}%, transparent ${this.pos + 100}%, black ${this.pos + 125}%, black ${this.pos + 225}%, transparent ${this.pos + 250}%, transparent ${this.pos + 350}%)`;
    }
}

let imageItems = [];

projectLinks.forEach(link => {
    let image = link.dataset.image;
    let imageItem = new ImageItem(link, image);
    imageItems.push(imageItem);
});

function animate() {
    mouseCoords.currentX = lerp(mouseCoords.currentX, mouseCoords.targetX, 0.075);
    mouseCoords.currentY = lerp(mouseCoords.currentY, mouseCoords.targetY, 0.075);

    for (let i = 0; i < imageItems.length; i++) {
        imageItems[i].animate();
    }

    imageWrapper.style.transform = `translate3d(${mouseCoords.currentX - imageWidth}px, ${mouseCoords.currentY - imageHeight}px, 0)`;

    requestAnimationFrame(animate);
}

animate();
