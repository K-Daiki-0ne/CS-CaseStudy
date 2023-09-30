import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string, subject: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'toby61@ethereal.email',
        pass: 'tSVMq3WW3R4UMfS1SG'
    }
});

// send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"CaseStudy" <CaseStudy@gmail.com>',
    to: to,
    subject: subject, // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}