export class DifficultyManager {
  private gameDuration: number;
  private elapsedTime: number = 0;
  
  constructor(duration: number) {
    this.gameDuration = duration;
  }
  
  update(dt: number) {
    this.elapsedTime += dt;
  }
  
  getSpawnInterval(): number {
    const progress = this.elapsedTime / this.gameDuration;
    if (progress < 0.25) {
      return 1.5;
    } else if (progress < 0.5) {
      return 1.2;
    } else if (progress < 0.75) {
      return 1.0;
    } else {
      return 0.8;
    }
  }
  
  getPenaltyRatio(): number {
    const progress = this.elapsedTime / this.gameDuration;
    if (progress < 0.25) {
      return 0.15;
    } else if (progress < 0.5) {
      return 0.2;
    } else if (progress < 0.75) {
      return 0.25;
    } else {
      return 0.3;
    }
  }
  
  getMaxTargets(): number {
    const progress = this.elapsedTime / this.gameDuration;
    if (progress < 0.25) {
      return 3;
    } else if (progress < 0.5) {
      return 4;
    } else if (progress < 0.75) {
      return 5;
    } else {
      return this.gameDuration === 180 ? 7 : 6;
    }
  }
  
  reset() {
    this.elapsedTime = 0;
  }
}