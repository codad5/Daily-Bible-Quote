const express = require('express')
const route = express.Router()

//others
const userController = require('../controller/user')
const {getQuote} = require('../utils/bible')
const { sendMessage } = require('../utils/sendmessage')
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
                    await sendMessage(user?.phone, qoute)
                        .then(res => console.log(res))
                        
                })
                return res.send({status:'sent'})
       
    }
    catch(err) {
            console.log(err)
            await sendMessage(`+${2348142572488}`, `Error: ${err.message}`)
                .then(res => console.log(res))
                .finally(() => {
                    res.send({})
                })
    }
    })


module.exports = route
