import { _decorator, Component, Node } from 'cc';
import { HomeUI } from '../ui/HomeUI';
const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends Component {
  private homeUI: HomeUI | null = null;

  onLoad() {
    // 初始化HomeUI
    this.homeUI = new HomeUI();
  }

  start() {
    // 场景启动逻辑
  }

  update(deltaTime: number) {
    // 每帧更新逻辑
  }
}
