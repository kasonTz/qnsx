import { GameStateManager } from '../core/GameState';

export class ScoreManager {
  private comboCount: number = 0;
  private lastSliceTime: number = 0;
  private readonly COMBO_RESET_INTERVAL = 2000; // 2秒内未切中则重置
  private stateManager: GameStateManager;

  constructor() {
    this.stateManager = GameStateManager.getInstance();
  }

  /**
   * 切中加分物时调用
   * @returns 当前连击数
   */
  public onSliceHit(): number {
    const now = Date.now();
    // 检查是否在重置间隔内
    if (now - this.lastSliceTime <= this.COMBO_RESET_INTERVAL) {
      this.comboCount++;
    } else {
      this.comboCount = 1; // 超时，重新开始计数
    }
    this.lastSliceTime = now;
    this.stateManager.setCombo(this.comboCount);
    return this.comboCount;
  }

  /**
   * 切中扣分物时调用 —— 立即重置连击
   */
  public onSlicePenalty(): void {
    this.comboCount = 0;
    this.lastSliceTime = 0;
    this.stateManager.setCombo(0);
  }

  /**
   * 每帧更新，检查是否超时重置
   */
  public updateCombo(dt: number): void {
    if (this.comboCount > 0 && Date.now() - this.lastSliceTime > this.COMBO_RESET_INTERVAL) {
      this.comboCount = 0;
      this.stateManager.setCombo(0);
    }
  }

  /**
   * 获取当前连击数
   */
  public getCombo(): number {
    return this.comboCount;
  }

  /**
   * 计算Combo加成分数
   */
  public getComboBonus(): number {
    const state = this.stateManager.getState();
    return state.config.scoring.comboBonus[this.comboCount] || 0;
  }

  /**
   * 重置计分系统
   */
  public reset(): void {
    this.comboCount = 0;
    this.lastSliceTime = 0;
    this.stateManager.setCombo(0);
    this.stateManager.setState({ score: 0 });
  }
}