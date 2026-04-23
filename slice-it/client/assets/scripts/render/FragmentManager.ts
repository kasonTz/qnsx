import { Target } from '../core/GameState';

export interface Fragment {
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

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export class FragmentManager {
  private fragments: Fragment[] = [];
  private particles: Particle[] = [];

  public update(dt: number): void {
    // 更新碎片
    for (let i = this.fragments.length - 1; i >= 0; i--) {
      const f = this.fragments[i];
      f.vy += f.gravity * dt;  // 重力
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.rotation += f.angularVelocity * dt;
      f.alpha -= dt * 1.5;    // 渐隐

      if (f.alpha <= 0 || f.y > 1500) { // 假设屏幕高度为1334
        this.fragments.splice(i, 1); // 回收
      }
    }

    // 更新粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      p.alpha = Math.max(0, p.life * 2);
      p.size *= 0.98;

      if (p.life <= 0) {
        this.particles.splice(i, 1); // 回收
      }
    }
  }

  public createSliceEffect(target: Target): void {
    // 为目标物创建碎片效果
    this.createFragments(target);
    // 创建粒子效果
    this.createParticles(target);
  }

  private createFragments(target: Target): void {
    // 创建两个碎片（上半部分和下半部分）
    const fragment1: Fragment = {
      image: target.image,
      x: target.x,
      y: target.y,
      vx: (Math.random() - 0.5) * 200,
      vy: -Math.random() * 150,
      rotation: 0,
      angularVelocity: (Math.random() - 0.5) * 10,
      alpha: 1,
      gravity: 800
    };

    const fragment2: Fragment = {
      image: target.image,
      x: target.x,
      y: target.y,
      vx: (Math.random() - 0.5) * 200,
      vy: -Math.random() * 150,
      rotation: 0,
      angularVelocity: (Math.random() - 0.5) * 10,
      alpha: 1,
      gravity: 800
    };

    this.fragments.push(fragment1, fragment2);
  }

  private createParticles(target: Target): void {
    const particleCount = 15;
    const color = target.isBonus ? '#4CAF50' : '#FF4444';

    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        x: target.x + (Math.random() - 0.5) * 80,
        y: target.y + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 300,
        vy: -Math.random() * 200 - 100,
        size: 2 + Math.random() * 4,
        color: color,
        alpha: 1,
        life: 0.5 + Math.random() * 0.5
      };
      this.particles.push(particle);
    }
  }

  public getFragments(): Fragment[] {
    return this.fragments;
  }

  public getParticles(): Particle[] {
    return this.particles;
  }

  public clear(): void {
    this.fragments = [];
    this.particles = [];
  }
}