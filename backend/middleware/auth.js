const catchAsyncErrors = require("./catchAsyncErrors.js");

const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken')



exports.isAuthenticated =   catchAsyncErrors ( async (req, res, next) => {
   
      const {token} = await req.cookies;
      if (!token) {
        return next(new Error("token not found pleae login againad" , 404));
  
        }
 
     const decodedData = await jwt.verify(token , process.env.JWT_SECRET)
    //  console.log(decodedData)
        req.user= await User.findById(decodedData.id)

      next();

  
  }
  
)




exports.authorizedRoles = (...roles)=>(req,res, next)=>{
       
  // console.log("rodles  oin authoried aroes"  , roles)
  //   console.log( "REQ.USE.NAME",req.user.name)

  // return ((req, res, next)=>{
    if(!roles.includes(req.user.role)){
      return next (new Error(`you have no privilate to see the as u are $${req.user.role} to see this`  , 403 ))

  }

  next()

  // })

}










// exports.authorizedRoles = (...roles)=>{
       
//   console.log("rodles  oin authoried aroes"  , roles)


//   return ((req, res, next)=>{
//     if(!roles.includes(req.user.role)){
//       return next (new Error("you have no privialt to see this ", 405 ))
      
//   }

//   next()

//   })

// }










// exports.isAuthenticated = async (req, res, next) => {
//   console.log("im here ein isautheicated");
//   try {
//     const token = await req.cookies;
//     if (!token) {
//       return next(new Error("token not found", 404));
//     }

//     console.log({ token });
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = isAuthenticated
