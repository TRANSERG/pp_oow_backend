const { CatchAsyncError } = require("../error/CatchAsyncError");
const ErrorHandler = require("../error/ErrorHandler");
const User  = require("../models/user");
const jwt = require('jsonwebtoken');
const generateOtp = require("../service/generateOtp");
const { response } = require("../service/Response");
const bcrypt = require('bcryptjs');
const { sendToken } = require("../service/token");
const Role = require("../models/role");
const Constant = require("../service/Constant");
const client = require("../server");
const Token = require("../models/token");


exports.SignupUser = CatchAsyncError(async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password, confirmPassword } = req.body;
  
      if (!email || !password || !confirmPassword) {
        return next(new ErrorHandler('Please provide proper credentials', 400));
      }
  
      const user = await User.findOne({ email });

      console.log(user)

      if (user) {
       return next( new ErrorHandler('Email is already in use!', 400))
      }

      const otp = generateOtp(); 

      await Token.create({
        email,
        password,
        otp
      })
  
      console.log('verification otp', otp);
  
      return response(res, `OTP has been sent!`, {}, 201);
  
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  


exports.VerifyOtp = CatchAsyncError(async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    if (!otp || otp == undefined) {
      return next(new ErrorHandler('Please provide proper credentials', 404));
    }

    const data = await Token.findOne({email})

    if(!data || data == undefined || data == null){
        return next(new ErrorHandler('Otp has been expired!, please send new otp!',401))
    }

    if(otp !== data.otp){
        return next(new ErrorHandler("Otp does't match!",401))
    }

    const user = await User.findOne({email : data.email})

    console.log('work till hree!');

    if(user) {
      return next(new ErrorHandler('User already exists!',401))
    }
    
    const hashPass = await bcrypt.hash(data.password,10)

    const role = await Role.findOne({
      name : Constant.admin
    })

    console.log(role);

    const createNewUser = await User.create({
      email : data.email,
      password : hashPass,
      role : role._id,
      userId : await User.countDocuments() + 1
    })

    if(!createNewUser){
        return next(new ErrorHandler('Server Error, please try again letter!', 401))
    }

    response(res,'Signup successful',{user : createNewUser},201)


  } catch (error) {
    return next(new ErrorHandler(error, 406));
  }
});

exports.loginUser = CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return next(new ErrorHandler('Please provide proper credentials', 400));
      }
  
      const user = await User.findOne({ email }).populate('role')
  
      if (!user || user == undefined) {
        return next(new ErrorHandler("User doesn't exist!", 404));
      }
  
      const verifyPassword = await bcrypt.compare(password, user.password);
  
      if (!verifyPassword) {
        return next(new ErrorHandler('Incorrect password', 401));
      }
  
      sendToken(res,user,'login successful', 200);
  
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });


exports.refreshToken = CatchAsyncError(async(req,res,next) => {

    try {
        
        const refreshToken = req.cookies.refresh_token

        if(!refreshToken || refreshToken === undefined){
            return next(new ErrorHandler('session time out, please login again!', 404))
        }

        const session = jwt.verify(refreshToken,process.env.REFRESH_SECRET)

        console.log(session)

        if(!session || session === undefined){
            return next(new ErrorHandler('session has been expired, login again!',406))
        }


        const check = await client.get(session.id)

        
        if(!check || check === undefined){
            return next(new ErrorHandler('user not found, please login again!', 404))
        }

        const user = JSON.parse(check)

        console.log(user)

        sendToken(res,user,'token refresh successful',201)

    } catch (error) {
        return next(new ErrorHandler(error.message),500)
    }
})