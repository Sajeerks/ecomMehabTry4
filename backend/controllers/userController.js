const Product = require("../models/productModel.js");
const ErrorHander = require("../utils/errorHander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const sendToken = require("../utils/sendToken.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");



exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
   const user = await User.findById(req.params.id);

   if (!user) {
     return next(
       new Error(`user reset password token is expired or invalied`, 400)
     );
   }

      if( user.role ==='admin'){
         user.role ="user"
      }else if (user.role ==='user'){
         user.role ="admin"
      }
  await user.save()
   
   res.status(200).json({
     success: true,
     messsage:`user with id ${user._id}  role has been chnaged `
      
   });
 });




exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
   const user = await User.findById(req.params.id);

   if (!user) {
     return next(
       new Error(`user  with the ${req.params.id}  is not found `, 400)
     );
   }

   await user.deleteOne()

   
   res.status(200).json({
     success: true,
     messsage:`user with id ${req.params.id}  has been removed `
      
   });
 });
 



exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  const totalNoOfUsers = await User.countDocuments()

  res.status(200).json({
    success: true,
    users,
    totalNoOfUsers,
  });
});

exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  // const user = await User.findById(req.user.id)

  // if (!user) {
  //   return next(
  //     new Error(`user reset password token is expired or invalied`, 400)
  //   );
  // }

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // w

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // await user.save();

  // sendToken(user, 200, res);
  res.status(200).json({
    success: true,

    message: `profile for ${req.user.name} updated successfully`,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(
      new Error(`user reset password token is expired or invalied`, 400)
    );
  }
  const isPasswordsMathed = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordsMathed) {
    return next(new Error(`old password is incooorect`, 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new Error(` new  passord and confrim passwordn does not match`, 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);

  //  res.status(200).json({
  //    success:true,
  //    user,
  //    message:`password for ${req.user.name } updated successfully`
  //  })
});

exports.loggedInUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new Error(`user reset password token is expired or invalied`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Error(`user reset password token is expired or invalied`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = await crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //  console.log({resetPasswordToken})

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new Error(`user reset password token is expired or invalied`, 400)
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new Error(` new password and confirm password are not the same`, 400)
    );
  }
  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);

  //   res.status(200).json({
  //     success: true,
  //     message: ` pasword ${user.name} changed  successfully`,
  //   });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new Error(`user with email ${req.body.email}  is not found`, 400)
    );
  }

  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )} /api/v1/password/reset/${resetToken}`;

  const message = `you  passord reset token is \n\n ${resetPasswordUrl} \n\n if you have not request this email please ignore this mail`;

  try {
    await sendMail({
      email: user.email,
      subject: "Eocomm passswrod recover",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `email send to ${user.email}  successfully`,
      resetToken,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new Error(error.message, 500));
  }
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  let loggedInuser;
  loggedInuser = await req.user.name;

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: `good  bye you ${loggedInuser} has logged out successfully`,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return next(Error(" pleae enter email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(Error("user not found", 404));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(Error("invalid password or email  found", 401));
  }

  sendToken(user, 200, res);
});

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(name, email, password ,req.body.avatar )
  // console.log(name, email, password ,)

// console.log("in create user")
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatar",
    width: 150,
    crop: "scale",
  });
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,

      // public_id: "sssssss",
      // url: "https://images.ctfassets.net/hrltx12pl8hq/5CQKrQCEI9IUMRhWkW2RRH/d63eb46e78090142283a074f6fb85ae3/Creative_Collection.jpg?fit=fill&w=960&h=540&fm=webp",
    },
  });

  const token = await user.getJwtToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
});
