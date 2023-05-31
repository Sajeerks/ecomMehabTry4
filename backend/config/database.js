const mongoose = require("mongoose")
 
//  exports.connectDatabase = async()=>{
//  connectDatabase = async()=>{

//    console.log("wa")

//     try {
//         const {connection}  = await mongoose.connect(process.env.DB_URI)
//         // console.log("lllll")
//         console.log(connection)

//         console.log(connection.host);
//     } catch (error) {
//         console.log(error);
        
//     }
//     finally{
//         console.log("finalll")
//     }
//    console.log("la")
// }







const connectDatabase =  ()=>{


    mongoose.connect(process.env.DB_URI, {
         useNewUrlParser: true,
        useUnifiedTopology: true,
         })
    .then((con) => {
        console.log(`Mongodb connected with server: ${con.connection.host}`);
      console.log("Database is connected");
    },
    (err) => {
    console.log("There is problem while connecting database " + err);
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    // console.log("staaa")
    
    // mongoose.connect(process.env.DB_URI,{
    //     // useNewUrlParser: true,
    //     // useUnifiedTopology: true,
    //     // useCreateIndex: true,
    //   }).then((con)=>{
    //     console.log(`Database connected to ${con.connection.host} `)
    // }).catch((error)=>{
    //     console.log(error);
    // }).finally(
    //     console.log("final")
    // )
    // console.log("lasssssss")
}


// const connectDatabase = async() => {
//     console.log("hererer")
//     // const data = await mongoose.connect(process.env.DB_URI)
//     // console.log(data)
//     // console.log(data.connection.host)
    
//     mongoose.connect(process.env.DB_URI, {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//         // useCreateIndex: true,
//       })
//       .then((data) => {
//         console.log(`Mongodb connected with server: ${data.connection.host}`);
//       })
//       .catch((err)=>{
//         console.log(err)
//       }).finally(
//         console.log("finalll")
//       )

//       console.log("tehere")
//   };
  
  module.exports = connectDatabase


