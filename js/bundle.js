/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/days/filterCards.js":
/*!****************************************!*\
  !*** ./js/modules/days/filterCards.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/modules/services/services.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./js/modules/days/pagination.js");
/* harmony import */ var _formData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formData */ "./js/modules/days/formData.js");
/* harmony import */ var _paint_chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../paint/chart */ "./js/modules/paint/chart.js");





async function filterCards (formSelector) {
    const json = (0,_formData__WEBPACK_IMPORTED_MODULE_2__["default"])(formSelector),
          fromDate = new Date(JSON.parse(json).fromDate).getTime(),
          toDate = new Date(JSON.parse(json).toDate).getTime(),
          filteredCards = [];

    await (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/weather')
        .then((data) => {
            data.forEach((e) => {
                if (new Date(e.dateTime).getTime() >= fromDate && new Date(e.dateTime).getTime() <= toDate) {
                    filteredCards.push(e);
                }
            });
            (0,_pagination__WEBPACK_IMPORTED_MODULE_1__["default"])(filteredCards);
            const wChart = (0,_paint_chart__WEBPACK_IMPORTED_MODULE_3__["default"])(document.querySelector('#chart'), filteredCards);
            wChart.init();
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filterCards);

/***/ }),

/***/ "./js/modules/days/formData.js":
/*!*************************************!*\
  !*** ./js/modules/days/formData.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function formData (formSelector) {
    const formData = new FormData(formSelector),
          json = JSON.stringify(Object.fromEntries(formData.entries()));

    return json;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formData);

/***/ }),

/***/ "./js/modules/days/pagination.js":
/*!***************************************!*\
  !*** ./js/modules/days/pagination.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _weatherCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherCards */ "./js/modules/days/weatherCards.js");


function pagination (array, notesOnPage = 7) {
    const pagination = document.querySelector('#pagination'),
          items = [];

    const res = Math.ceil(array.length / notesOnPage),
          firstPage = array.slice(0, notesOnPage);
    pagination.innerHTML = '';
    for(let i = 1; i <= res; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        pagination.append(li);
        items.push(li);
    }
    
    items[0].classList.add('active');
            firstPage.forEach(({dateTime, orientation, temp, pressure, windSpeed, wet, cloudy, windDirection, naturalPhenomenal}) => {
                new _weatherCards__WEBPACK_IMPORTED_MODULE_0__["default"] (dateTime, orientation, temp, pressure, windSpeed, wet, cloudy, windDirection, naturalPhenomenal).createCard();
            });

    for (let item of items) {
        item.addEventListener('click', function() {
            items.forEach(i => {
                i.classList.remove('active');
            });
            let pageNum = +this.innerHTML,
                firstItemOnPage = (pageNum - 1) * notesOnPage,
                lastItemOnPage = firstItemOnPage + notesOnPage,
                notes = array.slice(firstItemOnPage, lastItemOnPage);

                item.classList.add('active');
                document.querySelector('.weather__data').innerHTML = '';
                notes.forEach(({dateTime, orientation, temp, pressure, windSpeed, wet, cloudy, windDirection, naturalPhenomenal}) => {
                    new _weatherCards__WEBPACK_IMPORTED_MODULE_0__["default"] (dateTime, orientation, temp, pressure, windSpeed, wet, cloudy, windDirection, naturalPhenomenal).createCard();
                });
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pagination);

/***/ }),

/***/ "./js/modules/days/postDay.js":
/*!************************************!*\
  !*** ./js/modules/days/postDay.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/modules/services/services.js");


function postDay (formSelector) {

    const json = formData(formSelector);

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/weather', json)
        .then(() => {
            document.querySelector('.weather__data').innerHTML = '';
            
            showData('http://localhost:3000/weather');
        })
        .finally(() => {
            formSelector.reset();
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postDay);

/***/ }),

/***/ "./js/modules/days/showData.js":
/*!*************************************!*\
  !*** ./js/modules/days/showData.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/modules/services/services.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./js/modules/days/pagination.js");



function showData (url) {
    const notesOnPage = 7;

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)(url)
        .then(data => {
            (0,_pagination__WEBPACK_IMPORTED_MODULE_1__["default"])(data, notesOnPage);
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showData);

/***/ }),

/***/ "./js/modules/days/weatherCards.js":
/*!*****************************************!*\
  !*** ./js/modules/days/weatherCards.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class WeatherCards {
    constructor (dateTime, orientation, temperature, pressure, windSpeed, wet, cloudiness, windDirection, naturalPhenomena) {
        this.dateTime = dateTime;
        this.orientation = orientation;
        this.temperature = temperature;
        this.pressure = pressure;
        this.windSpeed = windSpeed;
        this.wet = wet;
        this.cloudiness = cloudiness;
        this.windDirection = windDirection;
        this.naturalPhenomena = naturalPhenomena;
    }

    createCard () {
        const card = document.createElement('div'),
              parent = document.querySelector('.weather__data');

        card.classList.add('day');

        card.innerHTML = `
            <div class="card card__date"><b>Дата:</b> ${this.dateTime.match(/^[^T]*/)}</div>
            <div class="card card__time"><b>Время:</b> ${this.dateTime.match(/(?<=T).*/)}</div>
            <div class="card card__temperature"><b>Температура:</b> ${this.orientation}${this.temperature}C</div>
            <div class="card card__pressure"><b>Давление:</b> ${this.pressure} мм.рт.ст.</div>
            <div class="card card__windSpeed"><b>Скорость ветра:</b> ${this.windSpeed} м/с</div>
            <div class="card card__wet"><b>Влажность:</b> ${this.wet}%</div>
            <div class="card card__cloudiness"><b>Облачность:</b> ${this.cloudiness}</div>
            <div class="card card__windDirection"><b>Направление ветра:</b> ${this.windDirection}</div>
            <div class="card card__naturalPhenomena"><b>Природное явление:</b> ${this.naturalPhenomena}</div>
        `;

        parent.append(card);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WeatherCards);

/***/ }),

/***/ "./js/modules/paint/changeCharts.js":
/*!******************************************!*\
  !*** ./js/modules/paint/changeCharts.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/modules/services/services.js");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart */ "./js/modules/paint/chart.js");



function changeCharts () {
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/weather')
        .then(data => {
            data.sort((prev, next) => new Date(prev.dateTime).getTime() - new Date(next.dateTime).getTime());
            const wChart = (0,_chart__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelector('#chart'), data);
            wChart.init();
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeCharts);

/***/ }),

/***/ "./js/modules/paint/chart.js":
/*!***********************************!*\
  !*** ./js/modules/paint/chart.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tooltip */ "./js/modules/paint/tooltip.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./js/modules/paint/utils.js");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider */ "./js/modules/paint/slider.js");




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
          tip = (0,_tooltip__WEBPACK_IMPORTED_MODULE_0__.tooltip)(root.querySelector('[data-el="tooltip"]')),
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

    const slider = (0,_slider__WEBPACK_IMPORTED_MODULE_2__.sliderChart)(root.querySelector('[data-el="slider"]'), yData, DPI_WIDTH, selectedChart);

    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.css)(canvas, {
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
              [yMin, yMax] = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.boundaries)(viewDataY);
              
        
        if (length < 5) {
            ROWS_COUNT = length;
        }

        let yRatio, 
            xRatio;

        if (data.length === 2) {
            yRatio = 1;
        } else {
            yRatio = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computeYRatio)(VIEW_HEIGHT, yMax, yMin);
        }
            xRatio = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computeXRatio)(VIEW_WIDTH, viewDataX.length);

        yAxis(yMin, yMax);
        xAxis(viewDataX, viewDataY, xRatio);

        const coords = viewDataY.map((0,_utils__WEBPACK_IMPORTED_MODULE_1__.toCoords)(xRatio, yRatio, DPI_HEIGHT, PADDING, yMin));
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.line)(ctx, coords, selectedChart);

        for (const [x, y] of coords) {
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isOver)(proxy.mouse, x, coords.length, DPI_WIDTH)) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.circle)(ctx, [x, y]);
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
                const text = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toDate)(xData[i]);
                ctx.fillText(text.toString(), x + 10, DPI_HEIGHT - 10);
                
                if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isOver)(proxy.mouse, x, xData.length, DPI_WIDTH)) {
                    ctx.save();
                    ctx.moveTo(x, PADDING / 2);
                    ctx.lineTo(x, DPI_HEIGHT - PADDING);
                    ctx.restore();

                    if (selectedChart === 'Температура') {
                        tip.show(proxy.mouse.tooltip, {
                            title: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toDate)(xData[i]),
                            items: {
                                color: '#ff0000',
                                name: 'Температура',
                                value: yData[i],
                            },
                        });
                    } else if (selectedChart === 'Давление') {
                        tip.show(proxy.mouse.tooltip, {
                            title: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toDate)(xData[i]),
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
                const text = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toDate)(xData[i]);
                ctx.fillText(text.toString(), x + 10, DPI_HEIGHT - 10);
            }
    
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isOver)(proxy.mouse, x, xData.length, DPI_WIDTH)) {
                ctx.save();
                ctx.moveTo(x, PADDING / 2);
                ctx.lineTo(x, DPI_HEIGHT - PADDING);
                ctx.restore();

                if (selectedChart === 'Температура') {
                    tip.show(proxy.mouse.tooltip, {
                        title: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toDate)(xData[i]),
                        items: {
                            color: '#ff0000',
                            name: 'Температура',
                            value: yData[i],
                        },
                    });
                } else if (selectedChart === 'Давление') {
                    tip.show(proxy.mouse.tooltip, {
                        title: (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toDate)(xData[i]),
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chart);

/***/ }),

/***/ "./js/modules/paint/slider.js":
/*!************************************!*\
  !*** ./js/modules/paint/slider.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sliderChart": () => (/* binding */ sliderChart)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/modules/paint/utils.js");


function noop() {}

const HEIGHT = 40,
      DPI_HEIGHT = HEIGHT * 2;

function sliderChart (root, data, DPI_WIDTH, selectedChart) {
    const WIDTH = DPI_WIDTH / 2,
          MIN_WIDTH = WIDTH * 0.2,
          canvas = root.querySelector('canvas'),
          ctx = canvas.getContext('2d'),
          [yMin, yMax] = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.boundaries)(data),  
          yRatio = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.computeYRatio)(DPI_HEIGHT, yMax, yMin),
          xRatio = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.computeXRatio)(DPI_WIDTH, data.length);
    let nextFn = noop;

    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)(canvas, {
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
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($window, {width: MIN_WIDTH + 'px'});
            return;
        }

        if (left < 0) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($window, {left: '0px'});
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($left, {width: '0px'});
            return;
        }

        if (right < 0) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($window, {right: '0px'});
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($right, {width: '0px'});
            return;
        }

        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($window, {
            width: w + 'px',
            left: left + 'px',
            right: right + 'px'
        });

        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($right, {width: right + 'px'});
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)($left, {width: left + 'px'});
    }

    function getPosition() {
        const left = parseInt($left.style.width),
              right = WIDTH - parseInt($right.style.width);
        
        return [(left * 100) / WIDTH, (right * 100) / WIDTH];
    }

    const coords = data.map((0,_utils__WEBPACK_IMPORTED_MODULE_0__.toCoords)(xRatio, yRatio, DPI_HEIGHT, 0, yMin));
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.line)(ctx, coords, selectedChart);

    return {
        subscribe(fn) {
            nextFn = fn;
            fn(getPosition());
        }
    };
}

/***/ }),

/***/ "./js/modules/paint/tooltip.js":
/*!*************************************!*\
  !*** ./js/modules/paint/tooltip.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tooltip": () => (/* binding */ tooltip)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/modules/paint/utils.js");


const template = (data) => `
    <div class="tooltip-title">${data.title}</div>
    <ul class="tooltip-list">
        <li class="tooltip-list-item">
                    <div class="value" style="color: ${data.items.color}">${data.items.value}</div>
                    <div class="name" style="color: ${data.items.color}">${data.items.name}</div>    
                </li>
    </ul> 
`;

function tooltip (el) {
    const clear = () => (el.innerHTML = '');
    return {
        show ({ left, top }, data) {
            const { height, width } = el.getBoundingClientRect();
            clear();
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)(el, {
                display: 'block',
                top: top - height + 'px',
                left: left + width / 2 + 'px'
            });
            el.insertAdjacentHTML('afterbegin', template(data));
        },
        hide () {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.css)(el, {display: 'none'});
        }
    };
}

/***/ }),

/***/ "./js/modules/paint/utils.js":
/*!***********************************!*\
  !*** ./js/modules/paint/utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computeYRatio": () => (/* binding */ computeYRatio),
/* harmony export */   "computeXRatio": () => (/* binding */ computeXRatio),
/* harmony export */   "toDate": () => (/* binding */ toDate),
/* harmony export */   "isOver": () => (/* binding */ isOver),
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "circle": () => (/* binding */ circle),
/* harmony export */   "boundaries": () => (/* binding */ boundaries),
/* harmony export */   "css": () => (/* binding */ css),
/* harmony export */   "toCoords": () => (/* binding */ toCoords)
/* harmony export */ });
function computeYRatio (height, max, min) {
    return (max - min) / height;
}

function computeXRatio (width, length) {
    return width / (length - 1);
}

function toDate(timestamp) {
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

function isOver (mouse, x, length, dWidth) {
    if (!mouse) {
        return false;
    }
    const width = dWidth / length;
    return Math.abs(x - mouse.x) < width / 2;
}

function line (ctx, coords, selectedChart) {
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

function circle (ctx, [x, y]) {
    const CIRCLE_RADIUS = 8;
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(x, y, CIRCLE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function boundaries (data) {
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

function css(el, styles = {}) {
    Object.assign(el.style, styles);
  }

function toCoords (xRatio, yRatio, DPI_HEIGHT, PADDING, yMin) {
    return (y, i) => 
        [
            Math.floor(i * xRatio),
            Math.floor(DPI_HEIGHT - PADDING - (y - yMin) / yRatio)
        ];
}

/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const getData = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    res = await res.json();

    return res.sort((prev, next) => new Date(next.dateTime).getTime() - new Date(prev.dateTime).getTime());
};

const postData = async (url, data) => {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_paint_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/paint/chart */ "./js/modules/paint/chart.js");
/* harmony import */ var _modules_services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/services/services */ "./js/modules/services/services.js");
/* harmony import */ var _modules_days_postDay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/days/postDay */ "./js/modules/days/postDay.js");
/* harmony import */ var _modules_days_showData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/days/showData */ "./js/modules/days/showData.js");
/* harmony import */ var _modules_days_filterCards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/days/filterCards */ "./js/modules/days/filterCards.js");
/* harmony import */ var _modules_paint_changeCharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/paint/changeCharts */ "./js/modules/paint/changeCharts.js");









window.addEventListener('DOMContentLoaded', () => {
    const formCards = document.querySelector('.new_day__form'),
          formFilter = document.querySelector('.filter__date'),
          OffFilterBtn = document.querySelector('.filterOffBtn'),
          selectCharts = document.querySelector('#change_charts');
    
    (0,_modules_days_showData__WEBPACK_IMPORTED_MODULE_3__["default"])('http://localhost:3000/weather');
    
    (0,_modules_services_services__WEBPACK_IMPORTED_MODULE_1__.getData)('http://localhost:3000/weather')
        .then(data => {
            data.sort((prev, next) => new Date(prev.dateTime).getTime() - new Date(next.dateTime).getTime());
            const wChart = (0,_modules_paint_chart__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelector('#chart'), data);
            wChart.init();
        });

    formCards.addEventListener('submit', e => {
        e.preventDefault();

        (0,_modules_days_postDay__WEBPACK_IMPORTED_MODULE_2__["default"])(formCards);      
    });

    formFilter.addEventListener('submit', e => {
        e.preventDefault();
        
        document.querySelector('.weather__data').innerHTML = '';
        (0,_modules_days_filterCards__WEBPACK_IMPORTED_MODULE_4__["default"])(formFilter);
    });

    OffFilterBtn.addEventListener('click', () => {
        document.querySelector('.weather__data').innerHTML = '';

        formFilter.reset();

        (0,_modules_days_showData__WEBPACK_IMPORTED_MODULE_3__["default"])('http://localhost:3000/weather');

        (0,_modules_services_services__WEBPACK_IMPORTED_MODULE_1__.getData)('http://localhost:3000/weather')
        .then(data => {
            data.sort((prev, next) => new Date(prev.dateTime).getTime() - new Date(next.dateTime).getTime());
            const wChart = (0,_modules_paint_chart__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelector('#chart'), data);
            wChart.init();
        });
    });

    selectCharts.addEventListener('change', () => {
        (0,_modules_paint_changeCharts__WEBPACK_IMPORTED_MODULE_5__["default"])();
    });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map