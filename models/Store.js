

const mongoose = require('mongoose')


exports.Store = mongoose.model('Store', new mongoose.Schema({
    store_id : String,
    active : String,
    menusharingcode : String,
    name : {
        type : String,
        trim : true,
    },
    currency : String,
    store_status : {
        type : Number,
        default : 1,
    },
    address_line: String,
    address_line_optional : String,
    pincode : String,
    state : String,
    town : String,
    country : String,
    landmark : String,
    userId : String,
    managers: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    payment_type : [Number], 
    store_mobile : String,
    store_email : String,
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


