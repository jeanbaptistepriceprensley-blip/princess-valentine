
/* =========================
TYPEWRITER
========================= */

const text = `Depuis que tu es entrée dans ma vie,
tout semble plus doux.

Chaque instant avec toi est précieux.

Joyeuse Saint-Valentin Lana.
Je t’aime sincèrement.
`;

const el = document.getElementById("typewriter");

function typeWriter() {
    el.innerHTML = "";
    let i = 0;

    function t() {
        if (i < text.length) {
            el.innerHTML += text[i++];
            setTimeout(t, 30);
        }
    }
    t();
}

typeWriter();

/* =========================
MUSIQUE DOUCE
========================= */

const music = new Audio("music.mp3");
music.loop = true;
music.volume = 0.4;

/* =========================
BOUTON → EXPERIENCE
========================= */

const btn = document.getElementById("gameBtn");

btn.innerText = "Ouvre mon cœur ❤️";

btn.onclick = () => {

    // démarre musique au premier clic
    music.play();

    showLetter();
};

/* =========================
LETTRE ROMANTIQUE ANIMÉE
========================= */

const overlay = document.getElementById("letterOverlay");
const letterText = document.getElementById("letterText");
const closeBtn = document.getElementById("closeLetter");

function showLetter() {
    letterText.innerText = `
        Merci d’être cette personne incroyable.
        
        Ta douceur, ton sourire,
        ta présence apaisent mes journées.

        Mon cœur est à toi, Lana.
        Aujourd’hui et toujours ❤️
        `;

    overlay.classList.add("show");
}

closeBtn.onclick = () => {
    overlay.classList.remove("show");
};

/* =========================
 PARTICULES COEURS + PETALES 
 (inchangé mais plus subtil)
 ========================= */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let items = [];

class Particle {
    constructor(type) {
        this.type = type;
        this.x = Math.random() * canvas.width;

        if (type === "heart") {
            this.y = canvas.height + 20;
            this.dy = -0.4;
            this.char = "❤";
        }
        else {
            this.y = -20;
            this.dy = 0.35;
            this.char = "❀";
        }

        this.size = Math.random() * 14 + 10;
        this.alpha = Math.random() * 0.4 + 0.2;

    }

    update() { this.y += this.dy }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.font = this.size + "px serif";
        ctx.fillStyle = "#b30000";
        ctx.fillText(this.char, this.x, this.y);
    }
}

function spawn() {
    if (Math.random() < 0.02) items.push(new Particle("heart"));
    if (Math.random() < 0.02) items.push(new Particle("petal"));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawn();

    items.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.y < -30 || p.y > canvas.height + 30)
            items.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();
