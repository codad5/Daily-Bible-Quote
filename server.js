require('dotenv').config()
const express = require('express')
const { validPhoneNumber, sendCode } = require('./utils/validator')
const { connect, disconnect } = require("./services/db");
const Redis = require('redis')
const indexRoute = require('./route/index')
// const redisClient = Redis.createClient({
//     url:process.env.REDIS_URL
// })

// redisClient.on('error', (err) => {
//     console.log(err)
// })
const DEFAULT_REDIS_EXPIRATION = 3600
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const userController = require('./controller/user')
app.set('view engine', 'ejs')
app.disable("x-powered-by");
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})
app.use('/',  indexRoute)



app.listen(port, () => {
    console.log(`port started at port ${port} `);

    connect();

})

process.on("SIGINT", () => {
    console.log("SIGINT received. Closing server.");
    // Disconnect from MONGODB database
    disconnect();
    process.exit(0);
});