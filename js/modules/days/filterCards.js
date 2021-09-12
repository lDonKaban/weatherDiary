import {getData} from '../services/services';
import pagination from './pagination';
import formData from './formData';
import chart from '../paint/chart';

async function filterCards (formSelector) {
    const json = formData(formSelector),
          fromDate = new Date(JSON.parse(json).fromDate).getTime(),
          toDate = new Date(JSON.parse(json).toDate).getTime(),
          filteredCards = [];

    await getData('http://localhost:3000/weather')
        .then((data) => {
            data.forEach((e) => {
                if (new Date(e.dateTime).getTime() >= fromDate && new Date(e.dateTime).getTime() <= toDate) {
                    filteredCards.push(e);
                }
            });
            pagination(filteredCards);
            const wChart = chart(document.querySelector('#chart'), filteredCards);
            wChart.init();
        });
}

export default filterCards;