import { getData } from "../services/services";
import chart from "./chart";

function changeCharts () {
    getData('http://localhost:3000/weather')
        .then(data => {
            data.sort((prev, next) => new Date(prev.dateTime).getTime() - new Date(next.dateTime).getTime());
            const wChart = chart(document.querySelector('#chart'), data);
            wChart.init();
        });
}

export default changeCharts;