import { GameConfig } from '../core/GameConfig';
import { Target } from '../core/GameState';

export class TargetSpawner {
  private targetId: number = 0;
  private cachedImages: Map<string, any> = new Map();

  public spawn(config: GameConfig, canvasWidth: number, canvasHeight: number): Target {
    // 1. 决定类型：加分物 or 扣分物
    const isBonus = Math.random() > config.difficultyParams.penaltyRatio;

    // 2. 随机选择词条
    const terms = isBonus ? config.theme.bonusTerms : config.theme.penaltyTerms;
    const term = terms[Math.floor(Math.random() * terms.length)];

    // 3. 随机起始X位置（屏幕宽度范围内）
    const startX = Math.random() * (canvasWidth - 200) + 100;

    // 4. 计算初速度（保证到达屏幕中上部）
    const targetY = canvasHeight * 0.2 + Math.random() * canvasHeight * 0.3;
    const flightTime = 1.0 + Math.random() * 0.5; // 1-1.5秒到达目标高度
    const vy = -(targetY + 0.5 * config.target.gravity * flightTime * flightTime) / flightTime;

    // 5. 生成目标物
    const target: Target = {
      id: `target-${this.targetId++}`,
      term,
      isBonus,
      x: startX,
      y: canvasHeight + 50,  // 从屏幕底部外开始
      vx: (Math.random() - 0.5) * 30,  // 轻微水平漂移
      vy: vy,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 360, // 随机旋转速度
      image: this.getCachedImage(term, isBonus, config.theme.containerStyle),
      bounds: { x: startX - 80, y: 0, w: 160, h: 100 }, // 碰撞包围盒
      alive: true
    };

    return target;
  }

  private getCachedImage(term: string, isBonus: boolean, containerStyle: any): any {
    const key = `${term}-${isBonus}`;
    if (this.cachedImages.has(key)) {
      return this.cachedImages.get(key);
    }

    // 这里应该使用Cocos Creator的SpriteFrame或Texture2D
    // 暂时返回null，后续在Cocos Creator中实现
    const image = null;
    this.cachedImages.set(key, image);
    return image;
  }
}