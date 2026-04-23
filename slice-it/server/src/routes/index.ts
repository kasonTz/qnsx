import express from 'express';
import authController from '../controllers/authController';
import contentController from '../controllers/contentController';

const router = express.Router();

// 认证路由
router.post('/auth/login', authController.login);

// 内容审核路由
router.post('/content/check', contentController.checkText);

export default router;