const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config();

const mailRouter = express.Router();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "nemsdandis@gmail.com",
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take message: ${success}===`);
});

mailRouter.post("/testOfficer", function (req, res) {
  var name = req.body.name;
  var email = "Maduvha.Nemadandila@rheinmetall-denelmunition.com"; // get
  var subject = `Test request ${req.body.reportNo} `;
  var message = `Please use the link below to approve/reject the request no ${req.body.reportNo} ${req.body.Link}`;

  let mailOptions = {
    from: name,
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
});

// mailRouter.post("/requestor", function (req, res) {
//   let mailOptions = {
//     from: `${req.body.mailerState.email}`,
//     to: process.env.EMAIL,
//     subject: `Message from: ${req.body.mailerState.email}`,
//     text: `${req.body.mailerState.message}`,
//   };

//   transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//       res.json({
//         status: "fail",
//       });
//     } else {
//       console.log("== Message Sent ==");
//       res.json({
//         status: "success",
//       });
//     }
//   });
// });

module.exports = mailRouter;
