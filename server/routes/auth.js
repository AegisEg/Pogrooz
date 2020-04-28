/**
 * auth.js
 * Author: Roman Shuvalov
 */
'use strict';

const router = require('express').Router();
const { check } = require('express-validator');
const AuthController = require('../controllers/AuthController')

// Sign up a new user
router.post('/register', [
  check('email').isEmail().withMessage('Неверный Email'),
  check('phone').notEmpty().withMessage('Телефон не может быть пустым'),
  check('firstName').notEmpty().withMessage('Имя не может быть пустым'),
  check('middleName').notEmpty().withMessage('Отчество не может быть пустым'),
  check('lastName').notEmpty().withMessage('Фамилия не может быть пустым'),
  check('password').isLength({ min: 8 }).withMessage('Пароль должен содержать минимум 8 символов')
], AuthController.register);

// Log in an existing user
router.post('/login', [
  check('phone').notEmpty().withMessage('Телефон не может быть пустым'),
  check('password').isLength({ min: 8 }).withMessage('Пароль должен содержать минимум 8 символов')
], AuthController.login);

// forgot an existing user
router.post('/forgot', [
  check('email').isEmail().notEmpty().withMessage('Email не может быть пустым'),  
], AuthController.forgot);
router.post('/reset', [
  check('password').notEmpty().withMessage('Пароль не может быть пустым'), 
  check('passwordConfirm').custom((value, { req }) => value === req.body.password).withMessage('Подтверждение  должно совпадать с паролем'),  
], AuthController.reset);

module.exports = router;