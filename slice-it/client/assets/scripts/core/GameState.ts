import { GameConfig } from './GameConfig';

export enum GameStatus {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'gameOver',
  FRENZY_FINISH = 'frenzyFinish'
}

export interface Target {
  id: string;
  term: string;
  isBonus: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  image: any; // Cocos Creator SpriteFrame
  bounds: { x: number; y: number; w: number; h: number };
  alive: boolean;
}

export interface GameState {
  status: GameStatus;
  score: number;
  combo: number;
  timeLeft: number;
  targets: Target[];
  config: GameConfig;
  lastSliceTime: number;
  frenzyTime: number;
  highestScore: number;
}

export class GameStateManager {
  private static instance: GameStateManager;
  private state: GameState;

  private constructor() {
    this.resetState();
  }

  public static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  public resetState(): void {
    this.state = {
      status: GameStatus.IDLE,
      score: 0,
      combo: 0,
      timeLeft: 0,
      targets: [],
      config: JSON.parse(JSON.stringify(require('./GameConfig').DEFAULT_GAME_CONFIG)),
      lastSliceTime: 0,
      frenzyTime: 5,
      highestScore: this.getHighestScore()
    };
  }

  public getState(): GameState {
    return this.state;
  }

  public setState(newState: Partial<GameState>): void {
    this.state = { ...this.state, ...newState };
  }

  public addTarget(target: Target): void {
    this.state.targets.push(target);
  }

  public removeTarget(targetId: string): void {
    this.state.targets = this.state.targets.filter(target => target.id !== targetId);
  }

  public updateTarget(targetId: string, updates: Partial<Target>): void {
    const targetIndex = this.state.targets.findIndex(target => target.id === targetId);
    if (targetIndex !== -1) {
      this.state.targets[targetIndex] = { ...this.state.targets[targetIndex], ...updates };
    }
  }

  public addScore(score: number): void {
    this.state.score += score;
    if (this.state.score > this.state.highestScore) {
      this.state.highestScore = this.state.score;
      this.saveHighestScore();
    }
  }

  public setCombo(combo: number): void {
    this.state.combo = combo;
  }

  public setTimeLeft(time: number): void {
    this.state.timeLeft = time;
  }

  public setStatus(status: GameStatus): void {
    this.state.status = status;
  }

  private getHighestScore(): number {
    try {
      const score = wx.getStorageSync('highestScore');
      return score || 0;
    } catch (e) {
      return 0;
    }
  }

  private saveHighestScore(): void {
    try {
      wx.setStorageSync('highestScore', this.state.highestScore);
    } catch (e) {
      console.error('Failed to save highest score:', e);
    }
  }
}