const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');

const hexToRgb = hex => {
    const rgbArr = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));

    return `rgb(${rgbArr.join(', ')})`;
}

console.log(rgbToHex(0, 51, 255)); // #0033ff
console.log(hexToRgb('#fff')); // rgb(255, 255, 255)