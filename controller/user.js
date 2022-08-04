const userModel = require('../models/users')

class userController {
    constructor(phone, name='') {
        this.phone = phone
        this.name = name 

        
    }
    async exist(){
        return await userModel.findOne({phone:this.phone})
    }
    static async find(phone){
        return await userModel.find({phone:phone})
    }
    async new(){
        if(await this.exist()) throw new Error('user exist')
        const user = new userModel({
            phone:this.phone,
            name:this.name

        })

        if (await userModel.findOne({phone:this.phone})) throw new Error('user already signup')

        return  await user.save()
                    .then(any => {
                        console.log(any)
                        return any
                    })
                    .catch(err => {
                        console.log(err)
                        throw new Error(err.message)
                    })
    }
    
}

//write a function to add all param given

module.exports = userController