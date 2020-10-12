/**
 * MailController.js
 * Author: Roman Shuvalov
 */
"use strict";
const nodemailer = require("nodemailer");
const Setting = require("../models/Setting");
module.exports = {
  sendMail: async (email, notification, mailTemplate) => {
    let settings = await Setting.aggregate([
      {
        $replaceRoot: {
          newRoot: {
            $arrayToObject: {
              $let: {
                vars: { data: [{ k: "$key", v: "$value" }] },
                in: "$$data",
              },
            },
          },
        },
      },
    ]);
    let settingsNew = {};
    settings.map((item) => {
      settingsNew = { ...settingsNew, ...item };
    });    
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
      html: await mailTemplateFunc(
        mailTemplate.text(notification.info),
        mailTemplate.title(notification.info),
        settingsNew
      ),
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
  },
};
async function mailTemplateFunc(title, content, settingsNew) {
  return `
  
          <style>
              @import url(http://fonts.googleapis.com/css?family=Roboto);
              #bodymyemail * {
                  margin: 0;
                  padding: 0;
                  font-family: Roboto, Arial, sans-serif;
              }
              #bodymyemail td:first-child{
                  padding-left: 60px!important;
              }
              #bodymyemail td:last-child{
                  padding-right: 60px!important;
              }
              #bodymyemail a{
                  color:#9509EF;
                  text-decoration: underline!important;
              }
              
              #bodymyemail              

          </style>
          <table id="bodymyemail" width="867px" cellspacing="0" cellpadding="0">
              <tr align="center" bgcolor="#F7F7F7" >
                  <td colspan="2" style="padding: 20px 0 20px 0">
                      <img src="http://localhost:8000/media/mail/logo.svg" alt="">
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="padding: 30px 0 30px 0;">
                      <h1 align="center" style="padding: 0 0 30px 0;font-size: 20px;">Заголовок</h1>
                      <p style="font-size: 14px;">Попутные грузоперевозки с PoGrooz – это шаг в будущее удобных грузоперевозок. Здесь Вы легко и быстро можете найти Заказ или Предложение на перевозку груза. <a href="asdasd">asdasd</a></p>
                  </td>
              </tr>
              <tr bgcolor="#F9F8F8">
                  <td style="padding: 30px 0 30px 0;vertical-align: top;">
                      <h2 style="font-size: 18px;">Поисковик попутных перевозок для ваших грузов</h2>
                      <div>
                          <img src="http://localhost:8000/media/mail/buttonOne.svg" alt="">
                          <img src="http://localhost:8000/media/mail/buttonOne.svg" alt="">
                      </div>
                  </td>
                  <td align="right" style="padding: 30px 0 30px 0;">
                      <img src="http://localhost:8000/media/mail/1%201.png" alt="">
                  </td>
              </tr>
              <tr bgcolor="#4F4F4F"  style="vertical-align: middle; ">
                  <td>
                      <div style="color:#fff; display: inline-block;">Телефон: 8 (800) 000 00 99</div>
                      <div style="color:#fff;  display: inline-block;">E-mail: info@pogrooz.ru</div>
                  </td>
                  <td align="right" style="padding: 10px 0 10px 0;">
                      <a class="img" href="${settingsNew.vk}">
                          <img src="http://localhost:8000/media/mail/vk.svg" alt="">
                      </a>
                      <a class="img" href="${settingsNew.facebook}">
                          <img src="http://localhost:8000/media/mail/facebook.svg" alt="">
                      </a>
                      <a class="img" href="${settingsNew.instagram}">
                          <img src="http://localhost:8000/media/mail/insta.svg" alt="">
                      </a>
                  </td>
              </tr>            
          </table>
     `;
}
