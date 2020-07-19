/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : pogrooz

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2020-07-04 17:30:47
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` varchar(255) DEFAULT NULL,
  `verifiedToken` varchar(255) DEFAULT NULL,
  `verifiedTokenExpires` varchar(255) DEFAULT NULL,
  `isVerified` int DEFAULT '0',
  `createdAt` int DEFAULT NULL,
  `onlineAt` datetime DEFAULT NULL,
  `online` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'neostar1996@mail.ru', 'Андрей', 'енргп', 'енргп', '+7 (999) 600-62-23', 'carrier', '0', '$2a$12$y9RUmJSVEX9rudTsDn3qKe1t4CAcvzn2RcutZJJFGiQHaS5vlHbmC', '7490e0c0c8d4b55c629318e451d75faf1c784951', '0', null, null, '0', null, '2020-07-04 16:09:29', '1');
