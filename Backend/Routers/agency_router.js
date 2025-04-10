const router = require('express').Router()
const Agency = require('../Models/agency_model')

router.route('/all-agencies').get(async(req, res) => {
    try {

        const agencies = await Agency.find()

        if(!agencies || !agencies.length || agencies.length === 0) {
            return res.status(404).json({message: "No Agencies Found!"})
        }

        return res.status(200).json({message: "Agencies Found!", agencies})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. An Error Occured!", error})        
    }
})

router.route('/single-agency/:id').get(async(req, res) => {
    
    const { id } = req.params

    try {

        const agency = await Agency.findOne({ _id: id })

        if(!agency || !agency.length || agency.length === 0) {
            return res.status(404).json({message: "No Agency Found!"})
        }

        return res.status(200).json({message: "Agency Found!", agency})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. An Error Occured!", error})        
    }
})

router.route("/add-agency").post(async(req, res) => {
    const { agencyName } = req.body

    try {
        // Check Whether agency already exits!
        const agency = await Agency.findOne({ agencyName })
        if(agency) {
            return res.status(400).json({message: "Agency with similar name already exists!"})
        }

        await new Agency({ agencyName }).save()
        return res.status(200).json({message: "New Agency Created!"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. Error Occured!", error})
    }
})


router.route("/delete-agency/:id").delete(async(req, res) => {
    const { id } = req.params

    try {
        
        const deleteAgency = await Agency.findOneAndDelete({_id: id})
        if(!deleteAgency) {
            return res.status(404).json({message: "Agency Not Found!"})
        }

        return res.status(200).json({message: "Agency Deleted Successfully!"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. Error Occured!", error})
    }
})


router.route('/update-agency/:id').post(async(req, res) => {
    const { id } = req.params
    const { agencyName } = req.body

    try {
        
        // Check whether agency exists first!
        const agency = await Agency.findOne({ _id: id })
        if(!agency) {
            return res.status(404).json({message: "Agency Doesn't Exists!"})
        }

        agency.agencyName = agencyName
        
        await agency.save()

        return res.status(200).json({message: "Agency Updated!", agency})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Sorry. Error Occured!", error})
    }
})

module.exports = router