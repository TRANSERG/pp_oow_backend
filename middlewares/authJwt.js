const { response } = require("../service/Response");
const jwt = require('jsonwebtoken');
const { clearToken } = require("../service/token");
const client = require("../server");


module.exports = verifyToken = async(req, res, next) => {


  const access_token = req.cookies.access_token || req.headers.access_token

  
    if (!access_token) {
      return clearToken(res,'token not found, please login again!',401)
      return;
    }

    const data = await jwt.decode(access_token,process.env.ACCESS_SECRET)

    if(!data || data === undefined){
      return clearToken(res,'please login again, session as been expired!',401)
    }

    req.user = JSON.parse( await client.get(data.id.toString()))

    if(req.user === undefined || !req.user){
      return clearToken(res,'please login again, session as been expired!',401)
    }

    console.log(req.user)

    next();
    
};



