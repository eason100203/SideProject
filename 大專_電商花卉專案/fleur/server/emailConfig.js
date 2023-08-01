var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eason100203@gmail.com',
        pass: 'jzjguyijqoihxdyy',
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter; 