const mongoose = require('mongoose');

const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const phoneValidator = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
};

module.exports = User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: {
            type: String,
        },
        userId : {
            type : String,
            unique : true
            
        },
        email: {
            type: String,
            required: true,
            trim : true,
            validate: {
                validator: emailValidator,
                message: 'Invalid email format',
            },
            unique : true,
        },
        phone: {
            type: String,
            validate: {
                validator: phoneValidator,
                message: 'Invalid phone number format',
            },
        },
        password: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            
        },
        countryCode: {
            type: String,
            
        },
        role : {
            type : mongoose.Schema.Types.ObjectId, // ["Admin", "Manager"]
            ref : "Role"
        },
        user_type : {
            type : String  // plugin
        }
        
    },{ timestamps: true })
);




