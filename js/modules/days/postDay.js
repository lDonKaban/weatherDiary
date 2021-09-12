import {postData} from '../services/services';

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