const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// console.log(authToken)







const DEFAULT_REDIS_EXPIRATION = 3600

const sendMessage = async (to, message = '') => {
    return await client.messages
        .create({
            from: `whatsapp:+14155238886`,
            body: message,
            to: `whatsapp:${to}`
        })
        .then(message => {
            // console.log(message)
            return message
        })
        .catch(e => {
            console.log(e)
            console.log(e)
        })
}



module.exports = {sendMessage}
