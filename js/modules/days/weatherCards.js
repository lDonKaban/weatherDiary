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

export default WeatherCards;