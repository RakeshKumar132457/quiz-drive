import { Game, GameStateManager } from "../features/game";
import { Reports } from "../features/reports";
import { Router } from "../shared/router";
import "../features/quiz/styles.css";
import "../features/reports/styles.css";

export class App {
  private router: Router;
  // @ts-ignore
  private gameState: GameStateManager;

  constructor(container: HTMLElement) {
    this.gameState = new GameStateManager();
    this.router = new Router(container);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.addRoute('game', (container: HTMLElement) => {
      container.innerHTML = `
        <div class="game-container">
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
        </div>
      `;
      return new Game(container.querySelector(".game") as HTMLElement);
    });
    
    this.router.addRoute('reports', (container: HTMLElement) => {
      return new Reports(container);
    });
    
    this.router.initialize();
  }
}