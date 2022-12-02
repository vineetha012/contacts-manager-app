const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {type: String, required: true},
    designation: {type: String, required: true},
    company: {type: String, required: true},
    industry: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    country: {type: String, required: true},
    userRef: [{type: Schema.Types.ObjectId, ref: "User"}]
});

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel