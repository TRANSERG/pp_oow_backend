

const mongoose = require('mongoose')


exports.Domain = mongoose.model("Domain", new mongoose.Schema({
    name : String,
    logo : String,
    status : {
        type : Number,
        default : 1
    },
    domain_url : {
        type : String,
        trim : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    Template : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Template"
    }
},{timestamps : true}))