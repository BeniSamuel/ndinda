const router = require('express').Router()
const mongoose = require('mongoose');
const BusRoute = require('../Models/bus_route_model')
const BusStop = require('../Models/bus_stop_model')

router.route('/add-route').post(async (req, res) => {
    const { routeName, routeNumber, routeStops } = req.body;
    
    try {
        // Check if the route exists; if not, create it
        let busRoute = await BusRoute.findOne({ routeName, routeNumber });
        if (!busRoute) {
            busRoute = new BusRoute({ routeName, routeNumber, routeStops: [] });
        }
        
        // Process the route stops
        for (const stop of routeStops) {
            // Convert $oid format to ObjectId if present
            const busStopId = stop.busStopId.$oid ? 
            new mongoose.Types.ObjectId(stop.busStopId.$oid) : 
            stop.busStopId;
            
            const busStopNumber = stop.busStopNumber;
            
            // Ensure the bus stop exists
            const busStop = await BusStop.findOne({_id:busStopId});
            if (!busStop) {
                return res.status(400).json({ message: `Bus Stop Not Found! (ID: ${busStopId})` });
            }
            
            // Check if the stop already exists in the route
            const stopExistIndex = busRoute.routeStops.findIndex(
                (s) => s.busStopId.toString() === busStopId.toString() && s.busStopNumber === busStopNumber
            );
            
            if (stopExistIndex > -1) {
                return res.status(400).json({ message: `Stop ${busStopNumber} already exists in this route!` });
            }
            
            // Add the stop with proper ObjectId format
            busRoute.routeStops.push({ busStopId, busStopNumber });
        }
        
        // Save the updated route
        await busRoute.save();
        return res.status(200).json({ message: "New Bus Route Added!", busRoute });
    } catch (error) {
        console.error("Failed To Add New Bus Route!", error);
        return res.status(500).json({ message: "Failed To Add New Bus Route!", error: error.message });
    }
});

module.exports = router