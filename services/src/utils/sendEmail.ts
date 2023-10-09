import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CASESTUDY_EMAIL,
        pass: process.env.CASESTUDY_PASSWORD
    }
});

// send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"CaseStudy" <kdaiki.pf.casestudy@gmail.com>',
    to: to,
    subject: "アカウント登録", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
