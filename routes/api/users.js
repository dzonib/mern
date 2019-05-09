const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')
const config = require('config')

const User = require('../../models/User')
const router = express.Router()

// @route POST api/users
// @desc Register user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is requiered')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a passwrod with 6 or more characters'
        ).isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (user) {
                res.status(400).json({
                    errors: [{ message: 'User already exist' }]
                })
            }

            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(password, salt)

            user = await User.create({
                name,
                email,
                password: hashedPassword
            })

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: '30d' },
                (err, token) => {
                    if (err) throw err
                    return res.json({ token })
                }
            )

            // return jsonwebtoken
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server error')
        }
    }
)

// TODO: after auth finish avatar upload

// const upload = multer({
//     limit: {
//         fileSize: 1000 * 1000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.pgn$/)) {
//             return cb(new Error("File extansion must be .pgn"))
//         }

//         cb(undefined, true)
//     }
// })

// router.post('/avatar', (req, res) => {

// })

module.exports = router
