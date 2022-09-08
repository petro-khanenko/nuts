const { Router } = require('express');
const Order = require('../models/Order');

const router = Router();

router.get('/',
    async (req, res) => {
        try {
            const orders = await Order.find({})
            res.json(orders)
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
            const { firstName, lastName, email, phone, total, address, orderNum, active, items } = req.body
            const company = new Order({ firstName, lastName, email, phone, total, orderNum, active, address, items })
            await company.save()
            res.status(201).json({
                message: 'Order is successfully added',
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
            await Order.findByIdAndDelete(id)
            res.json({
                message: 'Order was successfully deleted',
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
            const { id, firstName, lastName, email, phone, address, total, orderNum, active, items } = req.body
            await Order.findByIdAndUpdate(
                id,
                { $set: { firstName, lastName, email, phone, address, total, orderNum, active, items } },
                { new: true }
                )
            res.status(200).json({
                message: 'Order was successfully updated',
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
