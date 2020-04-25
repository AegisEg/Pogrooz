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
  check('email').isEmail().withMessage('Неверный Email'),
  check('password').isLength({ min: 8 }).withMessage('Пароль должен содержать минимум 8 символов')
], AuthController.login);

module.exports = router;