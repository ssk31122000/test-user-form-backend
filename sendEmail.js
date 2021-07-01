var nodemailer = require('nodemailer');


exports.mail=(req,res)=>{
    const {name,dob,email,phone}=req.body;

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-headers","*");

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shark31122000@gmail.com',
          pass: process.env.EMAILPWD
        }
      });
      
      var mailOptions = {
        from: 'shark31122000@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 
`Hey ${name},
Thank You for submitting the form!!

Registered details are :-
Name : ${name}
Date of Birth : ${dob} 
E-mail : ${email}
Contact no. ${phone}
        
Regards,
Shardul Kulkarni. `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).send(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(info.response);
        }
      });
}

