export class GameUI {
  private container: any;
  
  constructor(container: any) {
    this.container = container;
  }
  
  init() {
    // 初始化游戏UI元素
  }
  
  updateScore(score: number) {
    // 更新分数显示
  }
  
  updateCombo(combo: number) {
    // 更新连击显示
  }
  
  updateTimer(time: number) {
    // 更新计时器显示
  }
  
  showFrenzyMode() {
    // 显示终极一击模式
  }
  
  onPause(callback: () => void) {
    // 绑定暂停按钮事件
  }
}