import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("❌ No token in cookie");
    return res.status(401).json({ success: false, message: "Please login first" });
  }

  try {
    const decodedToken = jwt.verify(token, 'jwt-secret');
    if (decodedToken.role!='user'){
      return res.status(403).json({success:false,message:"User access denied"});
    }
    if (!decodedToken.name) {
      return res.status(403).json({ success: false, message: "Invalid token payload" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("❌ JWT verification error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
export const adminMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("❌ No token in cookie");
    return res.status(403).json({ success: false, message: "Please login first" });
  }

  try {
    const decodedToken = jwt.verify(token, 'jwt-secret');
    if (decodedToken.role!='admin'){
      console.log("User is not admin")
      return res.status(403).json({success:false,message:"Admin access denied"});
    }
    if (!decodedToken.name){
      console.log("Name is not found")
      return res.status(403).json({ success: false, message: "Invalid token payload" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("❌ JWT verification error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
