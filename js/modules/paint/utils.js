export function computeYRatio (height, max, min) {
    return (max - min) / height;
}

export function computeXRatio (width, length) {
    return width / (length - 1);
}

export function toDate(timestamp) {
    const shortMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const date = new Date(timestamp);

    return `${shortMonths[date.getMonth()]} ${date.getDate()}`;
}

export function isOver (mouse, x, length, dWidth) {
    if (!mouse) {
        return false;
    }
    const width = dWidth / length;
    return Math.abs(x - mouse.x) < width / 2;
}

export function line (ctx, coords, selectedChart) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    if (selectedChart === 'Температура') {
        ctx.strokeStyle = '#ff0000';    
    } else if (selectedChart === 'Давление') {
        ctx.strokeStyle = 'rgb(4, 101, 165)';
    }
    for (const [x, y] of coords) {
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();
}

export function circle (ctx, [x, y]) {
    const CIRCLE_RADIUS = 8;
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(x, y, CIRCLE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

export function boundaries (data) {
    let min,
        max;

    data.forEach(el => {
        if (typeof min !== 'number') min = el;
        if (typeof max !== 'number') max = el;

        if (min > el) min = el;
        if (max < el) max = el;
    });

    return [min, max];
}

export function css(el, styles = {}) {
    Object.assign(el.style, styles);
  }

export function toCoords (xRatio, yRatio, DPI_HEIGHT, PADDING, yMin) {
    return (y, i) => 
        [
            Math.floor(i * xRatio),
            Math.floor(DPI_HEIGHT - PADDING - (y - yMin) / yRatio)
        ];
}