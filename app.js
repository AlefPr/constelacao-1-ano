/* ============================================================
 * PARA-SARA · "Documentário do Nosso Amor"
 * Edite o CONFIG abaixo para mudar fotos, datas e frases.
 * ============================================================ */
const CONFIG = {
    dataInicio: new Date("2025-10-23T00:00:00-03:00"),   // início (23/10/2025, horário de Brasília)
    dataAniversario: new Date("2026-10-23T00:00:00-03:00"), // nosso 1 ano
    musica: "img/musica.mp3",                          // música de fundo (mp3)
    marcos: [                                          // capítulos (foto · data · frase · cor)
        { foto: "img/01.jpg", data: "23 / 10 / 2025", frase: "o dia em que tudo começou", cor: "#ff9ecb" },
        { foto: "img/02.jpg", data: "Primeiros dias", frase: "o nosso primeiro sorriso", cor: "#b583ff" },
        { foto: "img/03.jpg", data: "1º mês juntos", frase: "coração acelerado sem motivo", cor: "#ffd166" },
        { foto: "img/04.jpg", data: "Aventuras", frase: "cada segundo com você é o meu lugar favorito", cor: "#7cd3ff" },
        { foto: "img/05.jpg", data: "Te amo, tanto", frase: "você é o meu cantinho de paz", cor: "#f15bb5" },
        { foto: "img/06.jpg", data: "23 / 10 / 2026", frase: "um ano depois, ainda sinto borboletas", cor: "#ffd9ee" }
    ],
    recado: "Sara, meu amor... Você chegou até a nossa estrela mais especial. Que venham muitos capítulos, infinitas constelações e um amor que não cabe no universo. Feliz 1 ano, minha vida.",
    figura: {                        // a nossa constelação: S ♥ A
        tracos: [
            { cor: "#7cd3ff", pontos: [[31, 25], [19, 28], [11, 35], [25, 46], [30, 56], [10, 66]] },              // S
            { cor: "#ff9ecb", fechar: true, pontos: [[47, 43], [53, 48], [59, 43], [64, 54], [53, 73], [42, 54]] }, // coração
            { cor: "#ffd166", pontos: [[70, 70], [79, 34], [88, 70]] },                                             // pernas do A
            { cor: "#ffd166", pontos: [[74, 55], [79, 55], [84, 55]] }                                              // travessão do A
        ]
    },
    posCreditos: {                    // a cena extra que vem depois dos créditos
        titulo: "cena extra",
        texto: "próximo capítulo: 23/10/2027. até lá: mais um ano inteiro de nós — e a lua continuando lá em cima. te amo, Sara. 💛",
        imagem: ""                    // opcional: ex. "img/10.jpg"
    },
    galeria: [
        { foto: "img/01.jpg", legenda: "23 / 10 / 2025 — o dia em que tudo começou" },
        { foto: "img/02.jpg", legenda: "o nosso primeiro sorriso" },
        { foto: "img/03.jpg", legenda: "coração acelerado sem motivo" },
        { foto: "img/04.jpg", legenda: "cada segundo com você é o meu lugar favorito" },
        { foto: "img/05.jpg", legenda: "você é o meu cantinho de paz" },
        { foto: "img/06.jpg", legenda: "23 / 10 / 2026 — um ano depois, ainda sinto borboletas" },
        { foto: "img/07.jpg", legenda: "deixa eu guardar esse segundo pra sempre" },
        { foto: "img/08.jpg", legenda: "você e eu, besteira de amor" },
        { foto: "img/09.jpg", legenda: "é sempre o nosso tempo" },
        { foto: "img/10.jpg", legenda: "mais um capítulo nosso" }
    ]
};

/* ------------------------------------------------------------
 * utilidades
 * ------------------------------------------------------------ */
const $ = (sel, pai) => (pai || document).querySelector(sel);
const clampa = (v, a, b) => Math.min(b, Math.max(a, v));

function vibra(ms) {
    try { if (navigator.vibrate) navigator.vibrate(ms || 30); } catch (e) { /* noop */ }
}

const deuErro = (() => {
    try { return !("IntersectionObserver" in window); } catch (e) { return true; }
})();

/* ------------------------------------------------------------
 * 1 · contador (dias convividos)
 * ------------------------------------------------------------ */
const elDias = $("#ct-dias"), elHoras = $("#ct-horas"), elMin = $("#ct-min"), elSeg = $("#ct-seg");

function atualizaContador() {
    let diff = Math.max(0, Date.now() - CONFIG.dataInicio.getTime());
    const dias = Math.floor(diff / 864e5);
    diff -= dias * 864e5;
    const horas = Math.floor(diff / 36e5);
    diff -= horas * 36e5;
    const min = Math.floor(diff / 6e4);
    const seg = Math.floor((diff - min * 6e4) / 1e3);
    elDias.textContent = dias;
    elHoras.textContent = horas;
    elMin.textContent = min;
    elSeg.textContent = seg;
}
setInterval(atualizaContador, 1000);
atualizaContador();

/* ------------------------------------------------------------
 * 1.1 · contagem para o primeiro ano
 * ------------------------------------------------------------ */
const elContagem = $("#contagem-regressiva");
let celebrouAniversario = false;

function atualizaContagem() {
    if (!elContagem) return;
    const agora = Date.now();
    const alvo = CONFIG.dataAniversario.getTime();
    const diff = alvo - agora;

    if (diff > 0) {
        const dias = Math.floor(diff / 864e5);
        const horas = Math.floor((diff % 864e5) / 36e5);
        const min = Math.floor((diff % 36e5) / 6e4);
        const seg = Math.floor((diff % 6e4) / 1e3);

        if (dias > 0) {
            elContagem.textContent = "faltam " + dias + (dias === 1 ? " dia" : " dias") + " e " + horas + "h para o nosso 1 ano";
        } else if (horas > 0) {
            elContagem.textContent = "faltam " + horas + "h " + String(min).padStart(2, "0") + "min para o nosso 1 ano";
        } else if (min > 0) {
            elContagem.textContent = "faltam " + min + "min " + String(seg).padStart(2, "0") + "s para o nosso 1 ano";
        } else {
            elContagem.textContent = "faltam " + seg + "s para o nosso 1 ano";
        }
        return;
    }

    const passados = Math.floor((agora - alvo) / 864e5);
    elContagem.textContent = passados === 0
        ? "hoje é o nosso 1 ano ❤"
        : "1 ano e " + passados + (passados === 1 ? " dia" : " dias") + " de nós";

    if (!celebrouAniversario) {
        celebrouAniversario = true;
        setTimeout(() => { if (typeof showFogos === "function") showFogos(6); }, 700);
    }
}
setInterval(atualizaContagem, 1000);
atualizaContagem();

/* setas de navegação */
const setaHero = $("#seta-hero"), setaCaps = $("#seta-capitulos");
if (setaHero) setaHero.addEventListener("click", () => { const t = $("#titulo-gigante"); if (t) t.scrollIntoView({ behavior: "smooth" }); });
if (setaCaps) setaCaps.addEventListener("click", () => { const t = $("#capitulos"); if (t) t.scrollIntoView({ behavior: "smooth" }); });

/* ------------------------------------------------------------
 * 2 · corações flutuando
 * ------------------------------------------------------------ */
const EMOJIS_CORACAO = ["&#10084;", "&#128149;", "&#128150;", "&#128151;"];
function criaCoracao() {
    const el = document.createElement("span");
    el.className = "coracao";
    el.innerHTML = EMOJIS_CORACAO[Math.floor(Math.random() * EMOJIS_CORACAO.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (0.8 + Math.random() * 1.2) + "rem";
    el.style.animationDuration = (9 + Math.random() * 7) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 16000);
}
function ligaCoracoes(velocidade) {
    setInterval(criaCoracao, velocidade);
}

/* ------------------------------------------------------------
 * 3 · música
 * ------------------------------------------------------------ */
let tocando = false;
let audio = null;
function criarAudio() {
    try {
        audio = new Audio(CONFIG.musica);
        audio.loop = true;
        audio.preload = "none";
        audio.volume = 0.85;
        audio.addEventListener("play", () => { tocando = true; document.body.classList.add("tocando"); });
        audio.addEventListener("pause", () => { tocando = false; document.body.classList.remove("tocando"); });
    } catch (e) { audio = null; }
}
function alternarMusica() {
    if (!audio) criarAudio();
    if (!audio) return;
    if (tocando) { audio.pause(); } else { const prom = audio.play(); if (prom && prom.catch) prom.catch(() => { /* autoplay bloqueado */ }); }
}

function subirTrilha() {
    if (!audio) criarAudio();
    if (!audio || !audio.play) return;
    if (tocando) return;
    try { audio.currentTime = 0; } catch (e) { /* ignore */ }
    audio.loop = true;
    const prom = audio.play();
    if (prom && prom.catch) prom.catch(() => { /* autoplay pode falhar */ });
    let t0 = null;
    const ramp = t => {
        if (t0 === null) { t0 = t; audio.volume = 0; }
        const p = clampa((t - t0) / 1800, 0, 1);
        try { audio.volume = 0.9 * p; } catch (e) { /* ignore */ }
        if (p < 1) requestAnimationFrame(ramp);
    };
    requestAnimationFrame(ramp);
}
criarAudio();
if ($("#btn-musica")) $("#btn-musica").addEventListener("click", alternarMusica);

let tentouAutoplay = false;
function tentarIniciarMusica() {
    if (tentouAutoplay || tocando || !audio || !audio.play) return;
    tentouAutoplay = true;
    const prom = audio.play();
    if (prom && prom.catch) prom.catch(() => {
        if (!tentouAutoplayParado) { tentouAutoplayParado = true; }
    });
}
let tentouAutoplayParado = false;
window.addEventListener("pointerdown", tentarIniciarMusica, { passive: true, once: true });
window.addEventListener("keydown", tentarIniciarMusica, { once: true });

/* ------------------------------------------------------------
 * 4 · capítulos (gerados a partir do CONFIG)
 * ------------------------------------------------------------ */
const containerCapitulos = $("#capitulos");

function passo(num) { return String(num).padStart(2, "0"); }

CONFIG.marcos.forEach((marco, i) => {
    const cap = document.createElement("article");
    cap.className = "capitulo";
    cap.dataset.cap = i;
    cap.style.setProperty("--cap-cor", marco.cor || "#ff9ecb");
    cap.innerHTML =
        '<div class="cap-kicker mask-ui"><span>&#10022;</span> cap&iacute;tulo ' + passo(i + 1) + "</div>" +
        '<h3 class="data-gigante mask-ui">' + marco.data + "</h3>" +
        '<div class="cap-foto mask-ui"><img src="' + marco.foto + '" alt="Foto do nosso capítulo ' + (i + 1) + '" loading="lazy"></div>' +
        '<p class="frase-reveal mask-ui">' + marco.frase + "</p>";
    containerCapitulos.appendChild(cap);
});

/* separa cada caractere da data gigante em spans animáveis */
/* datas (dígitos + barras) ficam num único span inquebrável — nunca quebra "2025" */
function divideChars(el) {
    const txt = el.textContent;
    el.textContent = "";
    const runs = txt.match(/[0-9/]+|[^0-9/]+/g) || [txt];
    const spans = [];
    runs.forEach(run => {
        if (/[0-9/]/.test(run)) {
            const s = document.createElement("span");
            s.className = "mc";
            s.textContent = run;
            spans.push(s);
            el.appendChild(s);
        } else {
            [...run].forEach(ch => {
                const s = document.createElement("span");
                s.className = "mc";
                s.textContent = ch === " " ? "\u00A0" : ch;
                spans.push(s);
                el.appendChild(s);
            });
        }
    });
    spans.forEach((s, i) => { s.style.transitionDelay = (i * 0.045 * 0.5) + "s"; });
}

/* separa a frase em palavras animáveis */
function dividePalavras(el) {
    const txt = el.textContent;
    el.textContent = "";
    txt.split(" ").forEach((pal, i) => {
        const s = document.createElement("span");
        s.className = "wc";
        s.textContent = pal;
        el.appendChild(s);
        if (i < txt.split(" ").length - 1) el.appendChild(document.createTextNode(" "));
    });
    [...el.children].forEach((s, i) => { if (s.className === "wc") s.style.transitionDelay = (i * 0.06) + "s"; });
}

document.querySelectorAll(".data-gigante").forEach(divideChars);
document.querySelectorAll(".frase-reveal").forEach(dividePalavras);

/* ------------------------------------------------------------
 * 5 · revelação ao entrar na tela
 * ------------------------------------------------------------ */
const obsRevela = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("on");
            obsRevela.unobserve(e.target);
        }
    });
}, { rootMargin: "0px 0px -12% 0px", threshold: 0.04 });

document.querySelectorAll(".mask-ui").forEach(el => obsRevela.observe(el));

/* parallax suave das fotos + fade do hero (opcional, via GSAP) */
if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".cap-foto img").forEach(img => {
        gsap.fromTo(img,
            { yPercent: -8 },
            { yPercent: 8, ease: "none", scrollTrigger: { trigger: img.closest(".capitulo"), start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.fromTo(".hero-inner",
        { y: 0, opacity: 1 },
        { y: -70, opacity: 0.12, ease: "none", scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: true } });
}

/* cor por capítulo (brilho de fundo) */
const obsCor = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.body.dataset.cap = String(e.target.dataset.cap);
        }
    });
}, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

document.querySelectorAll(".capitulo").forEach(el => obsCor.observe(el));

if (deuErro) {
    document.querySelectorAll(".mask-ui").forEach(el => el.classList.add("on"));
}

/* ------------------------------------------------------------
 * 6 · constelação (integrada ao scroll): ah, e as estrelas tocáveis
 * ------------------------------------------------------------ */
const canvas = document.getElementById("tela-constelacao");
const ctx = canvas && canvas.getContext("2d");

/* ------------------------------------------------------------
 * a figura da constelação: S  ♥  A
 * cada capítulo acende um pedaço da figura
 * ------------------------------------------------------------ */
const nCapitulos = CONFIG.marcos.length;
const PONTOS = [];
CONFIG.figura.tracos.forEach(t => {
    t.indices = t.pontos.map(p => {
        const idx = PONTOS.length;
        PONTOS.push({ x: p[0], y: p[1], cor: t.cor, acessa: false, px: 0, py: 0 });
        return idx;
    });
});
const nPontos = PONTOS.length;
let estrelasAcesas = 0;
const capitulosAcesos = new Set();
let estrelasFundo = [];
let largura = 0, altura = 0;

document.getElementById("total-estrelas").textContent = nPontos;

function pontosDoCapitulo(i) {
    const ini = Math.floor(i * nPontos / nCapitulos);
    const fim = Math.floor((i + 1) * nPontos / nCapitulos);
    return PONTOS.slice(ini, fim);
}

function redimensionar() {
    if (!canvas || !ctx) return;
    const pai = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    largura = pai.clientWidth;
    altura = pai.clientHeight;
    if (largura <= 0 || altura <= 0) return;
    canvas.width = Math.round(largura * dpr);
    canvas.height = Math.round(altura * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const base = Math.min(largura, altura) * 0.84;
    const cx = largura / 2, cy = altura / 2 - 10;
    const K = base / 100;
    PONTOS.forEach(p => {
        p.px = cx + (p.x - 50) * K;
        p.py = cy + (p.y - 50) * K;
    });

    const tintas = ["#ffffff", "#ffd9ee", "#cbb0ff"];
    estrelasFundo = Array.from({ length: 96 }, (_, i) => ({
        x: (i * 137.5 + ((i * 173) % 100) * 7.3) % largura,
        y: (i * 89.3 + Math.sin(i) * 26 + 180) % altura,
        r: 0.6 + (i % 3) * 0.45,
        tinta: tintas[i % 3],
        vel: 0.6 + (i % 7) * 0.35,
        fase: (i * 1.7) % (Math.PI * 2)
    }));
}

function desenhaNebulosa(t) {
    if (!ctx) return;
    const raio = Math.max(largura, altura) * 0.62;
    const trios = [
        [largura * (0.28 + 0.05 * Math.sin(t / 9000)), altura * (0.22 + 0.06 * Math.cos(t / 11000)), "rgba(255,158,203,0.07)", raio * 0.55],
        [largura * (0.76 + 0.04 * Math.cos(t / 12000)), altura * (0.60 + 0.05 * Math.sin(t / 13000 + 2)), "rgba(181,131,255,0.09)", raio * 0.7],
        [largura * (0.44 + 0.07 * Math.cos(t / 15000)), altura * (0.86 + 0.04 * Math.sin(t / 10000 + 4)), "rgba(255,209,102,0.05)", raio * 0.5]
    ];
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    trios.forEach(([x, y, cor, rr]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, rr);
        g.addColorStop(0, cor);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, largura, altura);
    });
    ctx.restore();
}

/* ------------------------------------------------------------
 * desenho da figura (S ♥ A): contorno discreto + trechos acesos
 * ------------------------------------------------------------ */
function desenhaFigura(brilho) {
    if (!ctx) return;
    CONFIG.figura.tracos.forEach(t => {
        /* linha completa, bem discreta */
        ctx.beginPath();
        t.indices.forEach((idx, i) => {
            const p = PONTOS[idx];
            i === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py);
        });
        if (t.fechar) ctx.closePath();
        ctx.setLineDash([3, 7]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = brilho ? "rgba(255,209,102,.28)" : "rgba(255,255,255,.13)";
        ctx.stroke();
        ctx.setLineDash([]);

        /* trechos já acesos, na cor da letra */
        for (let i = 0; i < t.indices.length - 1; i++) {
            const a = PONTOS[t.indices[i]], b = PONTOS[t.indices[i + 1]];
            if (!a.acessa || !b.acessa) continue;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.lineCap = "round";
            ctx.lineWidth = brilho ? 2.8 : 2;
            ctx.strokeStyle = brilho ? "rgba(255,209,102,.95)" : t.cor;
            ctx.shadowBlur = brilho ? 24 : 10;
            ctx.shadowColor = brilho ? "rgba(255,209,102,.85)" : t.cor;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    });
}

function desenha() {
    if (!ctx) return;
    ctx.clearRect(0, 0, largura, altura);
    const t = Date.now();

    desenhaNebulosa(t);

    estrelasFundo.forEach(s => {
        ctx.globalAlpha = 0.14 + 0.22 * (0.5 + 0.5 * Math.sin(t / (900 * s.vel) + s.fase));
        ctx.fillStyle = s.tinta;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    const completo = estrelasAcesas >= nPontos;

    ctx.save();
    if (completo) {
        const cx0 = largura / 2, cy0 = altura / 2 - 10;
        const pulso = 1 + 0.02 * Math.sin(t / 650);
        ctx.translate(cx0, cy0);
        ctx.scale(pulso, pulso);
        ctx.translate(-cx0, -cy0);
    }
    desenhaFigura(completo);
    ctx.restore();

    PONTOS.forEach((s, i) => {
        if (!s.acessa) return;
        const base = Math.min(largura, altura) * 0.016;
        const raio = base * (1 + 0.22 * Math.sin(t / 650 + i));

        ctx.globalAlpha = 0.28;
        ctx.fillStyle = s.cor;
        ctx.beginPath();
        ctx.arc(s.px, s.py, raio * 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.shadowBlur = 22;
        ctx.shadowColor = s.cor;
        ctx.fillStyle = s.cor;
        ctx.beginPath();
        ctx.arc(s.px, s.py, raio, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(255,255,255,.9)";
        ctx.beginPath();
        ctx.arc(s.px, s.py, raio * 0.42, 0, Math.PI * 2);
        ctx.fill();
    });
}

function acenderEstrela(i) {
    if (i >= nCapitulos || capitulosAcesos.has(i)) return;
    capitulosAcesos.add(i);
    pontosDoCapitulo(i).forEach((p, k) => {
        p.acessa = true;
        estrelasAcesas++;
        setTimeout(() => criarCadentePara(p.px, p.py, p.cor), k * 150);
    });
    document.getElementById("qtd-estrelas").textContent = estrelasAcesas;
    vibra(25);
    if (estrelasAcesas >= nPontos) completarConstelacao();
    desenha();
}

function criarCadentePara(x, y, cor) {
    if (!canvas || largura <= 0 || altura <= 0) return;
    const sx = clampa(x - largura * 0.42, 8, x);
    const sy = clampa(y - altura * 0.34, 8, y);
    const el = document.createElement("span");
    el.className = "estrela-cadente cad-alvo";
    el.style.left = sx + "px";
    el.style.top = sy + "px";
    el.style.setProperty("--dx", (x - sx) + "px");
    el.style.setProperty("--dy", (y - sy) + "px");
    el.style.background = "radial-gradient(circle, #fff 0%, " + (cor || "#ffd166") + " 55%, transparent 75%)";
    el.style.boxShadow = "0 0 16px 5px " + (cor || "#ffd166") + "88";
    const c = document.querySelector(".constelacao-canvas") || document.body;
    c.appendChild(el);
    setTimeout(() => el.remove(), 1150);
}

function completarConstelacao() {
    $("#constelacao-frase").classList.add("on");
    chuvaCoracoes();
    showFogos(7);
}

let chuvaFeita = false;
function chuvaCoracoes() {
    if (chuvaFeita) return;
    chuvaFeita = true;
    const host = document.querySelector(".constelacao-canvas");
    if (!host) return;
    const cores = ["var(--rosa)", "var(--dourado)", "var(--violeta)"];
    for (let i = 0; i < 22; i++) {
        const el = document.createElement("span");
        el.className = "coracao-caindo";
        el.textContent = "\u2665";
        el.style.left = (Math.random() * 96 + 1) + "%";
        el.style.color = cores[i % 3];
        el.style.textShadow = "0 0 16px " + cores[i % 3];
        el.style.setProperty("--dur", (2.6 + Math.random() * 1.6) + "s");
        el.style.setProperty("--atraso", (Math.random() * 1.6) + "s");
        el.style.setProperty("--rot", (140 + Math.random() * 220) + "deg");
        host.appendChild(el);
        (function (node) { setTimeout(function () { node.remove(); }, 5600); })(el);
    }
}

function aplicarProgresso(p) {
    p = clampa(p, 0, 1);
    const alvo = Math.round(p * nCapitulos);
    for (let k = 0; k < alvo; k++) acenderEstrela(k);
}

function progressoConstelacao() {
    const runner = document.querySelector(".constelacao-runner");
    if (!runner) return;
    const fr = runner.getBoundingClientRect();
    if (fr.height <= 0) return;
    const p = (0 - fr.top) / (fr.height - window.innerHeight);
    aplicarProgresso(p);
}

let rafScroll = false;
window.addEventListener("scroll", () => {
    if (rafScroll) return;
    rafScroll = true;
    requestAnimationFrame(() => { rafScroll = false; progressoConstelacao(); });
}, { passive: true });

window.addEventListener("resize", () => { redimensionar(); desenha(); progressoConstelacao(); });

let rafAnim = 0;
function loop() {
    if (document.hidden) { rafAnim = requestAnimationFrame(loop); return; }
    desenha();
    rafAnim = requestAnimationFrame(loop);
}

if (canvas) {
    redimensionar();
    loop();
    progressoConstelacao();

    window.addEventListener("pointerdown", aoTocar, { passive: true });
}

/* céu sutil no hero */
(function heroCeu() {
    const hc = document.getElementById("hero-ceu");
    if (!hc || !hc.getContext) return;
    const hx = hc.getContext("2d");
    let hw = 0, hh = 0;
    function redim() {
        if (hc.clientWidth <= 0) return;
        hw = hc.clientWidth; hh = hc.clientHeight;
        const d = Math.min(window.devicePixelRatio || 1, 2);
        hc.width = Math.round(hw * d);
        hc.height = Math.round(hh * d);
        hx.setTransform(d, 0, 0, d, 0, 0);
    }
    redim();
    window.addEventListener("resize", redim);
    const hstars = Array.from({ length: 26 }, (_, i) => ({
        x: ((i * 173.3) % 113) / 113,
        y: ((i * 61.7 + 13) % 97) / 97,
        r: 0.55 + (i % 3) * 0.5,
        tinta: ["#ffffff", "#ffd9ee", "#cbb0ff"][i % 3],
        vel: 0.7 + (i % 6) * 0.4,
        fase: (i * 2.1) % (Math.PI * 2)
    }));
    let visivel = true;
    try {
        const io = new IntersectionObserver(lista => {
            visivel = lista[0].isIntersecting;
        }, { threshold: 0 });
        io.observe(hc);
    } catch (e) { /* noop */ }
    function pinta() {
        if (!visivel) { requestAnimationFrame(pinta); return; }
        hx.clearRect(0, 0, hw, hh);
        const t = Date.now();
        hstars.forEach(s => {
            hx.globalAlpha = 0.10 + 0.28 * (0.5 + 0.5 * Math.sin(t / (850 * s.vel) + s.fase));
            hx.fillStyle = s.tinta;
            hx.beginPath();
            hx.arc(s.x * hw, s.y * hh, s.r, 0, Math.PI * 2);
            hx.fill();
        });
        hx.globalAlpha = 1;
        requestAnimationFrame(pinta);
    }
    requestAnimationFrame(pinta);
})();

function aoTocar(ev) {
    const alvo = ev.target && ev.target.closest ? ev.target.closest("button") : null;
    if (alvo) return;
    if (ev.target && (ev.target.closest(".cap-foto") || ev.target.closest(".constelacao-canvas"))) return;
    criarEstrelaCadente(ev.clientX, ev.clientY);
    for (let i = 0; i < 7; i++) criarFaisca(ev.clientX, ev.clientY);
    vibra(15);
}

function criarEstrelaCadente(x, y) {
    const el = document.createElement("span");
    el.className = "estrela-cadente";
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function criarFaisca(x, y) {
    const el = document.createElement("span");
    el.className = "faisca";
    const ang = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 45;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.setProperty("--fx", Math.cos(ang) * dist + "px");
    el.style.setProperty("--fy", Math.sin(ang) * dist + "px");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

/* rastro no dedo */
let ultRastro = { x: 0, y: 0 };
function rastroEm(x, y, grande) {
    const el = document.createElement("span");
    el.className = "rastro" + (grande ? "" : " mini");
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
}
window.addEventListener("pointermove", ev => {
    const dx = ev.clientX - ultRastro.x, dy = ev.clientY - ultRastro.y;
    if (Math.hypot(dx, dy) > 24) {
        rastroEm(ev.clientX, ev.clientY, ev.pointerType === "touch");
        ultRastro = { x: ev.clientX, y: ev.clientY };
    }
}, { passive: true });
window.addEventListener("pointerdown", ev => { ultRastro = { x: ev.clientX, y: ev.clientY }; rastroEm(ev.clientX, ev.clientY, ev.pointerType === "touch"); }, { passive: true });

/* ------------------------------------------------------------
 * 6.5 · a lua da nossa noite (calculada offline, sem API)
 * ------------------------------------------------------------ */
const SINO = 29.530588853;                                 // duração do ciclo sinódico (dias)
const LUA_NOVA_REF = Date.UTC(2000, 0, 6, 18, 14, 0);     // 6/jan/2000 18:14 UTC

function faseLua(data) {
    const dias = (data.getTime() - LUA_NOVA_REF) / 864e5;
    const idade = ((dias % SINO) + SINO) % SINO;           // 0 = lua nova
    const fase = idade / SINO;                             // 0..1
    const luz = (1 - Math.cos(2 * Math.PI * fase)) / 2;    // 0..1 iluminada
    return { fase, luz, idade };
}

function nomeFase(f) {
    if (f < 0.03 || f > 0.97) return "lua nova";
    if (f < 0.22) return "lua crescente";
    if (f < 0.28) return "quarto crescente";
    if (f < 0.47) return "gibosa crescente";
    if (f < 0.53) return "lua cheia";
    if (f < 0.72) return "gibosa minguante";
    if (f < 0.78) return "quarto minguante";
    return "lua minguante";
}

function notaLua(f, luz) {
    if (luz < 0.08) return "a lua estava quase nova: um fio de luz no escuro. começou assim — com tudo por fazer.";
    if (f < 0.5) return "a lua estava crescendo: um pedaço de céu já prometendo o resto.";
    if (f < 0.55) return "a lua estava cheia: noite de luz pra gente. que sorte mais bonita a nossa.";
    return "a lua estava minguante: cheio de vontade, tempo de guardar. igual a gente naquele dia.";
}

function desenhaLua(cnv, fase, luz) {
    if (!cnv) return;
    const c = cnv.getContext("2d");
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cnv.clientWidth || 210, h = cnv.clientHeight || 210;
    cnv.width = Math.round(w * dpr);
    cnv.height = Math.round(h * dpr);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) * 0.40;

    /* halo (círculo que cabe dentro do canvas — nada de quadrado) */
    const halo = c.createRadialGradient(cx, cy, r * 0.45, cx, cy, r * 1.05);
    halo.addColorStop(0, "rgba(255,240,210,.22)");
    halo.addColorStop(1, "rgba(255,240,210,0)");
    c.fillStyle = halo;
    c.beginPath();
    c.arc(cx, cy, r * 1.05, 0, Math.PI * 2);
    c.fill();

    /* disco (parte escura) */
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.fillStyle = "rgba(255,255,255,.04)";
    c.fill();
    c.strokeStyle = "rgba(255,255,255,.10)";
    c.lineWidth = 1;
    c.stroke();

    /* parte iluminada */
    const k = Math.cos(2 * Math.PI * fase);
    const rx = Math.abs(r * k);
    const anti = k > 0;              // lua fina: o terminador incha pro lado iluminado
    c.save();
    c.beginPath();
    if (fase < 0.5) {
        c.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false);
        c.ellipse(cx, cy, rx, r, 0, Math.PI / 2, -Math.PI / 2, anti);
    } else {
        c.arc(cx, cy, r, Math.PI / 2, -Math.PI / 2, false);
        c.ellipse(cx, cy, rx, r, 0, -Math.PI / 2, Math.PI / 2, anti);
    }
    c.closePath();
    const g = c.createRadialGradient(cx - r * .25, cy - r * .3, r * .1, cx, cy, r);
    g.addColorStop(0, "#fffaf1");
    g.addColorStop(1, "#f0d3a6");
    c.shadowBlur = 22;                       /* brilho do pedaço iluminado */
    c.shadowColor = "rgba(255,236,190,.75)";
    c.fillStyle = g;
    c.fill();
    c.shadowBlur = 0;

    /* crateras */
    c.clip();
    [[-.28, -.12, .18], [.16, .22, .12], [-.05, .45, .09], [.3, -.3, .08], [-.4, .3, .1]].forEach(d => {
        c.beginPath();
        c.arc(cx + d[0] * r, cy + d[1] * r, d[2] * r, 0, Math.PI * 2);
        c.fillStyle = "rgba(180,150,110,.20)";
        c.fill();
    });
    c.restore();
}

(function montaLua() {
    const cnv = document.getElementById("canvas-lua");
    if (!cnv) return;
    const info = faseLua(CONFIG.dataInicio);
    const elFase = document.getElementById("lua-fase");
    const elLuz = document.getElementById("lua-luz");
    const elNota = document.getElementById("lua-nota");
    if (elFase) elFase.textContent = nomeFase(info.fase);
    if (elLuz) elLuz.textContent = Math.round(info.luz * 100) + "%";
    if (elNota) elNota.textContent = notaLua(info.fase, info.luz);
    const pinta = () => desenhaLua(cnv, info.fase, info.luz);
    pinta();
    window.addEventListener("load", pinta);
    window.addEventListener("resize", pinta);
    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver(l => { if (l[0].isIntersecting) pinta(); }, { threshold: 0.05 });
        obs.observe(cnv);
    }
})();

/* ------------------------------------------------------------
 * 7 · números que contam (calculados a partir da data de início)
 * ------------------------------------------------------------ */
const statsContados = new Set();
const UNIDADES = { dias: 864e5, horas: 36e5, minutos: 6e4 };

function valorUnidade(unidade) {
    const diff = Math.max(0, Date.now() - CONFIG.dataInicio.getTime());
    return Math.floor(diff / (UNIDADES[unidade] || 1));
}

function checaNumeros() {
    document.querySelectorAll(".stat-val[data-unidade]").forEach(s => {
        if (statsContados.has(s)) return;
        const r = s.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.88) {
            statsContados.add(s);
            contar(s, valorUnidade(s.dataset.unidade));
        }
    });
}
function contar(el, alvo) {
    const t0 = performance.now(), dur = 1900;
    function passo(ag) {
        const p = clampa((ag - t0) / dur, 0, 1);
        const facil = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(alvo * facil).toLocaleString("pt-BR");
        if (p < 1) {
            requestAnimationFrame(passo);
        } else {
            el.dataset.contado = "1";
            el.textContent = valorUnidade(el.dataset.unidade).toLocaleString("pt-BR");
        }
    }
    requestAnimationFrame(passo);
}
function atualizaStatsAoVivo() {
    document.querySelectorAll(".stat-val[data-contado='1']").forEach(el => {
        el.textContent = valorUnidade(el.dataset.unidade).toLocaleString("pt-BR");
    });
}
window.addEventListener("scroll", checaNumeros, { passive: true });
setInterval(atualizaStatsAoVivo, 1000);
checaNumeros();

/* ------------------------------------------------------------
 * 8 · marquee infinito
 * ------------------------------------------------------------ */
(function preencheMarquee() {
    const itens = [
        ["s\u00F3 n\u00F3s dois", true],
        ["te amo", false],
        ["nossa hist\u00F3ria", false],
        ["at\u00E9 o infinito", true],
        ["pra sempre, com voc\u00EA", false],
        ["s\u00F3 o come\u00E7o", true],
        ["nossos cap\u00EDtulos", false],
        ["mais uma estrela", false]
    ];
    let seq = "";
    for (let r = 0; r < 2; r++) itens.forEach(f => {
        seq += '<span class="mq-item' + (f[1] ? " acento" : "") + '">' + f[0] + ' <span class="mq-est">&#10022;</span></span>';
    });
    $("#mq-1").innerHTML = seq + seq;
    $("#mq-2").innerHTML = seq + seq;
})();

/* ------------------------------------------------------------
 * 8.1 · te amo pelo mundo (roleta de línguas)
 * ------------------------------------------------------------ */
const LINGUAS = [
    ["italiano", "ti amo", "\uD83C\uDDEE\uD83C\uDDF9"],
    ["franc\u00EAs", "je t'aime", "\uD83C\uDDEB\uD83C\uDDF7"],
    ["espanhol", "te quiero", "\uD83C\uDDEA\uD83C\uDDF8"],
    ["alem\u00E3o", "ich liebe dich", "\uD83C\uDDE9\uD83C\uDDEA"],
    ["japon\u00EAs", "aishiteru \u30A2\u30A4\u30B7\u30C6\u30EB", "\uD83C\uDDEF\uD83C\uDDF5"],
    ["coreano", "saranghae \uC0AC\uB791\uD574", "\uD83C\uDDF0\uD83C\uDDF7"],
    ["grego", "s'agap\u00F3", "\uD83C\uDDEC\uD83C\uDDF7"],
    ["turco", "seni seviyorum", "\uD83C\uDDF9\uD83C\uDDF7"],
    ["polon\u00EAs", "kocham ci\u0119", "\uD83C\uDDF5\uD83C\uDDF1"]
];
const linguaEl = $("#lingua-do-dia");
const LINGUA_KEY = "p-lingua-ultima";
let linguaAtual = 0;

function mostrarLingua(i) {
    linguaAtual = i;
    const l = LINGUAS[i];
    linguaEl.textContent = "em " + l[0] + ": " + l[1] + " " + l[2];
    try { localStorage.setItem(LINGUA_KEY, String(i)); } catch (e) {}
}

(function sorteiaLingua() {
    if (!linguaEl) return;
    let ultima = -1;
    try { ultima = parseInt(localStorage.getItem(LINGUA_KEY) || "-1", 10); } catch (e) {}
    if (isNaN(ultima)) ultima = -1;
    let i = Math.floor(Math.random() * LINGUAS.length);
    while (i === ultima) i = Math.floor(Math.random() * LINGUAS.length);
    mostrarLingua(i);
    linguaEl.addEventListener("click", () => {
        linguaEl.classList.remove("gira");
        void linguaEl.offsetWidth;
        mostrarLingua((linguaAtual + 1) % LINGUAS.length);
        linguaEl.classList.add("gira");
        vibra(30);
    });
    linguaEl.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); linguaEl.click(); }
    });
})();

ligaCoracoes(3600);

/* ------------------------------------------------------------
 * 9 · pergunta final + botão que foge
 * ------------------------------------------------------------ */
const btnSim = $("#btn-sim"), btnNao = $("#btn-nao");
const escapadas = $("#escapadas");
let vezesFugiu = 0;

const FRASES_FUGA = [
    "ah, n\u00E3o \uD83D\uDE1C", "tchauzinho, bot\u00E3o \uD83D\uDE06", "corre que ele aumenta \uD83C\uDFC3",
    "mais r\u00E1pido que o vento \uD83D\uDE0B", "quase me pegou \uD83D\uDC97", "s\u00F3 se for agora \uD83D\uDE0C",
    "vai fugir at\u00E9 quando? \uD83D\uDC98", "imposs\u00EDvel me pegar \uD83D\uDD25"
];

function fugir() {
    vezesFugiu++;
    escapadas.textContent = FRASES_FUGA[Math.min(vezesFugiu - 1, FRASES_FUGA.length - 1)];
    vibra(50);
    const x = 10 + Math.random() * (window.innerWidth - btnNao.offsetWidth - 20);
    const y = 10 + Math.random() * (window.innerHeight - btnNao.offsetHeight - 20);
    btnNao.style.position = "fixed";
    btnNao.style.left = x + "px";
    btnNao.style.top = y + "px";
    btnNao.style.transition = "left .18s ease, top .18s ease";
    btnNao.style.zIndex = "70";
}

btnNao.addEventListener("pointerdown", fugir);
btnNao.addEventListener("click", ev => { ev.preventDefault(); fugir(); });

/* ---------- cinema: a sessão do nosso filme ---------- */
const filmeFinal = $("#filme-final");
const cineApresenta = $("#cine-apresenta");
const cineRolagem = $("#cine-rolagem");
const cineCap = $("#cine-cap");
const cineFim = $("#cine-fim");
const cinePoster = $("#cine-poster");
const cinePosterImg = $("#cine-poster-img");
const creditosItens = [];

function montaCreditos(fugas) {
    cineRolagem.innerHTML = "";
    creditosItens.length = 0;
    const lista = [
        { t: "tit", txt: "SARA &#10022; ALEF" },
        { t: "rot", txt: "Elenco" },
        { t: "sub", txt: "Sara &#9829; Alef &#8212; os protagonistas" },
        { t: "rot", txt: "Dire&ccedil;&atilde;o de amor" },
        { t: "sub", txt: "realizada por Alef, com todo carinho" },
        { t: "rot", txt: "Trilha sonora" },
        { t: "sub", txt: "&ldquo;S&oacute; N&oacute;s Dois&rdquo; &#8212; a nossa m&uacute;sica" },
        { t: "rot", txt: "Cenas reais" },
        { t: "sub", txt: "gravadas de <span class=\"nb\">23/10/2025</span> at&eacute; o infinito" },
        { t: "sub", txt: "fugas do &ldquo;n&atilde;o&rdquo;: " + fugas },
        { t: "fim", txt: "&#10022; o filme da nossa vida &#10022;" }
    ];
    lista.forEach(c => {
        const el = document.createElement("div");
        el.className = "cine-item " + c.t;
        el.innerHTML = c.txt;
        cineRolagem.appendChild(el);
        creditosItens.push(el);
    });
}
function itemOn(i) { if (creditosItens[i]) creditosItens[i].classList.add("on"); }

function mostrarPoster(indice, dur) {
    cinePosterImg.src = CONFIG.marcos[indice].foto;
    cinePoster.classList.remove("grande");
    cinePoster.classList.add("on");
    setTimeout(() => cinePoster.classList.remove("on"), dur || 1150);
}
function mostrarPosterGrande(indice) {
    cinePosterImg.src = CONFIG.marcos[indice].foto;
    cinePoster.classList.add("grande");
    cinePoster.classList.add("on");
    setTimeout(() => cinePoster.classList.remove("on"), 2400);
}
function estrelaCorre() {
    const el = document.createElement("span");
    el.className = "estrela-correndo";
    filmeFinal.appendChild(el);
    requestAnimationFrame(() => el.classList.add("on"));
    setTimeout(() => el.remove(), 1500);
}
function entrarCinema() {
    document.body.classList.add("sem-scroll");
    const pergunta = $(".pergunta");
    if (pergunta) pergunta.classList.add("some");
    filmeFinal.classList.add("on");
    filmeFinal.style.visibility = "visible";
    filmeFinal.style.opacity = "0";
    let tInicio = null;
    const fade = t => {
        if (tInicio === null) tInicio = t;
        const prog = Math.min(1, (t - tInicio) / 700);
        filmeFinal.style.opacity = String(prog);
        if (prog < 1) requestAnimationFrame(fade);
    };
    requestAnimationFrame(fade);
    setTimeout(() => { filmeFinal.style.opacity = "1"; }, 900);
    filmeFinal.setAttribute("aria-hidden", "false");
    showFogos(2);
}
function capMostra() {
    cineRolagem.classList.remove("on");
    cineCap.classList.add("on");
    montaFlashback();
    showFogos(3);
    vibra(60);
    /* a cena extra vem antes da carta, como nos pós-créditos */
    setTimeout(() => {
        mostrarCenaExtra();
        extraTimer = setTimeout(() => {
            fecharCenaExtra();
            cineCap.classList.add("hold");
        }, 4500);
    }, 1900);
}

/* ---------- cena extra (pós-créditos) ---------- */
const cineExtra = $("#cine-extra");
let extraTimer = 0;

function mostrarCenaExtra() {
    if (!cineExtra) return;
    const cfg = CONFIG.posCreditos || {};
    const tag = $("#cine-extra-tag");
    const img = $("#cine-extra-img");
    const txt = $("#cine-extra-texto");
    if (tag) tag.textContent = cfg.titulo || "cena extra";
    if (txt) txt.textContent = cfg.texto || "";
    if (img) {
        if (cfg.imagem) { img.src = cfg.imagem; img.hidden = false; }
        else { img.hidden = true; }
    }
    cineExtra.classList.add("on");
    cineExtra.setAttribute("aria-hidden", "false");
    showFogos(2);
}

function fecharCenaExtra() {
    if (!cineExtra) return;
    cineExtra.classList.remove("on");
    cineExtra.setAttribute("aria-hidden", "true");
    clearTimeout(extraTimer);
}

if (cineExtra) {
    cineExtra.addEventListener("click", () => {
        fecharCenaExtra();
        cineCap.classList.add("hold");
    });
}

const TEMPOS_CINEMA = [
    [0, entrarCinema],
    [450, () => cineApresenta.classList.add("on")],
    [1200, estrelaCorre],
    [2500, () => { cineApresenta.classList.add("some"); cineRolagem.classList.add("on"); itemOn(0); mostrarPoster(0); }],
    [3600, () => itemOn(1)],
    [4700, () => { itemOn(2); mostrarPoster(1); }],
    [5800, () => itemOn(3)],
    [6900, () => { itemOn(4); mostrarPoster(2); }],
    [8000, () => itemOn(5)],
    [9100, () => { itemOn(6); mostrarPoster(3); }],
    [10200, () => itemOn(7)],
    [11300, () => { itemOn(8); mostrarPoster(4); }],
    [12400, () => itemOn(9)],
    [13500, () => { itemOn(10); mostrarPosterGrande(5); showFogos(1); }],
    [15200, capMostra]
];

function startCinema() {
    montaCreditos(vezesFugiu);
    subirTrilha();
    TEMPOS_CINEMA.forEach(passo => setTimeout(passo[1], passo[0]));
    CAPCIONES.forEach(cap => setTimeout(() => legenda(cap[1]), cap[0]));
}

/* ---------- legenda da música (subtítulos da sessão) ---------- */
/* troque pelas linhas da letra de "Só Nós Dois" se quiser a real */
const CAPCIONES = [
    [2600, "toda nossa história tem trilha sonora..."],
    [4800, "o filme começa com um “oi” que virou tudo"],
    [7000, "cada cena, um capítulo nosso"],
    [9200, "e a gente segura a câmera na mão"],
    [11400, "sem roteiro, só verdade"],
    [13600, "o trailer de uma vida inteira..."]
];
let cineSubT = 0;
function legenda(txt) {
    const cineSub = $("#cine-sub");
    if (!cineSub) return;
    cineSub.textContent = txt;
    cineSub.classList.add("on");
    clearTimeout(cineSubT);
    cineSubT = setTimeout(() => cineSub.classList.remove("on"), 2600);
}

/* ---------- flashback: as cenas do nosso filme ---------- */
const cineFlash = $("#cine-flashback");
function montaFlashback() {
    if (!cineFlash || cineFlash.dataset.pronto) return;
    cineFlash.dataset.pronto = "1";
    CONFIG.marcos.forEach((m, i) => {
        const img = document.createElement("img");
        img.src = m.foto;
        img.alt = "Cena do nosso filme";
        img.setAttribute("loading", "lazy");
        img.style.setProperty("--fb-i", i);
        cineFlash.appendChild(img);
    });
    cineFlash.classList.add("liga");
}

btnSim.addEventListener("click", () => {
    if (btnSim.disabled) return;
    btnSim.disabled = true;
    btnNao.style.display = "none";
    escapadas.style.display = "none";
    const ponte = $("#ponte-ceu");
    if (ponte) {
        ponte.classList.add("on");
        setTimeout(() => ponte.classList.remove("on"), 1500);
    }
    startCinema();
});

/* ------------------------------------------------------------
 * 10 · segurar pra revelar
 * ------------------------------------------------------------ */
const holdArea = $("#hold-area"), holdBtn = $("#btn-hold");
const holdFill = $("#hold-preenchida"), recado = $("#recado");
const HOLD_DURACAO = 1500;
let holdProg = 0, segurando = false, holdRaf = 0, holdCompleto = false, holdUltimoT = 0;

function loopHold(ag) {
    if (!segurando || holdCompleto) return;
    if (!holdUltimoT) holdUltimoT = ag;
    const dt = Math.min(80, ag - holdUltimoT);
    holdUltimoT = ag;
    holdProg = clampa(holdProg + dt / HOLD_DURACAO, 0, 1);
    holdFill.style.width = (holdProg * 100).toFixed(1) + "%";
    if (holdArea) holdArea.style.webkitTransform = "scale(" + (1 + 0.1 * holdProg) + ")";
    if (holdProg >= 1) { completarHold(); return; }
    holdRaf = requestAnimationFrame(loopHold);
}
const FRASES_HOLD = ["quase l\u00E1...", "segura comigo", "mais um pouco", "eu sei que voc\u00EA consegue"];
let holdCiclo = 0;
function ciclarDica(inicio) {
    const dica = $(".cine-dica");
    if (!dica) return;
    if (!inicio) { clearInterval(holdCiclo); dica.textContent = "segure o cora\u00E7\u00E3o para abrir o bilhete"; return; }
    clearInterval(holdCiclo);
    dica.textContent = FRASES_HOLD[0];
    holdCiclo = setInterval(() => {
        dica.textContent = FRASES_HOLD[Math.floor(Math.random() * FRASES_HOLD.length)];
    }, 1100);
}
function iniciarHold() {
    if (holdCompleto) return;
    segurando = true;
    holdUltimoT = 0;
    ciclarDica(true);
    if (!holdRaf) holdRaf = requestAnimationFrame(loopHold);
}
function pararHold() {
    segurando = false;
    holdUltimoT = 0;
    ciclarDica(false);
    if (holdRaf) { cancelAnimationFrame(holdRaf); holdRaf = 0; }
    if (!holdCompleto) { holdProg = 0; holdFill.style.width = "0%"; }
}
function completarHold() {
    segurando = false;
    holdUltimoT = 0;
    if (holdCompleto) return;
    holdCompleto = true;
    ciclarDica(false);
    if (holdRaf) { cancelAnimationFrame(holdRaf); holdRaf = 0; }
    holdFill.style.width = "100%";
    holdArea.style.display = "none";
    const dica = $(".cine-dica"); if (dica) dica.style.display = "none";
    const carta = $("#carta");
    if (carta) carta.classList.add("abrindo");
    $("#recado-texto").textContent = CONFIG.recado;
    setTimeout(() => {
        recado.classList.add("on");
        cineFim.classList.add("on");
    }, 950);
    disparaInfinito();
    showFogos(8);
    vibra(180);
}

holdBtn.addEventListener("pointerdown", ev => { ev.preventDefault(); iniciarHold(); });
window.addEventListener("pointerup", pararHold);
holdBtn.addEventListener("pointerleave", pararHold);
holdBtn.addEventListener("pointercancel", pararHold);
holdBtn.addEventListener("keydown", ev => {
    if ((ev.key === " " || ev.key === "Enter") && !ev.repeat) { ev.preventDefault(); iniciarHold(); }
});
holdBtn.addEventListener("keyup", ev => {
    if (ev.key === " " || ev.key === "Enter") { ev.preventDefault(); pararHold(); }
});

/* ------------------------------------------------------------
 * 11 · acender as luzes (painel pós-filme)
 * ------------------------------------------------------------ */
const painelLuzes = $("#painel-luzes");
const galeria = $("#galeria");
const galeriaPontos = $("#galeria-pontos");

function fadeOut(el, dur, depois) {
    if (!el) { if (depois) depois(); return; }
    let finalizado = false;
    const finalizar = () => {
        if (finalizado) return;
        finalizado = true;
        if (depois) depois();
    };
    el.style.opacity = "0";
    const t0 = performance.now();
    const passo = t => {
        const prog = clampa((t - t0) / dur, 0, 1);
        el.style.opacity = String(1 - prog);
        if (prog < 1) requestAnimationFrame(passo);
        else finalizar();
    };
    requestAnimationFrame(passo);
    setTimeout(() => {
        el.style.opacity = "0";
        finalizar();
    }, dur + 200);
}

function fadeIn(el, dur) {
    if (!el) return;
    el.style.visibility = "visible";
    el.style.opacity = "0";
    const t0 = performance.now();
    const passo = t => {
        const prog = clampa((t - t0) / dur, 0, 1);
        el.style.opacity = String(prog);
        if (prog < 1) requestAnimationFrame(passo);
        else el.style.opacity = "1";
    };
    requestAnimationFrame(passo);
    setTimeout(() => { el.style.opacity = "1"; }, dur + 200);
}

function mostraCinema(visivel) {
    filmeFinal.classList.toggle("fora", !visivel);
    filmeFinal.setAttribute("aria-hidden", visivel ? "false" : "true");
    if (visivel) {
        filmeFinal.classList.add("on");
        fadeIn(filmeFinal, 700);
    } else {
        filmeFinal.classList.remove("on");
        fadeOut(filmeFinal, 600, () => {
            filmeFinal.style.opacity = "0";
            filmeFinal.style.visibility = "hidden";
        });
    }
}

function abrirPainelLuzes() {
    pararInfinito();
    $("#painel-texto").textContent = CONFIG.recado;
    const certData = $("#cert-data");
    if (certData) certData.textContent = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
    const certFugas = $("#cert-fugas");
    if (certFugas) certFugas.textContent = vezesFugiu === 0 ? "sem fugas — voc\u00EA foi direto pro sim" : "e o “n\u00E3o” tentou " + vezesFugiu + (vezesFugiu === 1 ? " fuga" : " fugas");
    const cert = $("#certificado");
    if (cert) cert.setAttribute("aria-hidden", "false");
    mostraCinema(false);
    setTimeout(() => {
        painelLuzes.classList.add("on");
        painelLuzes.setAttribute("aria-hidden", "false");
        fadeIn(painelLuzes, 500);
        const ass = document.querySelector(".assinatura-svg");
        if (ass) ass.classList.add("assinando");
    }, 650);
    montaGaleria();
}

function montaGaleria() {
    if (!galeria || galeria.dataset.pronto) return;
    galeria.dataset.pronto = "1";
    galeria.innerHTML = "";
    galeriaPontos.innerHTML = "";
    CONFIG.galeria.forEach((f, i) => {
        const fig = document.createElement("figure");
        fig.className = "galeria-item";
        const img = document.createElement("img");
        img.src = f.foto;
        img.alt = f.legenda;
        img.loading = "lazy";
        const cap = document.createElement("figcaption");
        cap.textContent = f.legenda;
        fig.appendChild(img);
        fig.appendChild(cap);
        galeria.appendChild(fig);
        const ponto = document.createElement("i");
        if (i === 0) ponto.classList.add("on");
        galeriaPontos.appendChild(ponto);
    });
    const pontos = galeriaPontos.querySelectorAll("i");
    const contagem = (() => {
        if ("IntersectionObserver" in window) {
            const obs = new IntersectionObserver(lista => {
                lista.forEach(ent => {
                    if (!ent.isIntersecting) return;
                    const idx = Array.from(galeria.children).indexOf(ent.target);
                    pontos.forEach((p, i) => p.classList.toggle("on", i === idx));
                });
            }, { threshold: .55 });
            galeria.querySelectorAll(".galeria-item").forEach(fig => obs.observe(fig));
        }
    });
    let rafP = 0;
    function ativo() {
        let max = 0, imax = 0;
        const m = galeria.clientWidth / 2;
        Array.from(galeria.children).forEach((fig, i) => {
            const c = fig.getBoundingClientRect();
            const centro = galeria.getBoundingClientRect().left + m;
            const dist = Math.abs(c.left + c.width / 2 - centro);
            if (i === 0 || dist < max) { max = dist; imax = i; }
        });
        pontos.forEach((p, i) => p.classList.toggle("on", i === imax));
    }
    galeria.addEventListener("scroll", () => {
        if (rafP) cancelAnimationFrame(rafP);
        rafP = requestAnimationFrame(ativo);
    }, { passive: true });
    setTimeout(ativo, 400);
    contagem();
}

function voltarCinema() {
    fadeOut(painelLuzes, 450, () => {
        painelLuzes.classList.remove("on");
        painelLuzes.setAttribute("aria-hidden", "true");
        painelLuzes.style.opacity = "0";
        painelLuzes.style.visibility = "hidden";
    });
    mostraCinema(true);
    setTimeout(() => { filmeFinal.classList.remove("fora"); }, 120);
}

function voltarInicio() {
    document.body.classList.remove("sem-scroll");
    fadeOut(painelLuzes, 400, () => {
        window.scrollTo({ top: 0, behavior: "auto" });
        location.reload();
    });
}

$("#btn-luzes").addEventListener("click", abrirPainelLuzes);
$("#btn-voltar-cinema").addEventListener("click", voltarCinema);
$("#btn-voltar-inicio").addEventListener("click", voltarInicio);

/* ------------------------------------------------------------
 * 12 · fogos de artifício
 * ------------------------------------------------------------ */
const canvasFogos = $("#canvas-fogos");
const ctxFogos = canvasFogos && canvasFogos.getContext("2d");
const particulas = [];
const timersFogos = [];

const canvasInfinito = $("#canvas-infinito");
const ctxInf = canvasInfinito && canvasInfinito.getContext("2d");
const particulasInf = [];

function tamanhoFogos() {
    if (!canvasFogos) return;
    canvasFogos.width = window.innerWidth;
    canvasFogos.height = window.innerHeight;
    if (canvasInfinito) {
        canvasInfinito.width = window.innerWidth;
        canvasInfinito.height = window.innerHeight;
    }
}
tamanhoFogos();
window.addEventListener("resize", tamanhoFogos);

function showFogos(total) {
    if (!ctxFogos) return;
    for (let i = 0; i < (total || 4); i++) {
        timersFogos.push(setTimeout(() => explodir(), i * 260));
    }
}

function explodir() {
    if (!canvasFogos) return;
    const x = canvasFogos.width * (0.15 + Math.random() * 0.7);
    const y = canvasFogos.height * (0.12 + Math.random() * 0.45);
    const cores = ["#ff9ecb", "#ffd166", "#b583ff", "#7cd3ff", "#f15bb5", "#ffffff"];
    const cor = cores[Math.floor(Math.random() * cores.length)];
    for (let i = 0; i < 30; i++) {
        const ang = Math.random() * Math.PI * 2;
        const vel = 1.5 + Math.random() * 4.5;
        particulas.push({
            x, y,
            vx: Math.cos(ang) * vel,
            vy: Math.sin(ang) * vel,
            vida: 60 + Math.random() * 26,
            cor
        });
    }
    if (particulas.length) loopFogos();
}

function loopFogos() {
    if (!ctxFogos) return;
    ctxFogos.clearRect(0, 0, canvasFogos.width, canvasFogos.height);
    for (let i = particulas.length - 1; i >= 0; i--) {
        const p = particulas[i];
        p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.05;
        p.x += p.vx; p.y += p.vy;
        p.vida--;
        if (p.vida <= 0) { particulas.splice(i, 1); continue; }
        ctxFogos.globalAlpha = clampa(p.vida / 60, 0, 1);
        ctxFogos.fillStyle = p.cor;
        ctxFogos.beginPath();
        ctxFogos.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctxFogos.fill();
    }
    ctxFogos.globalAlpha = 1;
    if (particulas.length) requestAnimationFrame(loopFogos);
}

/* ---------- ∞ dourado (lemniscata) ---------- */
function pontosInfinito(n) {
    if (!canvasInfinito) return [];
    const cx = canvasInfinito.width / 2;
    const cy = canvasInfinito.height * 0.34;
    const a = Math.min(canvasInfinito.width * 0.26, 320);
    const pts = [];
    for (let i = 0; i <= n; i++) {
        const t = (i / n) * Math.PI * 2;
        const den = 1 + Math.sin(t) * Math.sin(t);
        pts.push([cx + a * Math.cos(t) / den, cy + a * Math.sin(t) * Math.cos(t) / den]);
    }
    return pts;
}
let infinitoRodando = false;
let infinitoRaf = 0;
let infinitoTimer = 0;

function disparaInfinito() {
    if (!ctxInf) return;
    particulasInf.length = 0;
    const pts = pontosInfinito(64);
    pts.forEach((p, i) => {
        particulasInf.push({ x: p[0], y: p[1], cor: i % 2 ? "#ffd166" : "#ff9ecb" });
    });
    if (canvasInfinito) {
        canvasInfinito.style.transition = "opacity .8s ease";
        canvasInfinito.style.opacity = "1";
    }
    if (!infinitoRodando) {
        infinitoRodando = true;
        infinitoRaf = requestAnimationFrame(loopInfinito);
    }
    clearTimeout(infinitoTimer);
    /* o ∞ brilha por alguns segundos e some, para não cobrir a carta nem o painel */
    infinitoTimer = setTimeout(pararInfinito, 7000);
}

function pararInfinito() {
    clearTimeout(infinitoTimer);
    infinitoTimer = 0;
    infinitoRodando = false;
    if (infinitoRaf) { cancelAnimationFrame(infinitoRaf); infinitoRaf = 0; }
    if (canvasInfinito) {
        canvasInfinito.style.transition = "opacity .8s ease";
        canvasInfinito.style.opacity = "0";
    }
}

function loopInfinito() {
    if (!ctxInf || !infinitoRodando) return;
    ctxInf.clearRect(0, 0, canvasInfinito.width, canvasInfinito.height);

    ctxInf.strokeStyle = "rgba(255, 209, 102, .9)";
    ctxInf.lineWidth = 4;
    ctxInf.lineCap = "round";
    ctxInf.shadowBlur = 24;
    ctxInf.shadowColor = "#ffd166";
    ctxInf.beginPath();
    const pts = pontosInfinito(90);
    pts.forEach((p, i) => { i === 0 ? ctxInf.moveTo(p[0], p[1]) : ctxInf.lineTo(p[0], p[1]); });
    ctxInf.stroke();
    ctxInf.shadowBlur = 0;

    const pulso = (Math.sin(Date.now() / 260) + 1) / 2;
    ctxInf.fillStyle = "#fff";
    particulasInf.forEach(p => {
        ctxInf.globalAlpha = 0.5 + pulso * 0.5;
        ctxInf.fillStyle = p.cor;
        ctxInf.beginPath();
        ctxInf.arc(p.x, p.y, 1.6 + pulso * 2.4, 0, Math.PI * 2);
        ctxInf.fill();
    });
    ctxInf.globalAlpha = 1;
    infinitoRaf = requestAnimationFrame(loopInfinito);
}

window.__paraSara = {
    acenderEstrela,
    aplicarProgresso,
    completarConstelacao,
    showFogos,
    fugir,
    completarHold,
    segurar: iniciarHold,
    parar: pararHold,
    startCinema,
    disparaInfinito,
    parts: () => particulas.length,
    infParts: () => particulasInf.length,
    nEstrelas: () => nPontos,
    nCapitulos: () => nCapitulos,
    acesas: () => estrelasAcesas,
    cadentes: () => document.querySelectorAll(".cad-alvo").length,
    coracao: () => estrelasAcesas >= nPontos,
    lua: () => faseLua(CONFIG.dataInicio),
    mostrarCenaExtra,
    fecharCenaExtra,
    marqueeOk: () => document.querySelectorAll("#mq-1 .mq-item").length,
    heroCeu: () => { const c = document.getElementById("hero-ceu"); return c ? (c.width > 0 ? "ok" : "sem-largura") : "sem-canvas"; },
    ponte: () => document.getElementById("ponte-ceu").classList.contains("on")
};