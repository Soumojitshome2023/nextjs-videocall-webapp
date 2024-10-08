import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        require:true,
        type:String,
        unique:true
    },
    email:{
        require:true,
        type:String,
        unique:true
    },
    password:{
        require:true,
        type:String,
    }
})

const User=mongoose.model("User",userSchema);
export default User;