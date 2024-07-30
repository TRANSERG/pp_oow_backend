const ErrorHandler = require( "./ErrorHandler")



const Errors = (err,req,res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    if(err.name === "CastError"){
        const message = `Resources not found, Invalid ${err.path}`
        err = new ErrorHandler(message,400)
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message,400)
    }

    if(err.name === "JsonWebTokenError"){
        const message = "Json web token is expired invalid, try again";
        err = new ErrorHandler(message,400)
    }

    if(err.name === "TokenExpiredError"){
        const message = "Json web token is expired invalid, try again";
        err = new ErrorHandler(message,400)
    }

    return res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}

module.exports = Errors