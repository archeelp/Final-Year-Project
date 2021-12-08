import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export const loginRequired = (req, res, next) => {
  try {
    // Get the JWT token from the header
    const token = req.headers.authorization.split(" ")[1];
    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        req.decodedToken = decoded;
        next();
      } else {
        return next({ status: 401, message: "Please Log In First" });
      }
    });
  } catch (error) {
    console.log(error);
    return next({ status: 401, message: "Please Log In First" });
  }
};

export default {
  loginRequired
};
