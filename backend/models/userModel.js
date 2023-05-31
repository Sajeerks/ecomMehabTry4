const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const userSchema =new  mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plese enter the user name"],

    maxLength: [10, "must not exceedl 10 chararcters"],
    minLength: [5, "must not be atlest  5  chararcters"],
  },
  email: {
    type: String,
    required: [true, "Plese enter the email "],
    unique: true,
    validator: [validator.isEmail, "please enter a valid email  Munna"],
  },
  password: {
    type: String,
    required: [true, "Plese enter the user password"],

    minLength: [8, " passwird must not be atlest  8  chararcters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

 userSchema.pre("save" ,async function(next){
     if(!this.isModified("password")){
        next()
     }


  this.password = await bcrypt.hash(this.password,10)
 })

  userSchema.methods.getJwtToken =function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
      expiresIn:process.env.JWT_EXPIRE
    })
  }
  
  userSchema.methods.comparePassword= async function(enteredPassword){
       return await bcrypt.compare(enteredPassword, this.password)
  }
   

  //ggnereation passwordd  reset password token
userSchema.methods.getResetPasswordToken = async function () {
 
  const resetToken = await crypto.randomBytes(20).toString("hex")
  //hasing anad dd to 
  this.resetPasswordToken  = await crypto.createHash("sha256").update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now()+15*60*1000

  return resetToken

}



module.exports = mongoose.model("User", userSchema);
