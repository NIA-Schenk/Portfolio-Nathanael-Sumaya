const canvas = document.getElementById("colorWheel");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;

document.getElementById("btnRGB").addEventListener("click", () => {
    drawColorWheel("rgb");
    setActiveButton("btnRGB");
});

document.getElementById("btnHSL").addEventListener("click", () => {
    drawColorWheel("hsl");
    setActiveButton("btnHSL");
});

function setActiveButton(activeId) {

    document.getElementById("btnRGB").classList.remove("active");
    document.getElementById("btnHSL").classList.remove("active");

    document.getElementById(activeId).classList.add("active");
}

function drawColorWheel(mode = "rgb") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let angle = 0; angle < 360; angle += 1) {
        for (let r = 0; r < radius; r += 2) { // Small step size for smoothness
            let rgb = mode === "rgb"
                ? angleToRGB(angle)
                : hslToRgb(angle, 100, 50);

            ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            ctx.beginPath();
            ctx.arc(radius, radius, r, (angle - 1) * Math.PI / 180, angle * Math.PI / 180);
            ctx.lineTo(radius, radius);
            ctx.fill();
        }
    }
}

function angleToRGB(angle) {
    let r = 0, g = 0, b = 0;
    if (angle < 120) { r = (120 - angle) / 120; g = angle / 120; }
    else if (angle < 240) { g = (240 - angle) / 120; b = (angle - 120) / 120; }
    else { b = (360 - angle) / 120; r = (angle - 240) / 120; }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
    ];
}

drawColorWheel("rgb");
