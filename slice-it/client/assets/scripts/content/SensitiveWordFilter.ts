export class SensitiveWordFilter {
  private wordSet: Set<string>;
  
  constructor() {
    this.wordSet = new Set([
      // 常见敏感词列表
      '暴力', '色情', '赌博', '毒品', '政治', '反动',
      '诈骗', '违法', '犯罪', '恐怖', '极端', '邪教'
    ]);
  }
  
  check(text: string): { safe: boolean; matched?: string } {
    for (const word of this.wordSet) {
      if (text.includes(word)) {
        return { safe: false, matched: word };
      }
    }
    return { safe: true };
  }
  
  checkFuzzy(text: string): { safe: boolean; matched?: string } {
    const normalized = text.replace(/[\s\-\_]/g, '');
    return this.check(normalized);
  }
}