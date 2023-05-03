import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const {env} = process.env;

const authMiddleware = (req, res, next) => {
  const { airBnbClone_token } = req.cookies;

  if (token) {
    jwt.verify(ab_tkn, env.JWT_SECRET, {}, async (err, userData) => {
      if (err) {
        console.log(err)
        return ; 
      }
      console.log(userData);
    //   const { name, email, _id } = await User.findById(userData.id);
    //   res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

export default authMiddleware;

