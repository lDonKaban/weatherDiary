import { getData } from "../services/services";
import pagination from "./pagination";

function showData (url) {
    const notesOnPage = 7;

    getData(url)
        .then(data => {
            pagination(data, notesOnPage);
        });
}

export default showData;