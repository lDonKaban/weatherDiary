import {tooltip} from './tooltip';
import {css, isOver, toDate, circle, line, boundaries, toCoords, computeXRatio, computeYRatio} from './utils';
import {sliderChart} from './slider';

function chart (root, data) {

    const WIDTH = 600,
          HEIGHT = 200,
          PADDING = 40,
          DPI_WIDTH = WIDTH * 2,
          DPI_HEIGHT = HEIGHT * 2,
          VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2,
          VIEW_WIDTH = DPI_WIDTH,
          selectedChart = document.querySelector('#change_charts').value;
    let ROWS_COUNT = 5,
        raf;

    const canvas = root.querySelector('[data-el="main"]'),
          tip = tooltip(root.querySelector('[data-el="tooltip"]')),
          ctx = canvas.getContext('2d');
    let yData = [],
        xData = [];

        data.sort((prev, next) => new Date(prev.dateTime).getTime() - new Date(next.dateTime).getTime());

        data.forEach(el => {
            xData.push(el.dateTime);
            if (selectedChart === 'Температура') {
                yData.push(+(el.orientation + el.temp));    
            } else if (selectedChart === 'Давление') {
                yData.push(+(el.pressure));
            }
        });

    const slider = sliderChart(root.querySelector('[data-el="slider"]'), yData, DPI_WIDTH, selectedChart);

    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    css(canvas, {
        width: WIDTH + 'px',
        height: HEIGHT + 'px'
    });

    const proxy = new Proxy (
        {},
        {
            set(...args) {
                const result = Reflect.set(...args);
                raf = requestAnimationFrame(paint);
                return result;
            },
        }
    );

    slider.subscribe(pos => {
        proxy.pos = pos;
    });

    function mousemove ({ clientX, clientY }) {
        const { left, top } = canvas.getBoundingClientRect();
        proxy.mouse = {
            x: (clientX - left) * 2,
            tooltip: {
                left: clientX - left,
                top: clientY - top,
            }
        };
    }

    function mouseleave () {
        proxy.mouse = null;
        tip.hide();
    }

    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseleave', mouseleave);

    function clear () {
        ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
    }

    function paint () {
        clear();

        const length = data.length,
              leftIndex = Math.round((length * proxy.pos[0]) / 100),
              rightIndex = Math.round((length * proxy.pos[1]) / 100),
              viewDataY = yData.slice(leftIndex, rightIndex),
              viewDataX = xData.slice(leftIndex, rightIndex),
              [yMin, yMax] = boundaries(viewDataY);
              
        
        if (length < 5) {
            ROWS_COUNT = length;
        }

        let yRatio, 
            xRatio;

        if (data.length === 2) {
            yRatio = 1;
        } else {
            yRatio = computeYRatio(VIEW_HEIGHT, yMax, yMin);
        }
            xRatio = computeXRatio(VIEW_WIDTH, viewDataX.length);

        yAxis(yMin, yMax);
        xAxis(viewDataX, viewDataY, xRatio);

        const coords = viewDataY.map(toCoords(xRatio, yRatio, DPI_HEIGHT, PADDING, yMin));
        line(ctx, coords, selectedChart);

        for (const [x, y] of coords) {
            if (isOver(proxy.mouse, x, coords.length, DPI_WIDTH)) {
                circle(ctx, [x, y]);
                break;
            }
        }
    }

    function xAxis (xData, yData, xRatio) {
        const colsCount = 6;
        let step;

        if (xData.length === 1) {
            step = 1;
        } else if (xData.length < colsCount) {
            step = 2;
        } else {
            step = Math.round(xData.length / colsCount);
        }

        ctx.beginPath();
        if (step === 1 || step === 2) {
            for (let i = 0; i < xData.length; i++) {
                let x = i * xRatio;

                if (xData.length === 1) {
                    x = DPI_WIDTH / 2;
                } else if (xData.length < colsCount && x >= 1200) {
                    x = 1100;
                }
                const text = toDate(xData[i]);
                ctx.fillText(text.toString(), x + 10, DPI_HEIGHT - 10);
                
                if (isOver(proxy.mouse, x, xData.length, DPI_WIDTH)) {
                    ctx.save();
                    ctx.moveTo(x, PADDING / 2);
                    ctx.lineTo(x, DPI_HEIGHT - PADDING);
                    ctx.restore();

                    if (selectedChart === 'Температура') {
                        tip.show(proxy.mouse.tooltip, {
                            title: toDate(xData[i]),
                            items: {
                                color: '#ff0000',
                                name: 'Температура',
                                value: yData[i],
                            },
                        });
                    } else if (selectedChart === 'Давление') {
                        tip.show(proxy.mouse.tooltip, {
                            title: toDate(xData[i]),
                            items: {
                                color: 'rgb(4, 101, 165)',
                                name: 'Давление',
                                value: yData[i],
                            },
                        });
                    }
                }
            }
            ctx.stroke();
            ctx.closePath();
            return;
        }

        for (let i = 0; i < xData.length; i++) {
            const x = i * xRatio;
    
            if (i % step === 0) {
                const text = toDate(xData[i]);
                ctx.fillText(text.toString(), x + 10, DPI_HEIGHT - 10);
            }
    
            if (isOver(proxy.mouse, x, xData.length, DPI_WIDTH)) {
                ctx.save();
                ctx.moveTo(x, PADDING / 2);
                ctx.lineTo(x, DPI_HEIGHT - PADDING);
                ctx.restore();

                if (selectedChart === 'Температура') {
                    tip.show(proxy.mouse.tooltip, {
                        title: toDate(xData[i]),
                        items: {
                            color: '#ff0000',
                            name: 'Температура',
                            value: yData[i],
                        },
                    });
                } else if (selectedChart === 'Давление') {
                    tip.show(proxy.mouse.tooltip, {
                        title: toDate(xData[i]),
                        items: {
                            color: 'rgb(4, 101, 165)',
                            name: 'Давление',
                            value: yData[i],
                        },
                    });
                }
            }
        }
        ctx.stroke();
        ctx.closePath();
    }

    function yAxis (yMin, yMax) {
        const step = VIEW_HEIGHT / ROWS_COUNT,
              textStep = (yMax - yMin) / ROWS_COUNT;
    
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#bbb';
        ctx.font = 'normal 20px Helvetica, sans-serif';
        ctx.fillStyle = '#96a2aa';
        for (let i = 1; i <= ROWS_COUNT; i++) {
            const y = step * i,
                  text = Math.round(yMax - textStep * i);
    
            ctx.fillText(text.toString(), 5, y + PADDING - 10);
            ctx.moveTo(0, y + PADDING);
            ctx.lineTo(DPI_WIDTH, y + PADDING);
        }
        ctx.stroke();
        ctx.closePath();
    }

    return {
        init() {
            paint();
        },
        destroy() {
            cancelAnimationFrame(raf);
            canvas.removeEventListener('mousemove', mousemove);
            canvas.removeEventListener('mouseleave', mouseleave);
        },
    };
}

export default chart;