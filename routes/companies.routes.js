const { Router } = require('express')
const Company = require('../models/Company')

const router = Router()

router.get('/',
    async (req, res) => {
        try {
            const companies = await Company.find({})
            res.json(companies)
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

router.post('/save',
    async (req, res) => {
        try {
            const { image, name, price, points, anchorr, article, description, addFields } = req.body
            const company = new Company({ image, name, price, points, anchorr, article, description, addFields })
            // const company = new Company;
            // company.data = JSON.stringify(req.body);
            await company.save()
            res.status(201).json({
                message: 'Company is successfully added',
                status: 'success'
            })
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

router.delete('/delete',
    async (req, res) => {
        try {
            const id = req.body.id
            await Company.findByIdAndDelete(id)
            res.json({
                message: 'Company was successfully deleted',
                status: 'success'
            })
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

router.post('/update',
    async (req, res) => {
        try {
            const { id, image, name, price, points, anchorr, article, description, addFields } = req.body
            await Company.findByIdAndUpdate(
                id,
                { $set: { image, name, price, points, anchorr, article, description, addFields } },
                { new: true }
                )
            res.status(200).json({
                message: 'Company was successfully updated',
                status: 'success'
            })
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

module.exports = router
