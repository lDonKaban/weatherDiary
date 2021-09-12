"use strict";

import chart from './modules/paint/chart';
import {getData} from './modules/services/services';
import postDay from './modules/days/postDay';
import showData from './modules/days/showData';
import filterCards from './modules/days/filterCards';
import changeCharts from './modules/paint/changeCharts';

window.addEventListener('DOMContentLoaded', () => {
    const formCards = document.querySelector('.new_day__form'),
          formFilter = document.querySelector('.filter__date'),
          OffFilterBtn = document.querySelector('.filterOffBtn'),
          selectCharts = document.querySelector('#change_charts');
    
    showData('http://localhost:3000/weather');
    
    getData('http://localhost:3000/weather')
        .then(data => {
            data.sort((prev, next) => new Date(prev.dateTime).getTime() - new Date(next.dateTime).getTime());
            const wChart = chart(document.querySelector('#chart'), data);
            wChart.init();
        });

    formCards.addEventListener('submit', e => {
        e.preventDefault();

        postDay(formCards);      
    });

    formFilter.addEventListener('submit', e => {
        e.preventDefault();
        
        document.querySelector('.weather__data').innerHTML = '';
        filterCards(formFilter);
    });

    OffFilterBtn.addEventListener('click', () => {
        document.querySelector('.weather__data').innerHTML = '';

        formFilter.reset();

        showData('http://localhost:3000/weather');

        getData('http://localhost:3000/weather')
        .then(data => {
            data.sort((prev, next) => new Date(prev.dateTime).getTime() - new Date(next.dateTime).getTime());
            const wChart = chart(document.querySelector('#chart'), data);
            wChart.init();
        });
    });

    selectCharts.addEventListener('change', () => {
        changeCharts();
    });
});
