import { Metric } from './metrics.ts';

export class ReportsUI {
  private selectedMetrics: Set<string> = new Set();

  constructor(private container: HTMLElement, private metrics: Metric[]) {
    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="reports">
        <h1>Custom Reports</h1>
        <div class="metrics-selection">
          <h2>Select Metrics</h2>
          <div class="metrics-list">
            ${this.metrics.map(metric => `
              <div class="metric-item">
                <label>
                  <input type="checkbox" value="${metric.name}" />
                  ${metric.name}
                </label>
                <select class="metric-filter" disabled>
                  ${metric.filters.map(filter => `
                    <option value="${filter}">${filter}</option>
                  `).join('')}
                </select>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="report-actions">
          <button class="generate-report">Generate Report</button>
          <button class="export-csv">Export CSV</button>
          <button class="email-report">Email Report</button>
        </div>
        <div class="report-preview"></div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    const checkboxes = this.container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const filterSelect = target.closest('.metric-item')?.querySelector('select');
        if (filterSelect) {
          filterSelect.disabled = !target.checked;
        }
        
        if (target.checked) {
          this.selectedMetrics.add(target.value);
        } else {
          this.selectedMetrics.delete(target.value);
        }
      });
    });

    const generateBtn = this.container.querySelector('.generate-report');
    generateBtn?.addEventListener('click', () => this.generateReport());

    const exportBtn = this.container.querySelector('.export-csv');
    exportBtn?.addEventListener('click', () => this.exportCSV());

    const emailBtn = this.container.querySelector('.email-report');
    emailBtn?.addEventListener('click', () => this.emailReport());
  }

  private generateReport(): void {
    console.log('Generating report with metrics:', Array.from(this.selectedMetrics));
  }

  private exportCSV(): void {
    console.log('Exporting CSV with metrics:', Array.from(this.selectedMetrics));
  }

  private emailReport(): void {
    console.log('Emailing report with metrics:', Array.from(this.selectedMetrics));
  }
}