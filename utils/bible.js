const axios = require("axios");
const BIBLE_URL = 'https://labs.bible.org/api/?passage=random&formatting=plain'


const getQuote = async ( ) => {
    const options = {
        method: 'GET',
        url: 'https://labs.bible.org/api/?passage=random&formatting=plain'

    };
    return await axios.request(options)
        .then(function (response) {
            console.log(response.data);
            return response.data

        })
}

module.exports = { getQuote }