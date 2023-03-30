import express from "express";
import cors  from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/Authroute";

require("dotenv").config();
const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


app.use("/api/auth",authRoute);






// app.get("/profile", (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       const { name, email, _id } = await User.findById(userData.id);
//       res.json({ name, email, _id });
//     });
//   } else {
//     res.json(null);
//   }
// });


mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(4000,() => {
        console.log("listening on localhost:4000")
    });
});

