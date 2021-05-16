const mongoose = require('mongoose');

const { Schema } = mongoose;

const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
}, 
{   toJSON : {
        transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        },
    }
});

module.exports = mongoose.model('Place', placeSchema);