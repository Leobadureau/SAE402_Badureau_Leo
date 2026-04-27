# SAE 402 – Personnalisation de vêtement interactif

## Informations

- **Nom :** Badureau  
- **Prénom :** Léo  
- **URL Git Repo :** https://github.com/Leobadureau/SAE402_Badureau_Leo
- **URL Git Page :** https://leobadureau.github.io/SAE402_Badureau_Leo/

---

# Interaction Humain / IA

---
## TÂCHE #1 : Ajout d’un effet holographique

## 1. DEMANDE À L'IA
Je suis en train de faire un projet de site de personnalisation de vêtement en HTML/CSS/JS.  
J’ai déjà une base avec un SVG par-dessus une image du vêtement.  
Je voudrais ajouter un effet “holographique”. L’idée serait d’avoir un dégradé dans mon SVG, et que ce dégradé réagisse à la position de la souris quand on bouge dessus, comme un effet de lumière qui suit le mouvement.


## 2. RÉPONSE DE L’IA

```javascript
const product = document.getElementById('mainProduct');
const gradient = document.getElementById('holo-gradient4');

product.onmousemove = function(e) {

    const x = e.offsetX;
    const y = e.offsetY;

    gradient.setAttribute('x1', x + '%');
    gradient.setAttribute('y1', y + '%');
    gradient.setAttribute('x2', (x + 20) + '%');
    gradient.setAttribute('y2', (y + 20) + '%');
};
```
### 2.1 PROBLÈMES REPÉRÉS :
⚠️ Utilisation de offsetX / offsetY qui ne prend pas correctement en compte la taille réelle du conteneur
⚠️ Utilisation de onmousemove au lieu de addEventListener (moins propre et moins flexible)


## 3. MES CORRECTIONS 
```javascript
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
```
### 3.1 MODIFICATIONS EXPLIQUÉES :
✅ normalisation des coordonnées en pourcentage pour s’adapter à toutes les tailles d’écran
✅remplacement de onmousemove par addEventListener pour un code plus propre et scalable
✅ amélioration de la précision du suivi de la souris dans le conteneur

## 4. TEMPS OPTIMISÉE
Temps IA : 15min   
Temps sans IA : 45min

---
## TÂCHE #2 : Sélection d’un SVG pour changement de couleur

## 1. DEMANDE À L'IA
Je travaille sur un site de personnalisation de vêtements en HTML/CSS/JS.
J’ai un SVG découpé en plusieurs zones (groupes `<g>` contenant des `<path>`).
Je veux permettre à l’utilisateur de : cliquer sur une zone du SVG, pour sélectionner/désélectionner cette zone et synchroniser cette sélection avec un color picker pour modifier la couleur de la zone choisie

## 2. RÉPONSE DE L’IA

```javascript
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

```
### 2.1 PROBLÈMES REPÉRÉS :
✅Le code fonctionne correctement et remplit bien son objectif de sélection et synchronisation avec le color picker

## 3. TEMPS OPTIMISÉE
Temps IA : 10min   
Temps sans IA : 20min

---
## TÂCHE #3 :Modification de la taille d’un motif SVG

## 1. DEMANDE À L'IA
Je travaille sur un site de personnalisation de vêtements en HTML/CSS/JS.
J’utilise un motif SVG appliqué sur une zone du vêtement.
Je veux permettre à l’utilisateur de modifier la taille de ce motif avec un slider afin d’agrandir ou réduire le motif directement sur le vêtement.

## 2. RÉPONSE DE L’IA

```javascript
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
```
### 2.1 PROBLÈMES REPÉRÉS :
✅ Le code fonctionne correctement et permet bien de modifier la taille du motif en temps réel
⚠️ Mais la valeur par défaut du slider dans le HTML n’était pas adaptée à ce que je voulais

## 3. Mes corrections
```html
<input type="range" id="motifSizeSlider" min="150" max="600" step="50" value="400" disabled>
```
### 3.1 MODIFICATIONS EXPLIQUÉES :
✅ Ajustement de la valeur par défaut du slider pour obtenir une taille de motif plus cohérente dès le chargement de la page
