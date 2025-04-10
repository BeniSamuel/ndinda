const router = require('express').Router()
const Bus = require('../Models/bus_model')
const Agency = require('../Models/agency_model')

router.route('/all-buses').get(async(req, res) => {
    try {

        const buses = await Bus.find().populate('agencyId', 'agencyName')

        if(!buses || !buses.length || buses.length === 0) {
            return res.status(404).json({message: "No Buses Found!"})
        }

        return res.status(200).json({message: "Buses Found!", buses})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. An Error Occured!", error})        
    }
})

router.route('/single-bus/:id').get(async(req, res) => {
    
    const { id } = req.params

    try {

        const bus = await Bus.findOne({ _id: id }).populate('agencyId', 'agencyName')

        if(!bus || !bus.length || bus.length === 0) {
            return res.status(404).json({message: "No Bus Found!"})
        }

        return res.status(200).json({message: "Bus Found!", bus})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. An Error Occured!", error})        
    }
})

router.route("/add-bus").post(async(req, res) => {
    const { agencyId, busPlateNumber, GPSId } = req.body

    try {
        // Check whether agency exists!
        const agency = await Agency.findOne({_id: agencyId })
        if(!agency) {
            return res.status(404).json({message: "This Agency Doesn't Exists!"})
        }
        // Check Whether bus already exits!
        const bus = await Bus.findOne({ agencyId, busPlateNumber })
        if(!bus) {
            return res.status(400).json({message: "Bus with similar Agency and PlateNumber already exists!"})
        }

        await new Bus({ agencyId, busPlateNumber, GPSId }).save()
        return res.status(200).json({message: "New Bus Added!"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. Error Occured!", error})
    }
})


router.route("/delete-bus/:id").delete(async(req, res) => {
    const { id } = req.params

    try {
        
        const deleteBus = await Bus.findOneAndDelete({_id: id})
        if(!deleteBus) {
            return res.status(404).json({message: "Bus Not Found!"})
        }

        return res.status(200).json({message: "Bus Deleted Successfully!"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. Error Occured!", error})
    }
})


router.route('/update-bus/:id').post(async(req, res) => {
    const { id } = req.params
    const { agencyId, busPlateNumber, GPSId } = req.body

    try {

        // Check Whether bus exits!
        const bus = await Bus.findOne({ agencyId, busPlateNumber })
        if(!bus) {
            return res.status(400).json({message: "Bus Not Found!"})
        }

        // Check whether agency exists first!
        const agency = await Agency.findOne({ _id: id })
        if(!agency) {
            return res.status(404).json({message: "Agency Doesn't Exists!"})
        }

        bus.agencyId = agencyId || bus.agencyId
        bus.busPlateNumber = busPlateNumber || bus.busPlateNumber
        bus.GPSId = GPSId || bus.GPSId
        
        await bus.save()

        return res.status(200).json({message: "Bus Updated!", agency})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. Error Occured!", error})
    }
})

module.exports = router