import { ReportsUI } from './reports-ui.ts';
import { metrics } from './metrics.ts';
import './styles.css';

export class Reports {
  private ui: ReportsUI;

  constructor(container: HTMLElement) {
    this.ui = new ReportsUI(container, metrics);
  }
}