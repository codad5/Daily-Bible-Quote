require('dotenv').config()
const axios = require("axios");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
var cron = require('node-cron');

// console.log(authToken)



const sendNewQuote = () => {
    
    const options = {
    method: 'GET',
        url: 'https://labs.bible.org/api/?passage=random&formatting=plain'
    
    };
    axios.request(options)
        .then(function (response) {
            console.log(response.data);
            return response.data

        })
        .then(data => {
            client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    body: data,
                    to: 'whatsapp:+2348142572488'
                })
                .then(message => console.log(message.sid))
                .catch(e => { console.log(e) });


        }).catch(function (error) {
            console.error(error);
        });
}

sendNewQuote()

cron.schedule('* * 23 * *', () => {
    console.log('running a task every 23 hrs');
    sendNewQuote()
    
});