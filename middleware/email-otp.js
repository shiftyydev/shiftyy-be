const nodemailer = require('nodemailer');
const fs = require('fs').promises;

const email_otp = async (data) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  let htmlTemplate = await fs.readFile('./email-verification.html', 'utf8');
  htmlTemplate = htmlTemplate.replace('{{subject}}', data.subject);
  htmlTemplate = htmlTemplate.replace('{{message}}', data.message);

  let info = await transporter.sendMail({
    from: process.env.MAIL, // sender address
    to: data.email, // list of receivers
    subject: data.subject,
    html: htmlTemplate,
  });

  if (info.accepted.length > 0) {
    return 'message send';
  } else return 'error';
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

// email_otp({email: 'alinaqvi514@hotmail.com', otp: 151515})

module.exports = {
  email_otp,
  transporter,
};
