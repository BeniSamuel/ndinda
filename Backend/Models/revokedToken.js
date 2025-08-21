const { required } = require("joi")
const mongoose = require("mongoose")

const revokedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {timestamps: true})

const RevokedToken = mongoose.model('RevokedToken', revokedTokenSchema)
module.exports = RevokedToken
