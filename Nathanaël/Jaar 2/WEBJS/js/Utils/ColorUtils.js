/**
 * Utility class for color manipulation
 */
class ColorUtils {
    /**
     * Calculates a blended color from a list of ingredient colors
     * @param {Array<number>} ingredientIds - Array of ingredient IDs
     * @param {Array<Object>} allIngredients - Array of all ingredients
     * @returns {string} - Hex color code for the blended color
     */
    static calculateBlendedColor(ingredientIds, allIngredients) {
        if (!ingredientIds || ingredientIds.length === 0) return "#000000";

        const potIngredients = ingredientIds
            .map((id) => ColorUtils.findIngredientById(id, allIngredients))
            .filter((i) => i !== undefined);

        if (potIngredients.length === 1) return potIngredients[0].color;

        let r = 0,
            g = 0,
            b = 0;

        potIngredients.forEach((ingredient) => {
            const hex = ingredient.color.substring(1);
            const rgb = parseInt(hex, 16);
            r += (rgb >> 16) & 0xff;
            g += (rgb >> 8) & 0xff;
            b += rgb & 0xff;
        });

        r = Math.round(r / potIngredients.length);
        g = Math.round(g / potIngredients.length);
        b = Math.round(b / potIngredients.length);

        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    /**
     * Finds an ingredient by its ID
     * @param {number} id - The ingredient ID to find
     * @param {Array<Object>} ingredients - Array of all ingredients
     * @returns {Object|undefined} - The found ingredient or undefined
     */
    static findIngredientById(id, ingredients) {
        return ingredients.find((ingredient) => ingredient.id === id);
    }

    /**
     * Adjusts a hex color by the specified amount
     * @param {string} hex - Hex color code (e.g. "#FF0000")
     * @param {number} amount - Amount to adjust the color brightness (-255 to 255)
     * @returns {string} - Adjusted hex color code
     */
    static adjustColor(hex, amount) {
        // Convert hex to RGB
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);

        // Adjust values
        r = Math.max(0, Math.min(255, r + amount));
        g = Math.max(0, Math.min(255, g + amount));
        b = Math.max(0, Math.min(255, b + amount));

        // Convert back to hex
        return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
            .toString(16)
            .padStart(2, "0")}`;
    }

    /**
     * Convert a hex color to RGB format
     * @param {string} hex - Hex color code (e.g. "#FF0000")
     * @returns {string} - RGB color string (e.g. "rgb(255, 0, 0)")
     */
    static hexToRGB(hex) {
        // Remove the # if present
        hex = hex.replace(/^#/, "");

        // Parse r, g, b values
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Convert RGB values to hex format
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {string} - Hex color code (e.g. "#FF0000")
     */
    static rgbToHex(r, g, b) {
        const toHex = (c) => {
            const hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    /**
     * Parse an RGB string into its component values
     * @param {string} rgb - RGB color string (e.g. "rgb(255, 0, 0)")
     * @returns {Object} - Object with r, g, b properties
     */
    static parseRGB(rgb) {
        const values = rgb.match(/\d+/g);
        return {
            r: parseInt(values[0]),
            g: parseInt(values[1]),
            b: parseInt(values[2]),
        };
    }

    /**
     * Convert a hex color to HSL format
     * @param {string} hex - Hex color code (e.g. "#FF0000")
     * @returns {string} - HSL color string (e.g. "hsl(0, 100%, 50%)")
     */
    static hexToHSL(hex) {
        // Remove the # if present
        hex = hex.replace(/^#/, "");

        // Convert hex to RGB
        let r = parseInt(hex.slice(0, 2), 16) / 255;
        let g = parseInt(hex.slice(2, 4), 16) / 255;
        let b = parseInt(hex.slice(4, 6), 16) / 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b);
        let cmax = Math.max(r, g, b);
        let delta = cmax - cmin;
        let h = 0;
        let s = 0;
        let l = 0;

        // Calculate hue
        if (delta === 0) {
            h = 0;
        } else if (cmax === r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Convert to percentages
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    /**
     * Convert HSL values to hex format
     * @param {number} h - Hue (0-360)
     * @param {number} s - Saturation (0-100)
     * @param {number} l - Lightness (0-100)
     * @returns {string} - Hex color code (e.g. "#FF0000")
     */
    static hslToHex(h, s, l) {
        // Convert HSL percentages to decimals
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        // Convert to hex
        const toHex = (x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    /**
     * Parse an HSL string into its component values
     * @param {string} hsl - HSL color string (e.g. "hsl(0, 100%, 50%)")
     * @returns {Object} - Object with h, s, l properties
     */
    static parseHSL(hsl) {
        const values = hsl.match(/\d+/g);
        return {
            h: parseInt(values[0]),
            s: parseInt(values[1]),
            l: parseInt(values[2]),
        };
    }

    /**
     * Convert RGB to HSL format
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {string} - HSL color string (e.g. "hsl(0, 100%, 50%)")
     */
    static rgbToHSL(r, g, b) {
        // Convert RGB to decimals
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        const cmin = Math.min(r, g, b);
        const cmax = Math.max(r, g, b);
        const delta = cmax - cmin;
        let h = 0;
        let s = 0;
        let l = 0;

        // Calculate hue
        if (delta === 0) {
            h = 0;
        } else if (cmax === r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Convert to percentages
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    /**
     * Convert HSL to RGB format
     * @param {number} h - Hue (0-360)
     * @param {number} s - Saturation (0-100)
     * @param {number} l - Lightness (0-100)
     * @returns {string} - RGB color string (e.g. "rgb(255, 0, 0)")
     */
    static hslToRGB(h, s, l) {
        // Convert HSL percentages to decimals
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        // Convert to 0-255
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Convert a color to the specified format
     * @param {string} color - Color in any format
     * @param {string} format - Target format ('hex', 'rgb', or 'hsl')
     * @returns {string} - Color in the target format
     */
    static convertColorFormat(color, format) {
        // Determine the current format of the color
        let currentFormat;
        if (color.startsWith("#")) {
            currentFormat = "hex";
        } else if (color.startsWith("rgb")) {
            currentFormat = "rgb";
        } else if (color.startsWith("hsl")) {
            currentFormat = "hsl";
        } else {
            throw new Error("Unknown color format");
        }

        // If already in target format, return as is
        if (currentFormat === format) {
            return color;
        }

        // Convert to the target format
        if (currentFormat === "hex") {
            if (format === "rgb") {
                return this.hexToRGB(color);
            } else if (format === "hsl") {
                return this.hexToHSL(color);
            }
        } else if (currentFormat === "rgb") {
            const rgb = this.parseRGB(color);
            if (format === "hex") {
                return this.rgbToHex(rgb.r, rgb.g, rgb.b);
            } else if (format === "hsl") {
                return this.rgbToHSL(rgb.r, rgb.g, rgb.b);
            }
        } else if (currentFormat === "hsl") {
            const hsl = this.parseHSL(color);
            if (format === "hex") {
                return this.hslToHex(hsl.h, hsl.s, hsl.l);
            } else if (format === "rgb") {
                return this.hslToRGB(hsl.h, hsl.s, hsl.l);
            }
        }

        throw new Error("Conversion not supported");
    }

    static calculateTriadicColors(color) {
        const rgb = this.parseRGB(color);
        const r = rgb.r;
        const g = rgb.g;
        const b = rgb.b;

        const triadicColors = {
            hex: [this.rgbToHex(r, g, b), this.rgbToHex(b, r, g), this.rgbToHex(g, b, r)],
            rgb: [`rgb(${r}, ${g}, ${b})`, `rgb(${b}, ${r}, ${g})`, `rgb(${g}, ${b}, ${r})`],
            hsl: [this.rgbToHSL(r, g, b), this.rgbToHSL(b, r, g), this.rgbToHSL(g, b, r)],
        };

        return triadicColors;
    }
}
