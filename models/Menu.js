

const mongoose = require('mongoose')


exports.Menu = mongoose.model('Menu',new mongoose.Schema({
    storeId : mongoose.Schema.Types.ObjectId,
    categories : [{type : mongoose.Schema.Types.ObjectId,ref : 'Categories'}]
},{timestamps : true}))


exports.Categories = mongoose.model('Categories', new mongoose.Schema({
    category_name : String,
    active : {
        type : Number,
        default : 1
    },
    isChild : Boolean,
    parent_category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Categories"
    },
    category_timing : String,
    category_logo_url : String,
},{timestamps : true}))

exports.Items = mongoose.model('Items', new mongoose.Schema({
    item_category_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Categories" 
    },
    item_name : String,
    item_description : String,
    item_available : Boolean,
    allow_variation : Boolean,
    discount : String,
    price : String,
    is_addon : Boolean,
    variation_types : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Variation"
    },
    addon : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Addon"
    }],
    price_after_addon : String,
    item_image_url : String,
    item_tax : String,
    gst_type : [String],
},{timestamps : true}))



exports.Addon = mongoose.model('Addon', new mongoose.Schema({
    addon_name : String,
    quanity : String,
    description : String,
    price : String
}))


exports.Variation = mongoose.model('Variation', new mongoose.Schema({
    name : String,
    data : String
}))

exports.GstType = mongoose.model("Gst_Type", new mongoose.Schema({
    gst_id : Number,
    gst_name : String    
},{timestamps : true}))