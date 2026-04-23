import { director } from 'cc';

export class SceneManager {
  public static loadScene(sceneName: string): void {
    director.loadScene(sceneName);
  }

  public static loadHome(): void {
    this.loadScene('Home');
  }

  public static loadGame(): void {
    this.loadScene('Game');
  }

  public static loadResult(): void {
    this.loadScene('Result');
  }
}
