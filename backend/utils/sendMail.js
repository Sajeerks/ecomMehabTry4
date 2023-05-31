const nodemailer  = require("nodemailer")

const sendMail = async(options)=>{
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            // user: "6bccf6a4509946",
            // pass: "9207b4695bc13f"
          user: process.env.SMPT_USER,
          pass: process.env.SMPT_PASS,
        }
      });

      const mailOptions = {
        from: "ecomom@dcom.com",
        to:options.email,
        subject:options.subject,
        text:options.message,
        html: "<b>Hello world form sajeer ks eweniste?</b>"
      }
              

      try {
        let info = await transporter.sendMail({...mailOptions})
        console.log("Message sent: %s", info.messageId);
  
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      } catch (error) {
         console.log(error)
      }
       
 
}

module.exports = sendMail