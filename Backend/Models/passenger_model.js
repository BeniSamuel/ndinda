const mongoose  = require('mongoose')
const passwordComplexity = require('joi-password-complexity')
const joi = require('joi')
const jwt = require('jsonwebtoken')

const passengerSchema = new mongoose.Schema({
    passengerName: {
        type: String,
        required: true
    },
    passengerEmail: {
        type: String,
        required: true,
        unique: true
    },
    passengerPassword: {
        type: String,
        required: true
    }
}, {timestamps: true})

passengerSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.MYPRIVATEKEY, {expiresIn: "1d"})
    return token
}

const Passenger = mongoose.model('Passenger', passengerSchema)

const validate = (data) => {
    const schema = joi.object({
        passengerName: joi.string().required().label("passengerName"),
        passengerEmail: joi.string().email().required().label("passengerEmail"),
        passengerPassword: passwordComplexity().required().label("passengerPassword")
    })

    return schema.validate(data)
}

module.exports = {Passenger, validate}