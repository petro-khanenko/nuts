const { Schema, model } = require('mongoose');


const schema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    points: { type: String, required: true },
    anchorr: { type: String, required: true },
    article: { type: String, default: '666-something_else' },
    description: { type: String, default: null },
    addFields: { type: Object, default: null }
});


module.exports = model('Item', schema);
