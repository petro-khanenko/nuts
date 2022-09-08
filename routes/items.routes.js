const { Router } = require('express')
const Item = require('../models/Item')

const router = Router()

router.get('/',
    async (req, res) => {
        try {
            const companies = await Item.find({})
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
            const item = new Item({ image, name, price, points, anchorr, article, description, addFields })
            await item.save()
            res.status(201).json({
                message: 'Item is successfully added',
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
            await Item.findByIdAndDelete(id)
            res.json({
                message: 'Item was successfully deleted',
                status: 'success'
            })
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

router.put('/update',
    async (req, res) => {
        try {
            const { id, image, name, price, points, anchorr, article, description, addFields } = req.body
            await Item.findByIdAndUpdate(
                id,
                { $set: { image, name, price, points, anchorr, article, description, addFields } },
                { new: true }
                )
            res.status(200).json({
                message: 'Item was successfully updated',
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
