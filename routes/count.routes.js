const { Router } = require('express');
const Count = require('../models/Count');
const Order = require("../models/Order");

const router = Router();

router.get('/',
    async (req, res) => {
        try {
            const counts = await Count.find({})
            res.json(counts)
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
            const { orderNum } = req.body
            const count = new Count({ orderNum })
            await count.save()
            res.status(201).json({
                message: 'Counter of orders is successfully added',
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
            const { id, orderNum } = req.body
            await Count.findByIdAndUpdate(
                id,
                { $set: { orderNum } },
                { new: true }
            )
            res.status(200).json({
                message: 'Counter of orders was successfully updated',
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
