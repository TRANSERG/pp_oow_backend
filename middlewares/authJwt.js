export const verifyToken = (req, res, next) => {
    
    let token = req.headers["x-access-token"];
  
    if (!token) {
      send.response(res, "No token provided!", {}, 403);
      return;
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        send.response(res, "Unauthorized!", {}, 401);
        return;
      }
      req.userId = decoded.id;
      next();
    });
};



