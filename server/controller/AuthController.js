import UserModel from "./../models/UserModel";
import bcrypt from "bcryptjs";


class AuthController {
  static async login(req, res) {
    const { name, email, password } = req.body;
    try {
      const userDoc = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.status(201).json(userDoc);
    } catch (e) {
      res.status(500).json("server error");
    }
  }

  static async register(req, res) {
    const { email, password } = req.body;

    const userDoc = await UserModel.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        const token = jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret
        );
        res
          .cookie("ab_tkn", token, {
            maxAge: 1000 * 60 * 2,
            httpOnly: true,
          })
          .status(200)
          .json("berhasil login");
      }
    } else {
      res.status(404).json("not found");
    }
  }

  static async logout(req, res) {}
}


export default AuthController;
