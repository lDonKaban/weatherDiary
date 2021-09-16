import {postData} from '../services/services';
import formData from './fomData';
import showData from './showData';

function postDay (formSelector) {

    const json = formData(formSelector);

    postData('http://localhost:3000/weather', json)
        .then(() => {
            document.querySelector('.weather__data').innerHTML = '';
            
            showData('http://localhost:3000/weather');
        })
        .finally(() => {
            formSelector.reset();
        });
}

export default postDay;
