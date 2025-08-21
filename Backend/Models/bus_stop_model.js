const mongoose = require('mongoose')

// Stop Schema (with Geospatial Indexing)
const busStopSchema = new mongoose.Schema({
    stopName: { type: String, required: true },
    stopLocation: {
        type: { type: String, enum: ['Point'], required: true, default: 'Point' },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
});

busStopSchema.index({ stopLocation: '2dsphere' }); // Enable geospatial queries

const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop