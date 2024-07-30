const mongoose = require('mongoose')


exports.Storage = mongoose.model('Storage', new mongoose.Schema({
    name : String,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    domainId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Domain"
    },
    storeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Store"
    },
    templateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Template"
    },
},{timestamps : true}))

