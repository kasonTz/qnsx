import { Request, Response } from 'express';
import axios from 'axios';

const WX_APPID = process.env.WX_APPID || '';
const WX_APPSECRET = process.env.WX_APPSECRET || '';

let accessToken: string = '';
let accessTokenExpiry: number = 0;

// 获取access_token
async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < accessTokenExpiry) {
    return accessToken;
  }

  const response = await axios.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WX_APPID}&secret=${WX_APPSECRET}`
  );

  accessToken = response.data.access_token;
  accessTokenExpiry = now + (response.data.expires_in - 300) * 1000; // 提前5分钟过期
  return accessToken;
}

const contentController = {
  async checkText(req: Request, res: Response) {
    try {
      const { text, openid } = req.body;
      
      if (!text || !openid) {
        return res.status(400).json({ error: 'Missing text or openid' });
      }

      const token = await getAccessToken();

      // 调用微信小游戏内容安全API
      const response = await axios.post(
        `https://api.weixin.qq.com/wxa/game/content_spam/msg_sec_check?access_token=${token}`,
        {
          content: text,
          version: 2,
          scene: 1,
          openid: openid
        }
      );

      const { result } = response.data;
      
      res.json({
        pass: result.suggest === 'pass',
        label: result.label,
        suggest: result.suggest
      });
    } catch (error) {
      console.error('Content check error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default contentController;