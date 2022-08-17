const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const router = Router()

router.post('/register',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Min length of password is 3 symbols').isLength({min: 3})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration datas'
                })
            }

            const {email, password} = req.body

            const emailExist = await Admin.findOne({email})
            if (emailExist) {
                return res.status(400).json({
                    message: 'Such user already exists'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const admin = new Admin({email, password: hashedPassword})

            await admin.save()
            res.status(201).json({
                message: 'Admin is successfully added'
            })
        } catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

router.post('/login',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Put Your password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login datas'
                })
            }

            const {email, password} = req.body
            const admin = await Admin.findOne({email})

            if (!admin) {
                return res.status(400).json({
                    message: 'Such user not exist'
                })
            }

            const isMatch = await bcrypt.compare(password, admin.password)
            if (!isMatch) {
                res.status(400).json({
                    message: 'Wrong password'
                })
                console.log('Wrong password')
            }
            const token = jwt.sign(
                {adminId: admin.id},
                 config.get('jwtKey'),
                {expiresIn: '24h'}
            )

            res.json({
                token, adminId: admin.id
            })
        } catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

module.exports = router