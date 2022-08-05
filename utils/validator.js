const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken)

const genCode = (selections = "1234567890", lenght = 6) => {
    let password = "";
    for (let index = 0; index < lenght; index++) {
        password += selections[Math.floor(Math.random() * selections.length)];


    }
    return password;
}
const validPhoneNumber = async (number) => {
    console.log(number, "checking")
    try {
        const phone_number = await client.lookups.v1.phoneNumbers(`${number}`)
            .fetch();
        return phone_number;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
const sendCode = async (number, code = null) => {
    try {
        const verification = await client.verify.v2.services(`${process.env.SERV_TWI}`)
            .verifications
            .create({ to: `${number}`, channel: 'whatsapp' });
        return verification;
    } catch (err) {
        console.log(err);
        throw err;
    }
    
}
const validateCode = async (number, code) => {

    try {
        const verification = await client.verify.v2.services(`${process.env.SERV_TWI}`)
            .verificationChecks
            .create({ to: `${number}`, channel: 'whatsapp', code:code });
        return verification;
    } catch (err) {
        console.log(err);
        throw err;
    }
    
}

module.exports = { validPhoneNumber, sendCode, genCode, validateCode }