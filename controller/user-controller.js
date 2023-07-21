import bcrypt from "bcrypt";
import Upbhokta from "../model/user.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from "../model/token.js";


dotenv.config();
export const signupUser = async (request, response) => {
  try {
    // cont salt=await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };
    // console.log(user);

    const newUser = new Upbhokta(user);
    await newUser.save();

    return response.status(200).json({ msg: "signup sucessfull" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while Sign UP" });
  }
};
export const loginUser = async (request, response) => {
    

  let user = await Upbhokta.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "username does not match" });
  }
  try {
    let match=await bcrypt.compare(request.body.password , user.password);
    console.log(match);
    if(match)
    {
        const acessToken=jwt.sign(user.toJSON() ,process.env.ACESS_SECRET_KEY ,
        {
            expiresIn:'15m'
        });

        const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_KEY );
        const newToken=new token({token:refreshToken});
        await newToken.save();
        return response.status(200).json({acessToken:acessToken , refreshToken:refreshToken , name:user.name , username:user.username});
        
    }
    else{
        return response.status(400).json({msg:"Password doesnt match"});
    }

  } catch (error) {
    return response.status(500).json({msg:'Error while login in user'})
  }
};
