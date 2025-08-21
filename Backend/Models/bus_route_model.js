const mongoose = require('mongoose')

const busRouteSchema = new mongoose.Schema({
    routeName: { type: String, required: true, unique: true },
    routeNumber: { type: Number, required: true },
    routeStops: [{
        busStopId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusStop' },
        busStopNumber: { type: Number, required: true }
    }]
});

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute