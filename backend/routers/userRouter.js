import express from "express";
import data from "../data.js";
import Users from "../models/userSchema.js";
import BadRequestError from "../utility/error.js";
import { generateHash, generateToken, isAuth } from "../utility/utils.js";
import crypto from "crypto";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res, next) => {
  try {
    const createdUsers = await Users.insertMany(data.users);
    res.send({ createdUsers });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

const passCompare = (userPass, pass) => {
  const hash = crypto
    .createHmac("sha256", "z45@#hgila")
    .update(pass)
    .digest("hex");
  return userPass === hash;
};

userRouter.post("/signin", async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (passCompare(user.password, req.body.password) === true) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid username or password" });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: generateHash(req.body.password),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});

userRouter.get("/:userId", isAuth, async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.userId);

    res.send(user);
  } catch (error) {
    error.statusCode = 404;
    error.message = "User not Found";
    next(error);
  }
});

userRouter.put("/profile", isAuth,async (req, res, next)=>{

    try{
        const user = await Users.findById(req.user._id);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
          user.password = generateHash(req.body.password)
        };
        const updatedUser = await user.save();
        res.send({
          _id:updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser)
        });

    }catch (error) {
        error.statusCode = 404;
        error.message = "User not Found";
        next(error);
    }

})


// userRouter.get('/find',async (req,res,next)=>{

//     try{
//         const userFound = await Users.findOne({name:"Abb"});
//         if(!userFound){
//            // let error = new Error('User NOt Found');
//          //return   next(new BadRequestError(300,'User not Found'));
//             throw  new BadRequestError(404,'User not Found');
//             return;
//         }
//         res.send(userFound);
//     }catch(error){
//         next(error);
//     }

// })

export default userRouter;
