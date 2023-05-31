const app = require("./app.js")
const dotenv = require("dotenv")
const connectDatabase= require("./config/database.js")
const cloudinary = require("cloudinary");
/// hadling uncaught exception

process.on("uncaughtException" ,(err)=>{
    console.log(err)
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaughtException Rejection`);
      process.exit(1);
})


dotenv.config({
    path:"backend/config/config.env"
})
connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const server = app.listen(process.env.PORT ,()=>{
    console.log(`server is runinng on port ${process.env.PORT} Masha ALLAH`)
})



/////////////// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(err)
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });