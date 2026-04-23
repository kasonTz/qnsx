export interface Theme {
  id: string;
  name: string;
  bonusTerms: string[];
  penaltyTerms: string[];
  containerStyle: string;
  isCustom: boolean;
}

export class ThemeManager {
  private themes: Theme[] = [];
  private currentTheme: Theme | null = null;
  
  init() {
    this.loadPresetThemes();
    this.loadCustomThemes();
    this.currentTheme = this.themes[0];
  }
  
  private loadPresetThemes() {
    this.themes.push(
      {
        id: 'worker',
        name: '打工人发泄包',
        bonusTerms: ['加班', '开会', 'PPT', '改需求', '通勤', '周一'],
        penaltyTerms: ['奖金', '放假', '摸鱼', '下班'],
        containerStyle: 'worker',
        isCustom: false
      },
      {
        id: 'student',
        name: '学生解压包',
        bonusTerms: ['考试', '早八', '论文', '挂科', '点名', '体测'],
        penaltyTerms: ['周末', '外卖', '游戏', '奶茶'],
        containerStyle: 'student',
        isCustom: false
      },
      {
        id: 'life',
        name: '生活烦恼包',
        bonusTerms: ['焦虑', '失眠', '长胖', '掉发', '社交恐惧'],
        penaltyTerms: ['美食', '旅行', '运动', '好梦'],
        containerStyle: 'life',
        isCustom: false
      },
      {
        id: 'emo',
        name: 'emo终结者',
        bonusTerms: ['内耗', '自卑', '拖延', '迷茫', '孤独'],
        penaltyTerms: ['自信', '阳光', '多巴胺', '好运'],
        containerStyle: 'emo',
        isCustom: false
      },
      {
        id: 'love',
        name: '恋爱吐槽包',
        bonusTerms: ['冷暴力', '已读不回', '吵架', '异地', '猜忌'],
        penaltyTerms: ['甜蜜', '约会', '拥抱', '情话'],
        containerStyle: 'love',
        isCustom: false
      }
    );
  }
  
  private loadCustomThemes() {
    try {
      const customThemes = wx.getStorageSync('customThemes') || [];
      this.themes.push(...customThemes);
    } catch (e) {
      console.error('Failed to load custom themes:', e);
    }
  }
  
  saveCustomTheme(theme: Theme) {
    this.themes.push(theme);
    this.saveCustomThemes();
  }
  
  deleteCustomTheme(themeId: string) {
    this.themes = this.themes.filter(theme => !(theme.isCustom && theme.id === themeId));
    this.saveCustomThemes();
  }
  
  private saveCustomThemes() {
    const customThemes = this.themes.filter(theme => theme.isCustom);
    try {
      wx.setStorageSync('customThemes', customThemes);
    } catch (e) {
      console.error('Failed to save custom themes:', e);
    }
  }
  
  getThemes() {
    return this.themes;
  }
  
  getCurrentTheme() {
    return this.currentTheme;
  }
  
  setCurrentTheme(themeId: string) {
    const theme = this.themes.find(t => t.id === themeId);
    if (theme) {
      this.currentTheme = theme;
    }
  }
}