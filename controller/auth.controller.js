const { CatchAsyncError } = require("../error/CatchAsyncError");
const ErrorHandler = require("../error/ErrorHandler");
const User  = require("../models/user");
const jwt = require('jsonwebtoken');
const generateOtp = require("../service/generateOtp");
const { response } = require("../service/Response");
const bcrypt = require('bcryptjs');
const { sendToken, clearToken } = require("../service/token");
const Role = require("../models/role");
const Constant = require("../service/Constant");
const client = require("../server");
const Token = require("../models/token");


exports.SignupUser = CatchAsyncError(async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password, confirmPassword } = req.body;
  
      if (!email || !password || !confirmPassword) {
        return response(res,'Please provide proper credentials',{},406)
      }
  
      const user = await User.findOne({ email });

      console.log(user)

      if (user) {
       return response(res,'Email is already in use',{},404)
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
      return response(res,error.message,error,500)
    }
  });

  


exports.VerifyOtp = CatchAsyncError(async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    if (!otp || otp == undefined) {
      return response(res,'Please provide proper credentials',{},406)
    }

    const data = await Token.findOne({email})

    if(!data || data == undefined || data == null){
        return response(res,'Otp expired!, please send new otp! ',{},404)
      }

    if(otp !== data.otp){
        return response(res,'Email is already in use',{},404)
    }

    const user = await User.findOne({email : data.email})

    if(user) {
      return response(res,'User already exists!',{},404)
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
        return response(res,'Server Error, please try again after sometime!',{},401)
      }

    response(res,'Signup successful',{user : createNewUser},201)


  } catch (error) {
    return response(res,error.message,error,500)
  }
});

exports.loginUser = CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || email === undefined || !password || password === undefined) {
        return response(res,'Please Provide proper credentials',{},406)
      }
  
      const user = await User.findOne({ email }).populate('role')
  
      if (!user || user == undefined) {
        return response(res,'User doesn\'t exists!',{},404)
      }
  
      const verifyPassword = await bcrypt.compare(password, user.password);
  
      if (!verifyPassword) {
        return response(res,'Incorrect Password',{},404)
        
      }
  
      sendToken(res,user,'login successful', 200);
  
    } catch (error) {
      return response(res,error.message,error,500)
    }
  });


exports.refreshToken = CatchAsyncError(async(req,res) => {

    try {
        
        console.log(req.cookies)

        const refreshToken = req.cookies.refresh_token
        
        if(!refreshToken || refreshToken === undefined){
          return response(res,'session time out, please login again!',{},406)  
        }

        const session = jwt.verify(refreshToken,process.env.REFRESH_SECRET)

        console.log(session)

        if(!session || session === undefined){
          return clearToken(res,'session has been expired, please login again!',500)
        }


        const check = await client.get(session.id)

        
        if(!check || check === undefined){
         
          return clearToken(res,'session has been expired, please login again!',500)
        }

        const user = JSON.parse(check)

        console.log(user)

        sendToken(res,user,'token refresh successful',201)

    } catch (error) {
      return response(res,error.message,error,500)
    }
})

exports.me = CatchAsyncError(async(req,res) => {
  const refresh_token = req.cookies.refresh_token;
  const access_token = req.cookies.access_token
  return response(res,'fetched user data',{user:req.user,access_token,refresh_token},201)
})

exports.logout = CatchAsyncError(async(req,res) => {
  return clearToken(res,'logged out successfully!',201)
})