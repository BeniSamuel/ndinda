const router = require('express').Router()
const { Passenger, validate } = require('../Models/passenger_model')
const bcrypt = require('bcrypt')

router.route('/passenger/signup').post(async(req, res)=> {
    try {

        const { error } = validate(req.body)
        if(error) {
            return res.status(400).json({message: error.details[0].message})
        }

        // Check whether a passenger with the same email account already exists
        const passenger = await Passenger.findOne({passengerEmail: req.body.passengerEmail})
        if(passenger) {
            return res.status(403).json({message: "Passenger Account With This Email Already Exists!"})
        }

        const saltpassword = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.passengerPassword, saltpassword)

        await new Passenger({...req.body, passengerPassword: hashpassword}).save()

        return res.status(200).json({message: "Your Passenger Account is Created!"})

    } catch (error) {
        console.error("Error Occured!", error)
        return res.status(500).json({message: "Error Occured While Creating Your Passenger Account! Try again."})
    }
})

module.exports = router