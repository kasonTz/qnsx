export class WxStorage {
  static set(key: string, value: any): boolean {
    try {
      wx.setStorageSync(key, value);
      return true;
    } catch (e) {
      console.error('Storage set failed:', e);
      return false;
    }
  }
  
  static get(key: string, defaultValue: any = null): any {
    try {
      const value = wx.getStorageSync(key);
      return value !== undefined ? value : defaultValue;
    } catch (e) {
      console.error('Storage get failed:', e);
      return defaultValue;
    }
  }
  
  static remove(key: string): boolean {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      console.error('Storage remove failed:', e);
      return false;
    }
  }
  
  static clear(): boolean {
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      console.error('Storage clear failed:', e);
      return false;
    }
  }
}