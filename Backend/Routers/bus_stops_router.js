const router = require('express').Router()
const BusStop = require('../Models/bus_stop_model')

router.route('/all-bus-stops').get(async(req, res) => {
    try {
        
        const busStops = await BusStop.find()
        if(!busStops || busStops.length === 0) {
            return res.status(404).json({message: "No Bus Stops Found!"})
        }

        return res.status(200).json({ message: "Bus Stops Retrieved!", busStops })

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Error Occured! Failed To Retrieve Bus Stops.", error: error.message})
    }
})

router.route('/add/bus-stop').post(async(req, res) => {

    const { stopName, stopLocation } = req.body

    try {
                
        // Check whether stopName already exists!
        const busStop = await BusStop.findOne({ stopName })
        if(busStop) {
            return res.status(400).json({ message: `Bus Stop ${stopName} already exists!` })
        }

        // Check whether the stopLocation format is valid
        if(!stopLocation || !Array.isArray(stopLocation.coordinates) || stopLocation.coordinates.length !== 2) {
            return res.status(400).json({error: "Invalid Coordinates format!"})
        }

        await new BusStop({ stopName, stopLocation: { type: 'Point', coordinates: stopLocation.coordinates }}).save()

        return res.status(200).json({message: "New Stop Added"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed To Add New Stop!", error: error.message})
    }
})

module.exports = router