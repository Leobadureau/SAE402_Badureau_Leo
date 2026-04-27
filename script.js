/* =========================
   MENU BURGER
   ========================= */
   function toggleMenu() {
    document.querySelector('.burger').classList.toggle('active');
    document.getElementById('mobileMenu').classList.toggle('active');
}

/* =========================
   VARIABLES GLOBALES
   ========================= */
let selectedPath = null;

// Color picker JSColor
const picker = new jscolor(
    document.querySelector('.jscolor'),
    { onFineChange: 'changeGeneralColor(this)' }
);

/* =========================
   AFFICHAGE CUSTOMIZER COULEURS
   ========================= */
function toggleCustomizer() {
    const c = document.getElementById('colorCustomizer');
    const holoSVG = document.getElementById('holoSVG');
    const colorSVG = document.getElementById('colorSVG');
    const motifSVG = document.getElementById('motifSVG');

    if (c.style.display === 'flex') {

        // Fermer customizer
        c.style.display = 'none';

        // Reset affichage SVG
        holoSVG.style.display = 'block';
        colorSVG.style.display = 'none';
        motifSVG.style.display = 'none';

        // Reset sélection
        document.querySelectorAll('#colorSVG g')
            .forEach(g => g.classList.remove('selected'));

        selectedPath = null;

        // Reset effet holographique
        document.querySelector('#holoSVG path')
            .setAttribute('fill', 'url(#holo-gradient4)');

    } else {

        // Ouvrir customizer couleur
        c.style.display = 'flex';

        holoSVG.style.display = 'none';
        colorSVG.style.display = 'block';
        motifSVG.style.display = 'none';

        document.getElementById('colorSection').style.display = 'block';
        document.getElementById('motifSection').style.display = 'none';
    }
}

/* =========================
   MODE MOTIF
   ========================= */
function toggleMotifMode() {
    const c = document.getElementById('colorCustomizer');
    const holoSVG = document.getElementById('holoSVG');
    const colorSVG = document.getElementById('colorSVG');
    const motifSVG = document.getElementById('motifSVG');

    if (c.style.display === 'flex') {

        // Fermer mode motif
        c.style.display = 'none';

        holoSVG.style.display = 'block';
        colorSVG.style.display = 'none';
        motifSVG.style.display = 'none';

        document.getElementById('motifSizeSlider').disabled = true;
        document.getElementById('motifSection').style.display = 'none';
        document.getElementById('colorSection').style.display = 'block';

        selectedPath = null;

        // Reset holographique
        document.querySelector('#holoSVG path')
            .setAttribute('fill', 'url(#holo-gradient4)');

    } else {

        // Ouvrir mode motif
        c.style.display = 'flex';

        holoSVG.style.display = 'none';
        colorSVG.style.display = 'none';
        motifSVG.style.display = 'block';

        document.getElementById('colorSection').style.display = 'none';
        document.getElementById('motifSection').style.display = 'block';
    }
}

/* =========================
   SELECTION DES ZONES (COULEURS)
   ========================= */
document.querySelectorAll('#colorSVG g').forEach(g => {

    g.addEventListener('click', () => {

        // Désélection si déjà actif
        if (selectedPath === g) {
            selectedPath.classList.remove('selected');
            selectedPath = null;
            return;
        }

        // Nouvelle sélection
        if (selectedPath) selectedPath.classList.remove('selected');

        selectedPath = g;
        selectedPath.classList.add('selected');

        // Sync color picker avec couleur actuelle
        picker.fromString(g.querySelector('path').getAttribute('fill'));
    });
});


/* =========================
   IMPORT IMAGE MOTIF
   ========================= */
document.getElementById('motifInput').addEventListener('change', (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        applyMotifFill(event.target.result);
    };

    reader.readAsDataURL(file);
});

/* =========================
   APPLICATION MOTIF SVG
   ========================= */
function applyMotifFill(src) {

    const svg = document.getElementById('motifSVG');

    // Création defs si absent
    let defs = svg.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.insertBefore(defs, svg.firstChild);
    }

    // Création pattern si absent
    let pattern = defs.querySelector('#motifPattern');
    if (!pattern) {
        pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        pattern.id = 'motifPattern';
        pattern.setAttribute('patternUnits', 'userSpaceOnUse');
        defs.appendChild(pattern);
    }

    // Image dans pattern
    pattern.innerHTML = `
        <image href="${src}" width="400" height="400"/>
    `;

    pattern.setAttribute('width', '400');
    pattern.setAttribute('height', '400');

    // Application sur zone sélectionnée ou globale
    if (selectedPath) {
        selectedPath.querySelector('path')
            .setAttribute('fill', 'url(#motifPattern)');
    } else {
        document.querySelectorAll('#motifSVG path')
            .forEach(p => p.setAttribute('fill', 'url(#motifPattern)'));
    }

    // Activation slider
    document.getElementById('motifSizeSlider').disabled = false;
    document.getElementById('motifSizeSlider').value = 400;
}

/* =========================
   REDIMENSION MOTIF
   ========================= */
document.getElementById('motifSizeSlider').addEventListener('input', (e) => {

    const size = e.target.value;
    const pattern = document.getElementById('motifPattern');

    if (!pattern) return;

    pattern.setAttribute('width', size);
    pattern.setAttribute('height', size);

    const img = pattern.querySelector('image');
    if (img) {
        img.setAttribute('width', size);
        img.setAttribute('height', size);
    }
});

/* =========================
   MOTIFS PREDEFINIS
   ========================= */
function setMotif(num) {

    const imgName = num === 1 ? 'Motif 1.png' : 'Motif 2.png';
    const src = `img/${encodeURIComponent(imgName)}`;

    applyMotifFill(src);
}

/* =========================
   COULEUR (COLOR PICKER)
   ========================= */
function changeGeneralColor(pickerInstance) {

    const color = pickerInstance.toHEXString();

    if (selectedPath) {
        selectedPath.querySelector('path').setAttribute('fill', color);
    } else {
        document.querySelectorAll('#colorSVG path')
            .forEach(p => p.setAttribute('fill', color));
    }
}

/* =========================
   COULEURS PREDEFINIES
   ========================= */
function setGeneralColor(color) {

    if (selectedPath) {
        selectedPath.querySelector('path').setAttribute('fill', color);
    } else {
        document.querySelectorAll('#colorSVG path')
            .forEach(p => p.setAttribute('fill', color));
    }

    picker.fromString(color);
}

/* =========================
   EFFET HOLOGRAPHIQUE (SOURIS)
   ========================= */
const product = document.getElementById('mainProduct');
const gradient = document.getElementById('holo-gradient4');

product.addEventListener('mousemove', (e) => {

    const rect = product.getBoundingClientRect();

    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    gradient.setAttribute('x1', mouseX + '%');
    gradient.setAttribute('y1', mouseY + '%');
    gradient.setAttribute('x2', (mouseX + 20) + '%');
    gradient.setAttribute('y2', (mouseY + 20) + '%');
});

