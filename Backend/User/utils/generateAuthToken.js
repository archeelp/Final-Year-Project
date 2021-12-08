import jwt from "jsonwebtoken";

// Generate auth token using JWT with an expiry of an hour
export const generateAuthToken = (user) => {
  let { id, role } = user;
  let token = jwt.sign(
    {
      id,
      role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export default {
  generateAuthToken,
};
