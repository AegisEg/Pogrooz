const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const bcrypt = require("bcryptjs");

const User = require('../models/User');
const Page = require('../models/Page');
const Question = require('../models/Question');
const QuestionSection = require('../models/QuestionSection');
// const Room = require('../models/Room');
// const Friend = require('../models/Friends');
// const Dialog = require('../models/Dialog');
// const Tariff = require('../models/Tariff');

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  rootPath: '/admin',
  branding: {
    companyName: 'Pogrooz',
    softwareBrothers: false,
  },
  resources: [
    {
        resource: User,
        options: {
            listProperties: ['email', 'isPassportVerified', 'name.first', 'name.last', 'name.middle'],
          actions: {
            delete: {
              isVisible: false,
            },
            new: {
              isVisible: false,
            },
            edit: {
              isVisible: true,
            },
          },
            properties: {
                _id: { isVisible: { list: false, filter: false, show: true, edit: false } },
                isPassportVerified: { isVisible: { list: true, filter: true, show: true, edit: true } },
                email: { isVisible: { list: true, filter: true, show: true, edit: true } },
                createdAt: { isVisible: { list: false, filter: false, show: false, edit: false } },
                online: { isVisible: { list: true, filter: true, show: true, edit: false } },
                buff: { isVisible: { list: false, filter: false, show: false, edit: false } },
                avatar: { isVisible: { list: false, filter: false, show: false, edit: false } },
                address: { isVisible: { list: false, filter: false, show: false, edit: false } },
                contract_id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                resetPasswordToken: { isVisible: { list: false, filter: false, show: false, edit: false } },
                resetPasswordExpires: { isVisible: { list: false, filter: false, show: false, edit: false } },
                verifiedToken: { isVisible: { list: false, filter: false, show: false, edit: false } },
                verifiedTokenExpires: { isVisible: { list: false, filter: false, show: false, edit: false } },
                isVerified: { isVisible: { list: false, filter: true, show: true, edit: true } },
                
            },
        }
    },
    {
      resource: Page,
      options: {
        actions: {
          delete: {
            isVisible: true,
          },
          new: {
            isVisible: true,
          },
          edit: {
            isVisible: true,
          },
        },
          properties: {
              _id: { isVisible: { list: false, filter: false, show: true, edit: false } },
              slug: { isVisible: { list: true, filter: true, show: true, edit: true } },
              content: { isVisible: { list: false, filter: false, show: true, edit: true }, type: 'richtext' },
              isPrivate: { isVisible: { list: true, filter: true, show: true, edit: true } },
              createdAt: {isVisible: { list: false, filter: false, show: false, edit: false }},
              buff: {isVisible: { list: false, filter: false, show: false, edit: false }},
              title: {isVisible: { list: true, filter: true, show: true, edit: true }}
          },
      }
  },
  {
    resource: Question,
    options: {
      actions: {
        delete: {
          isVisible: true,
        },
        new: {
          isVisible: true,
        },
        edit: {
          isVisible: true,
        },
      },
        properties: {
            _id: { isVisible: { list: false, filter: false, show: true, edit: false } },
            createdAt: {isVisible: { list: false, filter: false, show: false, edit: false }},
            content: { isVisible: { list: false, filter: false, show: true, edit: true }, type: 'richtext' },
            buff: {isVisible: { list: false, filter: false, show: false, edit: false }},
            title: {isVisible: { list: true, filter: true, show: true, edit: true }}
        },
    }
},
{
  resource: QuestionSection,
  options: {
    actions: {
      delete: {
        isVisible: true,
      },
      new: {
        isVisible: true,
      },
      edit: {
        isVisible: true,
      },
    },
      properties: {
          _id: { isVisible: { list: false, filter: false, show: true, edit: false } },
          createdAt: {isVisible: { list: false, filter: false, show: false, edit: false }},
          buff: {isVisible: { list: false, filter: false, show: false, edit: false }},
          title: {isVisible: { list: true, filter: true, show: true, edit: true }},
          questions: {isVisible: { list: true, filter: true, show: true, edit: true }},
          type: {isVisible: { list: true, filter: true, show: true, edit: true }, availableValues: [
            {
              value: 'all',
              label: 'Для всех'
            },
            {
              value: 'cargo',
              label: 'Для перевозчиков'
            },
            {
              value: 'carrier',
              label: 'Для грузовладельцев'
            },
          ]},
      },
  }
},
  ],
  locale: {
    translations: {
      labels: {
        User: 'Пользователи',
        Page: 'Страницы',
        Tariff: 'Тарифы',
        Question: 'Вопросы',
        QuestionSection: 'Разделы вопросов'
      },
    }
  },
})

let router = require('express').Router();

module.exports = adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
      let user = await User.findOne({email}).select('+password').select('+email')
      if(user) {
          let verifiedPassword = await bcrypt.compare(password, user.password);

          if (verifiedPassword) {
              return {email: user.email, password}
          }
      }

      return null
  },
  cookieName: 'adminbro',
  cookiePassword: 'somePassword',
}, router)