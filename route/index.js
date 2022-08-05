const express = require('express')
const route = express.Router()

//others
const { validPhoneNumber, sendCode, validateCode } = require('../utils/validator')
const { connect, disconnect } = require("../services/db");
const Redis = require('ioredis')
const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASS,
})
const userController = require('../controller/user')
// const redisClient = Redis.createClient({
//     url: process.env.REDIS_URL
// })

// redisClient.on('error', (err) => {
//     console.log(err)
// })

const DEFAULT_REDIS_EXPIRATION = 3600

route.route('/signup')
     .get((req, res) => {
        return res.render('index')
     })
     .post(async (req, res) => {
         try{
            
            console.log(req.body)
         const { number, name } = req.body
         console.log(number, name)
         const valid = await validPhoneNumber(number)
        //  console.log(valid, 'is valid')
         if (!valid) throw  'invalid Number'
         const code = await sendCode(number)
         if (!code) throw 'cant send code'
             redisClient.set(number, JSON.stringify({ phone: number, code: code, name: name }), 'EX', DEFAULT_REDIS_EXPIRATION)
         return res.status(200).json({ message: 'code sent', data: code, status:true })
        }
        catch(err){
            console.log(err)
            return res.status(500).json({message:err.message, status:false})
        }
     })

route.route('/verify')
    .post(async (req, res) => {
        console.log('verification')
        const { number, code } = req.body
        const isAvaliabe = await redisClient.get(number)
            .then(data => data)
            .catch(err => {
                console.log('redis error', err)
                return false
            })
        try {
            if (!isAvaliabe) return res.status(400).send('OTP expired try again')
            console.log(isAvaliabe)
            const { name } = JSON.parse(isAvaliabe)
            const valid = await validPhoneNumber(number)
            const { status } = await validateCode(number, code)
            console.log(valid)
            if (!valid) return res.status(200).send('invalid number')
            // if (status != "approved") return res.status(200).send('cant send code')

            const newUser = new userController(number, name)
            if ( await newUser.new(number, name)) {
                console.log('worked')
                return res.status(200).send({ message: 'number approved', data: { code: code, status: status } })
            }
            throw 'server error'
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message, status: false })
        }

    })

module.exports = route