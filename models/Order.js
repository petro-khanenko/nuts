const { Schema, model } = require('mongoose')

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    total: { type: String, required: true },
    address: { type: Object, default: null },
    orderNum: { type: String, required: true},
    active: { type: Boolean, required: true },
    items: { type: Array, default: null },
});



module.exports = model('Order', schema);
