import { Node, Button, Label, find } from 'cc';
import { SceneManager } from '../core/SceneManager';

export class HomeUI {
  private startButton: Button | null = null;
  private titleLabel: Label | null = null;
  
  constructor() {
    this.init();
  }
  
  init() {
    // 初始化首页UI元素
    const canvas = find('Canvas');
    if (canvas) {
      const startButtonNode = canvas.getChildByName('StartButton');
      if (startButtonNode) {
        this.startButton = startButtonNode.getComponent(Button);
        if (this.startButton) {
          this.startButton.node.on(Button.EventType.CLICK, this.onStartButtonClick, this);
        }
      }
      
      const titleNode = canvas.getChildByName('Title');
      if (titleNode) {
        this.titleLabel = titleNode.getComponent(Label);
      }
    }
  }
  
  private onStartButtonClick() {
    // 跳转到游戏场景
    SceneManager.loadGame();
  }
  
  showThemeSelector() {
    // 显示主题选择器
  }
  
  showModeSelector() {
    // 显示模式选择器
  }
  
  showDurationSelector() {
    // 显示时长选择器
  }
  
  updateHighScore(score: number) {
    // 更新最高分显示
  }
}