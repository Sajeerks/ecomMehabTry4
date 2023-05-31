const express = require("express");
const app = express();
const errorMiddlewareHandler = require("./middleware/Error");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());



const productRoutes = require("./routes/productRoute.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoute.js");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

/// middle eaere fo errro r

app.use(errorMiddlewareHandler);

// app.use((err, req, res, next) => {
//     console.log(req)
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
//   })

// app.use((err, req, res, next) => {
//     if (res.headersSent) {
//       return next(err);
//     }
//     console.error(err);
//     res.status(500).send("Oh no!");
//   });

module.exports = app;
