export class GestureRecognizer {
  private session: any = null;
  private lastPositions: Array<{ x: number; y: number; t: number }> = [];
  private cooldown: boolean = false;
  private onSliceCallback: ((start: { x: number; y: number }, end: { x: number; y: number }) => void) | null = null;
  private isInitialized: boolean = false;

  public init(onSlice: (start: { x: number; y: number }, end: { x: number; y: number }) => void): void {
    this.onSliceCallback = onSlice;
    
    try {
      // 检查是否支持VKSession
      if (typeof wx.createVKSession === 'undefined') {
        console.warn('VKSession is not supported on this device');
        return;
      }

      // 创建VKSession
      this.session = wx.createVKSession({
        track: { hand: { mode: 1 } }
      });

      this.session.on('updateAnchors', (anchors: any[]) => {
        if (anchors.length === 0) {
          this.lastPositions = [];
          return;
        }

        const anchor = anchors[0];
        if (anchor.score < 0.5) return; // 置信度过滤

        // 获取食指指尖坐标
        const indexTip = anchor.points[8]; // landmark 8
        if (!indexTip) return;

        this.processFrame(indexTip.x, indexTip.y);
      });

      this.session.start((errno: number) => {
        if (errno) {
          console.error('VKSession启动失败:', errno);
        } else {
          this.isInitialized = true;
          console.log('VKSession启动成功');
        }
      });
    } catch (error) {
      console.error('GestureRecognizer initialization error:', error);
    }
  }

  private processFrame(x: number, y: number): void {
    const now = Date.now();
    this.lastPositions.push({ x, y, t: now });

    // 只保留最近200ms的数据
    while (this.lastPositions.length > 0 && now - this.lastPositions[0].t > 200) {
      this.lastPositions.shift();
    }

    if (this.lastPositions.length < 3 || this.cooldown) return;

    // 速度计算
    const recent = this.lastPositions.slice(-3);
    const dx = recent[2].x - recent[0].x;
    const dy = recent[2].y - recent[0].y;
    const dt = (recent[2].t - recent[0].t) / 1000;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    // 速度阈值判定
    const systemInfo = wx.getSystemInfoSync();
    const canvasWidth = systemInfo.windowWidth;
    if (speed < canvasWidth * 0.3) return;

    // 方向一致性检测
    // 简化版：检查最近两帧的方向是否一致
    const dir1 = Math.atan2(recent[1].y - recent[0].y, recent[1].x - recent[0].x);
    const dir2 = Math.atan2(recent[2].y - recent[1].y, recent[2].x - recent[1].x);
    const dirDiff = Math.abs(dir1 - dir2);
    if (dirDiff > Math.PI / 6) return; // 方向偏差大于30度

    // 触发切割
    this.cooldown = true;
    setTimeout(() => { this.cooldown = false; }, 300);

    if (this.onSliceCallback) {
      // 将归一化坐标映射到屏幕坐标
      const start = this.mapToScreen(recent[0].x, recent[0].y);
      const end = this.mapToScreen(recent[2].x, recent[2].y);
      this.onSliceCallback(start, end);
    }
  }

  private mapToScreen(vkX: number, vkY: number): { x: number; y: number } {
    const systemInfo = wx.getSystemInfoSync();
    return {
      x: vkX * systemInfo.windowWidth,
      y: (1 - vkY) * systemInfo.windowHeight  // y轴翻转：VKSession y向下，屏幕y向上
    };
  }

  public destroy(): void {
    if (this.session) {
      try {
        this.session.stop();
        this.session.destroy();
      } catch (error) {
        console.error('Error destroying VKSession:', error);
      }
    }
  }

  public isAvailable(): boolean {
    return this.isInitialized;
  }
}