const express = require('express')
const User = require('../../models/User')

const auth = require('../../middleware/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        })
        res.send(user)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
