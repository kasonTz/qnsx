interface Point {
  x: number;
  y: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Fragment {
  image: any;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  angularVelocity: number;
  alpha: number;
  gravity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface SliceResult {
  fragments: Fragment[];
  particles: Particle[];
}

export class SliceEffect {
  static createSliceEffect(
    targetImage: HTMLImageElement,
    targetRect: Rect,
    sliceLine: { start: Point, end: Point },
    color: string
  ): SliceResult {
    const fragments: Fragment[] = [];
    const particles: Particle[] = [];
    
    const upperCanvas = wx.createCanvas();
    upperCanvas.width = targetImage.width;
    upperCanvas.height = targetImage.height;
    const upperCtx = upperCanvas.getContext('2d');
    
    upperCtx.save();
    upperCtx.beginPath();
    upperCtx.moveTo(0, 0);
    upperCtx.lineTo(targetImage.width, 0);
    upperCtx.lineTo(targetImage.width, targetImage.height);
    upperCtx.lineTo(0, targetImage.height);
    upperCtx.closePath();
    upperCtx.clip();
    upperCtx.drawImage(targetImage, 0, 0);
    upperCtx.restore();
    
    fragments.push({
      image: upperCanvas,
      x: targetRect.x + targetRect.w / 2,
      y: targetRect.y + targetRect.h / 2,
      vx: (Math.random() - 0.5) * 200,
      vy: -Math.random() * 150,
      rotation: 0,
      angularVelocity: (Math.random() - 0.5) * 10,
      alpha: 1,
      gravity: 800
    });
    
    particles.push(...this.createParticlesAlongLine(sliceLine, color, 15));
    
    return { fragments, particles };
  }
  
  private static createParticlesAlongLine(
    line: { start: Point, end: Point },
    color: string, count: number
  ): Particle[] {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      particles.push({
        x: line.start.x + (line.end.x - line.start.x) * t,
        y: line.start.y + (line.end.y - line.start.y) * t,
        vx: (Math.random() - 0.5) * 300,
        vy: (Math.random() - 0.5) * 300,
        size: 2 + Math.random() * 4,
        color: color,
        alpha: 1,
        life: 0.5 + Math.random() * 0.5
      });
    }
    return particles;
  }
  
  private static extendLineToCanvas(line: { start: Point, end: Point }, rect: Rect): { start: Point, end: Point } {
    return line;
  }
}