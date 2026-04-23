import { Theme } from './ThemeManager';

export class CustomThemeCreator {
  private sensitiveWordFilter: any;
  
  constructor(sensitiveWordFilter: any) {
    this.sensitiveWordFilter = sensitiveWordFilter;
  }
  
  async createTheme(name: string, bonusTerms: string[], penaltyTerms: string[]): Promise<{ success: boolean; theme?: Theme; error?: string }> {
    // 验证输入
    if (!name || name.trim().length === 0) {
      return { success: false, error: '主题名称不能为空' };
    }
    
    if (bonusTerms.length === 0) {
      return { success: false, error: '至少需要添加一个加分词条' };
    }
    
    if (bonusTerms.length > 10) {
      return { success: false, error: '加分词条最多10个' };
    }
    
    if (penaltyTerms.length > 5) {
      return { success: false, error: '扣分词条最多5个' };
    }
    
    // 检查敏感词
    for (const term of bonusTerms) {
      if (term.length > 6) {
        return { success: false, error: `词条"${term}"超过6个字符` };
      }
      const checkResult = this.sensitiveWordFilter.check(term);
      if (!checkResult.safe) {
        return { success: false, error: `词条"${term}"包含敏感内容` };
      }
    }
    
    for (const term of penaltyTerms) {
      if (term.length > 6) {
        return { success: false, error: `词条"${term}"超过6个字符` };
      }
      const checkResult = this.sensitiveWordFilter.check(term);
      if (!checkResult.safe) {
        return { success: false, error: `词条"${term}"包含敏感内容` };
      }
    }
    
    // 检查内容安全
    for (const term of [...bonusTerms, ...penaltyTerms]) {
      const safe = await this.checkContentSafety(term);
      if (!safe) {
        return { success: false, error: `词条"${term}"未通过内容审核` };
      }
    }
    
    // 创建主题
    const theme: Theme = {
      id: 'custom_' + Date.now(),
      name: name.trim(),
      bonusTerms: bonusTerms,
      penaltyTerms: penaltyTerms,
      containerStyle: 'custom',
      isCustom: true
    };
    
    return { success: true, theme };
  }
  
  private async checkContentSafety(text: string): Promise<boolean> {
    try {
      const response = await wx.request({
        url: 'https://your-backend-api.com/api/content/check',
        method: 'POST',
        data: { text }
      });
      return response.data.pass;
    } catch (e) {
      console.error('Content safety check failed:', e);
      return true; // 失败时默认通过，避免影响用户体验
    }
  }
}