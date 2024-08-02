

const mongoose = require('mongoose')


exports.Store = mongoose.model('Store', new mongoose.Schema({
    name : {
        type : String,
        trim : true,
    },
    area : String,
    city : String,
    zip : String,
    state : String,
    country : String,
    landmark : String,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    managers: {
        Type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    payment_type : [Number], // 1 : Online, 2:Cash on delivery
    mobile_no : String,
    color_code : String,
    merchant_phone : String,
    merchant_email : String,
    delivery_area : String,
    delivery_charges : String,
    packaging_charges : String,
    social_data : {
        facebook : String,
        google : String,
        instagram : String,
        twitter : String,
    },
    templateInfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "TemplateInfo"
    }
}))

