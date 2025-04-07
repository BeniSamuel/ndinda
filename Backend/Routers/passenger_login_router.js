const router = require('express').Router()
const { Passenger } = require('../Models/passenger_model')
const bcrypt = require('bcrypt')
const rateLimit = require('express-rate-limit')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const RevokedToken = require('../Models/revokedToken')

const rateLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 5,
    message: "Too Many Attempts! Try again later."
})

router.route('/passenger/login').post(rateLimiter, async(req, res)=> {
    try {

        const { error } = validate(req.body)
        if(error) {
            return res.status(400).json({message: error.details[0].message})
        }

        // Verify whether a passenger with this email exists
        const passenger = await Passenger.findOne({passengerEmail: req.body.passengerEmail})
        if(!passenger) {
            return res.status(404).json({message: "A Passenger Account With This Email Does Not Exist!"})
        }

        const comparepassword = await bcrypt.compare(req.body.passengerPassword, passenger.passengerPassword)
        if(!comparepassword){
            return res.status(400).json({message: "Incorrect Password"})
        }

        // Generate a Token
        const token = passenger.generateAuthToken()

        // set up HTTP-Only cookie
        res.cookie('AuthToken', token, {
            httpOnly: true, // This means the cookie cannot be accessed through JavaScript on the client side (e.g., document.cookie)
            secure: true, // This ensures that the cookie is only sent over HTTPS connections (i.e., when the site is using a secure connection). It prevents the cookie from being sent over an unencrypted connection, adding an extra layer of security.
            sameSite: 'strict', // This prevents Cross-Site Request Forgery (CSRF) attacks by ensuring that the cookie is only sent when the request originates from the same site as the one that set the cookie
            maxAge: 60 * 60 * 1000
        })

        return res.status(200).send({data: token, message: "Passenger LoggedIn!", redirectUrl:"/ourfirstservice/account/passenger/dashboard"})       

    } catch (error) {
        console.error("Error Occured!", error)
        return res.status(500).json({message: "Error Occured While To Log Into Your Passenger Account! Try again."})
    }
})

const validate = (data) => {
    
    const schema = joi.object({
        passengerEmail: joi.string().email().required().label("passengerEmail"),
        passengerPassword: joi.string().required().label("passengerPassword")
    })
    
    return schema.validate(data)

}

router.route('/passenger/logout').post(async(req, res) => {
    try {
        console.log(req.cookies)

        const token = req.cookies.AuthToken
        if(!token) {
            return res.status(404).json({message: "Token Not Found!"})
        }

        const jwtSecret = process.env.MYPRIVATEKEY
        const decodedToken = jwt.verify(token, jwtSecret)

        const expiresAt = new Date(decodedToken.exp * 1000)

        await new RevokedToken({ token, expiresAt }).save()

        res.clearCookie('AuthToken')

        return res.status(200).json({message: "You Have Logged Out of Your Passenger Account!"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error Occured While Trying to LogOut! " + error.message })
    }
})

module.exports = router