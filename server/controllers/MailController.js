/**
 * MailController.js
 * Author: Roman Shuvalov
 */
"use strict";
const nodemailer = require("nodemailer");
const Setting = require("../models/Setting");
const smtp = "smtp.mail.ru",
  username = "neostar1996@mail.ru",
  password = "googlenexusX&";
module.exports = {
  sendMailCall: async (req, res, next) => {
    let { phone, name } = req.body;
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
      from: '"Pogrooz" <neostar1996@mail.ru>',
      to: `neostar1996@mail.ru`,
      subject: "Заказ звонка",
      html: await mailTemplateFunc(
        `Гость портала ${name} простит ему перезвонить по номеру ${phone}`,
        "Заказ звонка",
        settingsNew
      ),
    });
    return res.json({ error: false });
  },
  sendMailSimple: async (title, content, email) => {
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
      from: '"Pogrooz" <neostar1996@mail.ru>',
      to: email,
      subject: title,
      html: await mailTemplateFunc(content, title, settingsNew),
    });
    return true;
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
        from: '"Pogrooz" <neostar1996@mail.ru>',
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
                    <img width="198px" src="${process.env.API_URL}/mailImg/logo.png">
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="padding: 30px 60px 30px 60px;">
                      <h1 align="center" style="padding: 0 0 0px 0; margin:0 0 30px 0; font-size: 20px;">${title}</h1>
                      <p style="font-size: 14px;">${content}</p>
                  </td>
              </tr>
              <tr bgcolor="#F9F8F8">
                  <td style="padding: 30px 0 30px 60px;vertical-align: top;">
                      <h2 style="font-size: 18px;">Поисковик попутных перевозок для ваших грузов</h2>
                      <div>
                      <a href="${process.env.CLIENT_URL}/cargo">
                        <img
                          src="${process.env.API_URL}/mailImg/button1.png"
                          alt="">
                      </a>
                      <a href="${process.env.CLIENT_URL}/cargo">
                      <img
                        src="${process.env.API_URL}/mailImg/button2.png"
                        alt="">
                    </a>
                    </div>
                  </td>
                  <td align="right" style="padding: 30px 60px 30px 0;">
                      <img width="168px" src="${process.env.API_URL}/mailImg/main.png" alt="">
                  </td>
              </tr>
              <tr bgcolor="#4F4F4F"  style="vertical-align: middle; ">
                  <td style="padding:0 0 0 60px;">
                      <div style="color:#fff; display: inline-block;">Телефон: <a href="tel:${settingsNew.phone
    }"></a>${settingsNew.phone}</div>
                      <div style="color:#fff;  display: inline-block;">E-mail: <a style="color:#fff;" href="mailto:${settingsNew.email
    }">${settingsNew.email}</a></div>
                  </td>
                  <td align="right" style="padding: 10px 60px 10px 0;">
                      <a class="img" href="${settingsNew.vk}">
                          <img src="${process.env.API_URL}/mailImg/vk.png" alt="">
                      </a>
                      <a class="img" href="${settingsNew.facebook}">
                          <img src="${process.env.API_URL}/mailImg/facebook.png" alt="">
                      </a>
                      <a class="img" href="${settingsNew.instagram}">
                          <img src="${process.env.API_URL}/mailImg/insta.png" alt="">
                      </a>
                  </td>
              </tr>            
          </table>
     `;
}
