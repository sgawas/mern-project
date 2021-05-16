const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: 4},
    image: { type: String, required: true},
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);