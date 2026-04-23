export class ResultUI {
  private container: any;
  
  constructor(container: any) {
    this.container = container;
  }
  
  init() {
    // 初始化结果页UI元素
  }
  
  showResult(score: number, highScore: number, topTerms: string[]) {
    // 显示游戏结果
  }
  
  onPlayAgain(callback: () => void) {
    // 绑定再来一局按钮事件
  }
  
  onChangeTheme(callback: () => void) {
    // 绑定换主题按钮事件
  }
  
  onBackToHome(callback: () => void) {
    // 绑定返回首页按钮事件
  }
}