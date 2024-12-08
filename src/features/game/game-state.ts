export enum GameState {
  PLAYING,
  PAUSED,
  GAME_OVER,
}

export class GameStateManager {
  private state: GameState = GameState.PLAYING;

  public getState(): GameState {
    return this.state;
  }

  public setState(newState: GameState): void {
    this.state = newState;
  }
}
