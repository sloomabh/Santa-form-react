const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const sendEmail = async (pendingRequests) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    const emailTemplatePath = path.join(__dirname, '../views/emailTemplate.ejs');
    const emailContent = await ejs.renderFile(emailTemplatePath, { pendingRequests });

    await transporter.sendMail({
      from: '"Santa\'s Helper" <do_not_reply@northpole.com>',
      to: 'santa@northpole.com',
      subject: 'Pending Requests for Santa',
      html: emailContent,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
