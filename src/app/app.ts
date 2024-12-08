import { Game, GameStateManager } from "../features/game";
import "../features/quiz/styles.css";

export class CarGame {
  private game: Game | null = null;
  private gameState: GameStateManager;

  constructor(container: HTMLElement) {
    this.gameState = new GameStateManager();
    this.initialize(container);
  }

  private initialize(container: HTMLElement): void {
    container.innerHTML = `
      <div class="game">
        <div class="game__road">
          <img src="/assets/images/car.svg" class="game__car" alt="Car for the game" />
        </div>
        <div class="game__controls">
          <div class="game__controls-container">
            <button class="game__button game__button--left" aria-label="Move Left">←</button>
            <button class="game__button game__button--right" aria-label="Move Right">→</button>
          </div>
        </div>
      </div>
    `;

    this.game = new Game(container.querySelector(".game") as HTMLElement);
  }
}
