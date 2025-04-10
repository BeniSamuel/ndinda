const router = require('express').Router()
const BusRoute = require('../Models/bus_route_model')
const BusStop = require('../Models/bus_stop_model')
const { getBusLocation, updateBusLocation, getNearbyStops, getActiveBuses, deactivateBus } = require('../server.js');

// The GPS will send data through this endpoint. It'll Update Bus Location.
router.route('/bus/location').post(async(req, res) => {
    try {

        const { GPSId, latitude, longitude, routeNumber, routeName } = req.body
        
        // Check Whether the routeNumber Exists!
        const busRoute = await BusRoute.findOne({ routeNumber, routeName })
        if(!busRoute) {
            return res.status(400).json({message: `Route ${routeNumber} ${routeName} Doesn't Exist!`})
        }

        // Activate the Bus, such that a passenger can query it by routeNumber and routeName.
        await updateBusLocation(GPSId, latitude, longitude, routeNumber, routeName )
       
        return res.json({messageInteger: 1, message: "Bus location updated and activated!"})

    } catch (error) {
        return res.status(500).json({message: "Can't activate or update the bus location", error: error.message})
    }
})

// Passenger looking for active bus by routeNumber and routeName!
router.route('/active-buses/:routeNumber/:routeName').get(async(req, res) => {

    try {
        
        const { routeNumber, routeName } = req.params
        const activeBuses = await getActiveBuses( routeNumber, routeName )

        if(!activeBuses.length || activeBuses.length === 0) {
            return res.status(404).json({message: "No Active Bus in Your Route!"})
        } else {
        return res.status(200).json({ message: "Active Buses in Your Route: ", activeBuses })
        }

    } catch (error) {
        return res.status(500).json({message: "Error Occured While Fetching Active Buses!", error: error.message})
    }

})

//Passenger looking for active bus by the Starting Point to the Ending Point


// Get Bus location in comparison to the route's stops location. Check whether the bus is near or has bypassed the stop. 
router.route('/all-stops-in-route/:routeNumber/:routeName/:GPSId').get(async(req, res) => {
    try {
        
        const { routeNumber, routeName, GPSId } = req.params
        const stops = await getNearbyStops( GPSId, routeNumber, routeName )
        return res.status(200).json({ stops })

    } catch (error) {
        return res.status(500).json({ message: "Failed To Get Route Stops! ", error: error.message })
    }
})

// API Endpoint: Deactivate a Bus
router.route('/bus/deactivate').post(async (req, res) => {
    try {
        const { GPSId, routeNumber, routeName } = req.body;
        await deactivateBus(GPSId, routeNumber, routeName );
        return res.json({ message: 'Bus deactivated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router