/**
 * MailController.js
 * Author: Roman Shuvalov
 */
"use strict";
const nodemailer = require("nodemailer");
const Setting = require("../models/Setting");
const smtp = "smtp.yandex.ru",
  username = "info@pogrooz.ru",
  password = "B2mvR0_W";
// const smtp = "smtp.mail.ru",
//   username = "neostar1996@mail.ru",
//   password = "googlenexusX&";
module.exports = {
  sendMailCall: async (req, res, next) => {
    let { phone, name } = req.body;
    try {
      let settingsNew = await settings();
      let transporter = nodemailer.createTransport({
        host: smtp,
        port: 465,
        secure: true,
        auth: {
          user: username,
          pass: password,
        },
      });
      await transporter.sendMail({
        from: `"Pogrooz" <${username}>`,
        to: settingsNew.email,
        subject: "Заказ звонка",
        html: await mailTemplateFunc(
          `Гость портала ${name} простит ему перезвонить по номеру ${phone}`,
          "Заказ звонка",
          settingsNew
        ),
      });
      return res.json({ error: false });
    } catch (e) {
      console.log(e);
    }
  },
  sendMailSimple: async (title, content, email) => {
    try {
      let settingsNew = await settings();
      let transporter = nodemailer.createTransport({
        host: smtp,
        port: 465,
        secure: true,
        auth: {
          user: username,
          pass: password,
        },
      });
      await transporter.sendMail({
        from: `"Pogrooz" <${username}>`,
        to: email,
        subject: title,
        html: await mailTemplateFunc(content, title, settingsNew),
      });
      return true;
    } catch (e) {
      console.log(e);
    }
  },
  sendMail: async (email, notification, mailTemplate) => {
    try {
      let settingsNew = await settings();
      let transporter = nodemailer.createTransport({
        host: smtp,
        port: 465,
        secure: true,
        auth: {
          user: username,
          pass: password,
        },
      });
      await transporter.sendMail({
        from: `"Pogrooz" <${username}>`,
        to: `${email}`,
        subject: mailTemplate.title(notification.info),
        html: await mailTemplateFunc(
          mailTemplate.text(notification.info),
          mailTemplate.title(notification.info),
          settingsNew
        ),
      });
    } catch (e) {
      console.log(e);
    }
  },
};
async function settings() {
  try {
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
    return settingsNew;
  } catch (e) {
    console.log(e);
  }
}
async function mailTemplateFunc(content, title, settingsNew) {
  return `
  
          <style>
              @import url(http://fonts.googleapis.com/css?family=Roboto);
              #bodymyemail * {
                  margin: 0;
                  padding: 0;
                  font-family: Roboto, Arial, sans-serif;
              }            
              #bodymyemail a{
                  color:#9509EF;
                  text-decoration: underline!important;
              }          

          </style>
          <table id="bodymyemail" style="margin:auto;" width="867px" cellspacing="0" cellpadding="0">
              <tr align="center" bgcolor="#F7F7F7" >
                  <td colspan="2" style="padding: 20px 0 20px 0">
                    <img width="198px" src="${
                      process.env.CLIENT_URL
                    }/mailImgs/logo.png">
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="padding: 30px 60px 30px 60px;">
                      <h1 align="center" style="padding: 0 0 0px 0; margin:0 0 30px 0; font-size: 20px;">${title}</h1>
                      <p style="font-size: 14px;">${content}</p>
                      <p style="margin-top:20px; font-size:10px;">Вы получили это письмо, потому что являетесь зарегистрированным пользователем Pogrooz.ru.</p>
                      <p style="font-size:10px;">
                      Если у вас возникли вопросы, ответы можно найти в разделе 
                      <a href="${settingsNew.helpInFaq}">"Помощь"</a>
                      </p>
                      </td>
              </tr>
              <tr bgcolor="#F9F8F8">
                  <td style="padding: 30px 0 30px 60px;vertical-align: top;">
                      <h2 style="font-size: 18px;">Поисковик попутных перевозок для ваших грузов</h2>
                      <div>
                      <a href="${process.env.CLIENT_URL}/cargo">
                        <img
                          src="${process.env.CLIENT_URL}/mailImgs/button1.png"
                          alt="">
                      </a>
                      <a href="${process.env.CLIENT_URL}/cargo">
                      <img
                        src="${process.env.CLIENT_URL}/mailImgs/button2.png"
                        alt="">
                    </a>
                    </div>
                  </td>
                  <td align="right" style="padding: 30px 60px 30px 0;">
                      <img width="168px" src="${
                        process.env.CLIENT_URL
                      }/mailImgs/main.png" alt="">
                  </td>
              </tr>
              <tr bgcolor="#4F4F4F"  style="vertical-align: middle; ">
                  <td style="padding:0 0 0 60px;">
                      <div style="color:#fff; display: inline-block;">Телефон: <a href="tel:${
                        settingsNew.phone
                      }"></a>${settingsNew.phone}</div>
                      <div style="color:#fff;  display: inline-block;">E-mail: <a style="color:#fff;" href="mailto:${
                        settingsNew.email
                      }">${settingsNew.email}</a></div>
                  </td>
                  <td align="right" style="padding: 10px 60px 10px 0;">
                      <a class="img" href="${settingsNew.vk}">
                          <img src="${
                            process.env.CLIENT_URL
                          }/mailImgs/vk.png" alt="">
                      </a>
                      <a class="img" href="${settingsNew.facebook}">
                          <img src="${
                            process.env.CLIENT_URL
                          }/mailImgs/facebook.png" alt="">
                      </a>
                      <a class="img" href="${settingsNew.instagram}">
                          <img src="${
                            process.env.CLIENT_URL
                          }/mailImgs/insta.png" alt="">
                      </a>
                  </td>
              </tr>            
          </table>
     `;
}
