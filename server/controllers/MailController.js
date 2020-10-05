/**
 * MailController.js
 * Author: Roman Shuvalov
 */
"use strict";
const nodemailer = require("nodemailer");
module.exports = {
  sendMail: async (email, notification, mailTemplate) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "neostar1996@mail.ru",
        pass: "googlenexusX&",
      },
    });
    await transporter.sendMail({
      from: '"Pogrooz" <neostar1996@mail.ru>',
      to: `${email}`,
      subject: mailTemplate.title(notification.info),
      html: `<div style="text-align: center;
            background-color: #fff;
            padding: 50px;
            margin: 0 auto;">
            ${mailTemplate.text(notification.info)}
        </div>`,
    });
  },

  sendMailToSupport: async (message, email, user) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.timeweb.ru",
      port: 465,
      secure: true,
      auth: {
        user: "support@hevachat.com",
        pass: "H2Uh9ekj",
      },
    });

    let result = await transporter.sendMail({
      from: '"Hevachat" <support@hevachat.com>',
      to: `support@hevachat.com`,
      subject: `Message from ${user._id}`,
      // text: "",
      html: `<div>
                <h1>Пользователь</h1>
                <p>
                    id: ${user._id}<br/>
                    Имя: ${user.name.first}<br/>
                    Фамилия: ${user.name.last}<br/>
                    Почта для ответа: <a href="mailto:${email}">${email}</a>
                </p>

                <h1>Сообщение</h1>
                <p>
                    ${message}
                </p>
            </div>`,
    });

    console.log(result);
  },
};
