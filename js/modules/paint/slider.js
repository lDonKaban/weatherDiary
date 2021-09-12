import {boundaries, toCoords, line, css, computeXRatio, computeYRatio} from './utils';

function noop() {}

const HEIGHT = 40,
      DPI_HEIGHT = HEIGHT * 2;

export function sliderChart (root, data, DPI_WIDTH, selectedChart) {
    const WIDTH = DPI_WIDTH / 2,
          MIN_WIDTH = WIDTH * 0.2,
          canvas = root.querySelector('canvas'),
          ctx = canvas.getContext('2d'),
          [yMin, yMax] = boundaries(data),  
          yRatio = computeYRatio(DPI_HEIGHT, yMax, yMin),
          xRatio = computeXRatio(DPI_WIDTH, data.length);
    let nextFn = noop;

    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    css(canvas, {
        width: WIDTH + 'px',
        height: HEIGHT + 'px'
    });

    const $left = root.querySelector('[data-el="left"]'),
          $window = root.querySelector('[data-el="window"]'),
          $right = root.querySelector('[data-el="right"]');

    function next() {
        nextFn(getPosition());
    }

    function mousedown(event) {
        const type = event.target.dataset.type,
              dimensions = {
                  right: parseInt($window.style.right),
                  left: parseInt($window.style.left),
                  width: parseInt($window.style.width)
              };

        if (type === 'window') {
            const startX = event.pageX;
            document.onmousemove = e => {
                const delta = startX - e.pageX;

                if (delta === 0) {
                    return;
                }

                const left = dimensions.left - delta,
                      right = WIDTH - left - dimensions.width;
                
                setPosition(left, right);
                next();
            };
        } else if (type === 'left' || type === 'right') {
            const startX = event.pageX;
            document.onmousemove = e => {
                const delta = startX - e.pageX;

                if (delta === 0) {
                    return;
                }

                if (type === 'left') {
                    const left = WIDTH - (dimensions.width + delta) - dimensions.right,
                          right = WIDTH - (dimensions.width + delta) - left;
                    setPosition(left, right);
                } else {
                    const right = WIDTH - (dimensions.width - delta) - dimensions.left;
                    setPosition(dimensions.left, right);
                }
                next();
            };
        }
    }

    function mouseup () {
        document.onmousemove = null;
    }

    root.addEventListener('mousedown', mousedown);
    document.addEventListener('mouseup', mouseup);

    const defaultWidth = WIDTH * 0.3;
    setPosition(0, WIDTH - defaultWidth);

    function setPosition(left, right) {
        const w = WIDTH - right - left;
        
        if (w < MIN_WIDTH) {
            css($window, {width: MIN_WIDTH + 'px'});
            return;
        }

        if (left < 0) {
            css($window, {left: '0px'});
            css($left, {width: '0px'});
            return;
        }

        if (right < 0) {
            css($window, {right: '0px'});
            css($right, {width: '0px'});
            return;
        }

        css($window, {
            width: w + 'px',
            left: left + 'px',
            right: right + 'px'
        });

        css($right, {width: right + 'px'});
        css($left, {width: left + 'px'});
    }

    function getPosition() {
        const left = parseInt($left.style.width),
              right = WIDTH - parseInt($right.style.width);
        
        return [(left * 100) / WIDTH, (right * 100) / WIDTH];
    }

    const coords = data.map(toCoords(xRatio, yRatio, DPI_HEIGHT, 0, yMin));
    line(ctx, coords, selectedChart);

    return {
        subscribe(fn) {
            nextFn = fn;
            fn(getPosition());
        }
    };
}