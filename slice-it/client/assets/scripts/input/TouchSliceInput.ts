export class TouchSliceInput {
  private isSlicing: boolean = false;
  private slicePoints: Array<{ x: number; y: number; t: number }> = [];
  private onSliceCallback: ((start: { x: number; y: number }, end: { x: number; y: number }) => void) | null = null;

  public init(onSlice: (start: { x: number; y: number }, end: { x: number; y: number }) => void): void {
    this.onSliceCallback = onSlice;
    
    // 注意：微信小游戏中没有 canvas.addEventListener，
    // 需要使用 wx.onTouchStart / wx.onTouchMove / wx.onTouchEnd
    const systemInfo = wx.getSystemInfoSync();
    const canvasOffset = { x: 0, y: 0 }; // Canvas在屏幕中的偏移，需根据实际布局设置

    wx.onTouchStart((e: any) => {
      this.isSlicing = true;
      const touch = e.touches[0];
      this.slicePoints = [{
        x: touch.clientX - canvasOffset.x,
        y: touch.clientY - canvasOffset.y,
        t: Date.now()
      }];
    });

    wx.onTouchMove((e: any) => {
      if (!this.isSlicing) return;

      const touch = e.touches[0];
      const point = {
        x: touch.clientX - canvasOffset.x,
        y: touch.clientY - canvasOffset.y,
        t: Date.now()
      };
      this.slicePoints.push(point);
      
      // 保留最近200ms的轨迹点
      const now = Date.now();
      while (this.slicePoints.length > 0 && now - this.slicePoints[0].t > 200) {
        this.slicePoints.shift();
      }
      
      // 速度检测
      if (this.slicePoints.length >= 2) {
        const prev = this.slicePoints[this.slicePoints.length - 2];
        const curr = this.slicePoints[this.slicePoints.length - 1];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        if (speed > 50) { // 速度阈值
          // 触发切割检测
          if (this.onSliceCallback) {
            this.onSliceCallback(prev, curr);
          }
        }
      }
    });
    
    wx.onTouchEnd(() => {
      this.isSlicing = false;
      this.slicePoints = [];
    });
  }

  public destroy(): void {
    // 清理事件监听器
    wx.offTouchStart();
    wx.offTouchMove();
    wx.offTouchEnd();
  }
}