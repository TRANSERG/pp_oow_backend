const mongoose = require('mongoose')

exports.PaymentType = mongoose.model('PaymentType',new mongoose.Schema({
    name : String,
    paymentId : 1
},{timestamps : true}))