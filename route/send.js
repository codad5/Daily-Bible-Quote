const express = require('express')
const route = express.Router()

//others
const { validPhoneNumber, sendCode, validateCode } = require('../utils/validator')
const { connect, disconnect } = require("../services/db");
const Redis = require('ioredis')
const redisClient = new Redis()
const userController = require('../controller/user')
require('dotenv').config()
const axios = require("axios");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
var cron = require('node-cron');
const {getQuote} = require('../utils/bible')
// console.log(authToken)







const DEFAULT_REDIS_EXPIRATION = 3600

route.route('/')
    .get(async (req, res) => {
        try{
        const qoute = await getQuote()
        const users = await userController.getAll()
        console.log(users)
        users.forEach(async user => {
            console.log(user?.phone)
            await client.messages
                .create({
                    from: `whatsapp:+14155238886`,
                    body: qoute,
                    to: `whatsapp:${user?.phone}`
                })
                .then(message => console.log(message))
                .catch(e => { console.log(e)
                        console.log(e)
                })
.finally(() => {
                    res.send({})
                })
        })
        //console.log()
        //return res.render('index')
    }
    catch(err) {
            await client.messages
                .create({
                    from: `whatsapp:+14155238886`,
                    body: `quote error ${err.message}`,
                    to: `whatsapp:+${process.env.DEFAULT_NO}`
                })
                .then(message => console.log(message.sid))
                .catch(e => {
                    console.log(e)
                    
                })
                .finally(() => {
                    res.send({})
                })
    }
    })


module.exports = route
