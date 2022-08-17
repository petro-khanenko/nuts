const { Schema, model } = require('mongoose')

const schema = new Schema({
    orderNum: { type: String, required: true }
});

module.exports = model('Count', schema);
