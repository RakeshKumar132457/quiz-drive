import { App } from "./app/app";
import './shared/styles/variables.css';
import './shared/styles/global.css';
import './features/game/styles.css';
import './features/quiz/styles.css';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app) {
    new App(app);
  }
});
