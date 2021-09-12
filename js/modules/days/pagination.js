import WeatherCards from './weatherCards';

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
                new WeatherCards (dateTime, orientation, temp, pressure, windSpeed, wet, cloudy, windDirection, naturalPhenomenal).createCard();
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
                    new WeatherCards (dateTime, orientation, temp, pressure, windSpeed, wet, cloudy, windDirection, naturalPhenomenal).createCard();
                });
        });
    }
}

export default pagination;