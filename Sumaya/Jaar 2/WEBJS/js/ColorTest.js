// Functies voor het berekenen van triadische kleuren
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s, l };
}

function hslToRgb(h, s, l) {
    h /= 360;
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbToHex(color) {
    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(color.b)}`.toUpperCase();
}

// Genereer een willekeurig grid van gemengde kleuren
function generateGrid() {
    const gridSize = document.getElementById('gridSize').value;
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';  // Clear het grid

    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;

    const mixedColors = JSON.parse(localStorage.getItem("mixedColors")) || [];

    // Genereer de grid met gemengde kleuren
    mixedColors.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.style.backgroundColor = color;
        div.onclick = function() {
            showTriadicColors(color);
        };
        gridContainer.appendChild(div);
    });
}

// Toon de triadische kleuren wanneer er op een kleur wordt geklikt
function showTriadicColors(color) {
    if (color.startsWith('rgb')) {
        const rgbValues = color.match(/\d+/g);
        color = rgbToHex({
            r: parseInt(rgbValues[0]),
            g: parseInt(rgbValues[1]),
            b: parseInt(rgbValues[2])
        });
    }

    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const triadic1 = hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l);
    const triadic2 = hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l);

    document.getElementById('originalColor').style.backgroundColor = color;
    document.getElementById('color1').style.backgroundColor = rgbToHex(triadic1);
    document.getElementById('color2').style.backgroundColor = rgbToHex(triadic2);

    document.getElementById('originalColorCode').textContent = `Original: ${color}`;
    document.getElementById('color1Code').textContent = `Triad 1: ${rgbToHex(triadic1)}`;
    document.getElementById('color2Code').textContent = `Triad 2: ${rgbToHex(triadic2)}`;

    document.getElementById('colorPopup').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    const closePopupBtn = document.getElementById("closePopupBtn");
    
    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", closePopup);
    }
});

// Sluit de popup
function closePopup() {
    document.getElementById('colorPopup').style.display = 'none';
}

document.getElementById('generateGridBtn').addEventListener('click', generateGrid);
