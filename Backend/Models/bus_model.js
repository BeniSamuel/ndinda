const mongoose = require('mongoose')

const busSchema = new mongoose.Schema({
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: true
    },
    busPlateNumber: {
        type: String,
        required: true,
        unique: true
    },
    GPSId: {
        type: Number,
        unique: true
    }
}, {timestamps: true})

const Bus = mongoose.model('Bus', busSchema)

module.exports = Bus