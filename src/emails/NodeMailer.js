import nodemailer from 'nodemailer';


export const sendEmail = async(options)=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'yossefazozz40@gmail.com',
          pass: 'ypdcdpsdyhecvidx'
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    
    
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Route Academy NodeJS" <yossefazozz40@gmail.com>', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        html: options.htmlCode(`http://localhost:5000/auth/verify/${options.userToken}`), // html body
    });
    
    console.log("Message sent: %s", info.messageId);

};
