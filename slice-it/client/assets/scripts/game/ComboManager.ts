export class ComboManager {
  private comboCount: number = 0;
  private lastSliceTime: number = 0;
  private readonly COMBO_RESET_INTERVAL = 2000;

  onSliceHit(): number {
    const now = Date.now();
    if (now - this.lastSliceTime <= this.COMBO_RESET_INTERVAL) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastSliceTime = now;
    return this.comboCount;
  }

  onSlicePenalty(): void {
    this.comboCount = 0;
    this.lastSliceTime = 0;
  }

  update(): void {
    if (this.comboCount > 0 && Date.now() - this.lastSliceTime > this.COMBO_RESET_INTERVAL) {
      this.comboCount = 0;
    }
  }

  getCombo(): number {
    return this.comboCount;
  }

  getComboBonus(): number {
    switch (this.comboCount) {
      case 0:
      case 1: return 0;
      case 2: return 5;
      case 3: return 10;
      case 4: return 20;
      default: return 30;
    }
  }

  reset(): void {
    this.comboCount = 0;
    this.lastSliceTime = 0;
  }
}