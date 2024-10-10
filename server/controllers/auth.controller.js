import User from "../models/User.js";

const signup=async(req,res)=>{
    try {
        const{username,email,password}=req.body;
        if(!(username&&email&&password)){
            return res.status(400).json({success:false,message:"all fields are necessary"});
        }
        const finduser= await User.findOne({email});
        if(finduser){
            return res.status(400).json({success:false,message:"user already exists"});
        }
        const user= new User({username,email,password});
        const newUser= await user.save();
        console.log("new user registered successfully");
        newUser.password="";
        return res.status(200).json({success:true,message:"user registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"something went wrong"});
    }
}

const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        if(!(email&&password)){
            return res.status(400).json({success:false,message:"all fields are necessary"});
        }
        const finduser= await User.findOne({email});
        if(!finduser){
            return res.status(400).json({success:false,message:"user does not exists"});
        }
        if(password!==finduser.password){
            return res.status(400).json({success:false,message:"wrong password"});
        }
        return res.status(200).json({success:true,message:"user login successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"something went wrong"});
    }
}

export {signup,login};