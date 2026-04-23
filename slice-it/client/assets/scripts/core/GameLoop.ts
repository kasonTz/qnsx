import { GameStateManager, GameStatus, Target } from './GameState';
import { TargetSpawner } from '../game/TargetSpawner';
import { FragmentManager } from '../render/FragmentManager';
import { TouchSliceInput } from '../input/TouchSliceInput';
import { GestureRecognizer } from '../input/GestureRecognizer';
import { ScoreManager } from '../game/ScoreManager';

export class GameLoop {
  private lastTime: number = 0;
  private elapsedTime: number = 0;
  private spawnTimer: number = 0;
  private currentSpawnInterval: number = 0;
  private currentPenaltyRatio: number = 0;
  private stateManager: GameStateManager;
  private targetSpawner: TargetSpawner;
  private fragmentManager: FragmentManager;
  private touchInput: TouchSliceInput;
  private gestureRecognizer: GestureRecognizer;
  private scoreManager: ScoreManager;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.stateManager = GameStateManager.getInstance();
    this.targetSpawner = new TargetSpawner();
    this.fragmentManager = new FragmentManager();
    this.touchInput = new TouchSliceInput();
    this.gestureRecognizer = new GestureRecognizer();
    this.scoreManager = new ScoreManager();
  }

  public start(): void {
    const state = this.stateManager.getState();
    state.status = GameStatus.PLAYING;
    state.timeLeft = state.config.duration;
    this.currentSpawnInterval = state.config.difficultyParams.startSpawnInterval;
    this.currentPenaltyRatio = state.config.difficultyParams.penaltyRatio;

    // 初始化输入处理
    this.touchInput.init(this.onSlice.bind(this));
    this.gestureRecognizer.init(this.onSlice.bind(this));

    // 开始游戏循环
    const perf = wx.getPerformance();
    this.lastTime = perf.now() / 1000; // 转换为秒
    this.gameLoop(this.lastTime);
  }

  private gameLoop(timestamp: number): void {
    const dt = timestamp - this.lastTime; // 秒
    this.lastTime = timestamp;
    this.elapsedTime += dt;

    // 更新游戏状态
    this.update(dt);

    // 渲染
    this.render();

    // 检查游戏结束条件
    this.checkGameEnd();

    // 继续下一帧
    if (this.stateManager.getState().status === GameStatus.PLAYING) {
      requestAnimationFrame((t) => this.gameLoop(t));
    }
  }

  private update(dt: number): void {
    const state = this.stateManager.getState();

    // 1. 更新计时器
    state.timeLeft -= dt;
    if (state.timeLeft < 0) state.timeLeft = 0;

    // 2. 生成目标物
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.currentSpawnInterval && state.targets.length < state.config.target.maxTargets) {
      const target = this.targetSpawner.spawn(state.config, this.canvasWidth, this.canvasHeight);
      this.stateManager.addTarget(target);
      this.spawnTimer = 0;
    }

    // 3. 更新目标物
    state.targets.forEach((target) => {
      if (!target.alive) return;

      // 更新位置
      target.x += target.vx * dt;
      target.y += target.vy * dt;
      target.vy += state.config.target.gravity * dt;

      // 更新旋转
      target.rotation += target.rotationSpeed * dt;

      // 更新碰撞边界
      target.bounds.x = target.x - target.bounds.w / 2;
      target.bounds.y = target.y - target.bounds.h / 2;

      // 检查是否超出屏幕
      if (target.y > this.canvasHeight + 100) {
        target.alive = false;
      }
    });

    // 4. 清理死亡目标物
    state.targets = state.targets.filter(target => target.alive);

    // 5. 更新碎片和粒子
    this.fragmentManager.update(dt);

    // 6. 更新难度
    this.updateDifficulty();

    // 7. 更新Combo
    this.scoreManager.updateCombo(dt);
  }

  private render(): void {
    // 在Cocos Creator中，渲染会由引擎自动处理
    // 这里只需要更新游戏对象的状态
  }

  private checkGameEnd(): void {
    const state = this.stateManager.getState();

    if (state.timeLeft <= 0) {
      // 进入终极一击模式
      state.status = GameStatus.FRENZY_FINISH;
      // 实现终极一击逻辑
      this.startFrenzyFinish();
    } else if (state.score < 0) {
      // 分数为负，游戏结束
      state.status = GameStatus.GAME_OVER;
    }
  }

  private startFrenzyFinish(): void {
    // 终极一击逻辑
    console.log('Frenzy finish started!');
    // 5秒后结束游戏
    setTimeout(() => {
      this.stateManager.getState().status = GameStatus.GAME_OVER;
    }, 5000);
  }

  private updateDifficulty(): void {
    const state = this.stateManager.getState();
    const difficulty = state.config.difficultyParams;

    // 根据游戏时间增加难度
    const gameTime = state.config.duration - state.timeLeft;
    const difficultyLevel = Math.floor(gameTime / 15); // 每15秒增加一个难度等级

    // 更新生成间隔
    this.currentSpawnInterval = Math.max(
      difficulty.minSpawnInterval,
      difficulty.startSpawnInterval - difficulty.spawnIntervalDecrease * difficultyLevel
    );

    // 更新扣分物比例
    this.currentPenaltyRatio = Math.min(
      0.5, // 最大50%
      difficulty.penaltyRatio + difficulty.penaltyRatioIncrease * difficultyLevel
    );
  }

  private onSlice(startPoint: { x: number; y: number }, endPoint: { x: number; y: number }): void {
    const state = this.stateManager.getState();
    if (state.status !== GameStatus.PLAYING && state.status !== GameStatus.FRENZY_FINISH) return;

    // 检查是否切中目标物
    state.targets.forEach((target) => {
      if (!target.alive) return;

      if (this.lineIntersectsRect(startPoint, endPoint, target.bounds)) {
        // 切中目标物
        this.handleTargetSlice(target);
      }
    });
  }

  private handleTargetSlice(target: Target): void {
    // 标记目标物为死亡
    target.alive = false;

    // 计算得分
    const state = this.stateManager.getState();
    if (target.isBonus) {
      // 切中加分物
      const combo = this.scoreManager.onSliceHit();
      const bonus = state.config.scoring.bonusScore + (state.config.scoring.comboBonus[combo] || 0);
      this.stateManager.addScore(bonus);
    } else {
      // 切中扣分物
      this.scoreManager.onSlicePenalty();
      this.stateManager.addScore(-state.config.scoring.penaltyScore);
    }

    // 生成碎片特效
    this.fragmentManager.createSliceEffect(target);
  }

  private lineIntersectsRect(p1: { x: number; y: number }, p2: { x: number; y: number }, rect: { x: number; y: number; w: number; h: number }): boolean {
    // 线段与矩形相交检测
    const left = rect.x;
    const right = rect.x + rect.w;
    const top = rect.y;
    const bottom = rect.y + rect.h;

    // 检查线段是否与矩形的四条边相交
    return this.lineIntersectsLine(p1, p2, { x: left, y: top }, { x: right, y: top })
        || this.lineIntersectsLine(p1, p2, { x: right, y: top }, { x: right, y: bottom })
        || this.lineIntersectsLine(p1, p2, { x: right, y: bottom }, { x: left, y: bottom })
        || this.lineIntersectsLine(p1, p2, { x: left, y: bottom }, { x: left, y: top });
  }

  private lineIntersectsLine(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }, p4: { x: number; y: number }): boolean {
    const d1 = this.direction(p3, p4, p1);
    const d2 = this.direction(p3, p4, p2);
    const d3 = this.direction(p1, p2, p3);
    const d4 = this.direction(p1, p2, p4);

    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
      return true;
    }

    if (d1 === 0 && this.onSegment(p3, p4, p1)) return true;
    if (d2 === 0 && this.onSegment(p3, p4, p2)) return true;
    if (d3 === 0 && this.onSegment(p1, p2, p3)) return true;
    if (d4 === 0 && this.onSegment(p1, p2, p4)) return true;

    return false;
  }

  private direction(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): number {
    return (p3.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p3.y - p1.y);
  }

  private onSegment(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): boolean {
    return Math.min(p1.x, p2.x) <= p3.x && p3.x <= Math.max(p1.x, p2.x) &&
           Math.min(p1.y, p2.y) <= p3.y && p3.y <= Math.max(p1.y, p2.y);
  }
}