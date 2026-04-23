export class TargetManager {
  private targets: any[] = [];
  
  addTarget(target: any) {
    this.targets.push(target);
  }
  
  removeTarget(target: any) {
    const index = this.targets.indexOf(target);
    if (index > -1) {
      this.targets.splice(index, 1);
    }
  }
  
  getTargets() {
    return this.targets;
  }
  
  clear() {
    this.targets = [];
  }
  
  update(dt: number, canvasHeight: number) {
    for (let i = this.targets.length - 1; i >= 0; i--) {
      const target = this.targets[i];
      if (!target.alive) {
        this.targets.splice(i, 1);
        continue;
      }
      
      // 更新位置
      target.x += target.vx * dt;
      target.y += target.vy * dt;
      target.vy += 800 * dt; // 重力
      
      // 更新旋转
      target.rotation += target.rotationSpeed * dt;
      
      // 更新碰撞边界
      target.bounds.x = target.x - target.bounds.w / 2;
      target.bounds.y = target.y - target.bounds.h / 2;
      
      // 检查是否超出屏幕
      if (target.y > canvasHeight + 100) {
        target.alive = false;
      }
    }
  }
}