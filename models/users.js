const mongoose = require('mongoose')


const userScheme = mongoose.Schema(
    {
        name: {
            type: String
        },
        phone: {
            type: String,
            required: true
        }
    }
)

const userModel = mongoose.model('user', userScheme)

module.exports = userModel