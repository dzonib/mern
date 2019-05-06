const express = require("express")
const { check, validationResult } = require("express-validator/check")

const router = express.Router()

// @route POST api/users
// @desc Register user
// @access Public
router.post("/", [
    check("name", "Name is requiered").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a passwrod with 6 or more characters").isLength({
        min: 6
    })
], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body

    // see if user exists

    // add image
    router.post('/avatar', (req, res) => {
    
    })
    // encrypt password

    // return jsonwebtoken
    res.json("User route")
})

module.exports = router
