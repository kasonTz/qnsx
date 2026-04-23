import { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const WX_APPID = process.env.WX_APPID || '';
const WX_APPSECRET = process.env.WX_APPSECRET || '';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authController = {
  async login(req: Request, res: Response) {
    try {
      const { code } = req.body;
      
      if (!code) {
        return res.status(400).json({ error: 'Missing code' });
      }

      // 调用微信code2Session接口
      const response = await axios.get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${WX_APPID}&secret=${WX_APPSECRET}&js_code=${code}&grant_type=authorization_code`
      );

      const { openid, session_key } = response.data;

      if (!openid) {
        return res.status(400).json({ error: 'Invalid code' });
      }

      // 生成JWT token
      const token = jwt.sign(
        { openid },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ token, openid });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default authController;