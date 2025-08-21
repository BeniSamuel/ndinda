const mongoose = require('mongoose')

const busActivatedSchema = new mongoose.Schema({
    GPSId: {
        type: Number,
        required: true
    },
    routeNumber: {
        type: String,
        required: Number
    },
    routeName: {
        type: String,
        required: true
    }
}, { timestamps: true })

const BusActivated = mongoose.model('BusActivated', busActivatedSchema)

module.exports = BusActivated