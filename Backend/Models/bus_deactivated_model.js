const mongoose = require('mongoose')

const busDeactivatedSchema = new mongoose.Schema({
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

const BusDeactivated = mongoose.model('BusDeactivated', busDeactivatedSchema)

module.exports = BusDeactivated