import { Metric } from './metrics';
import { generateDummyData } from './dummy-data';
import { ChartManager } from './chart-manager';

export class ReportsUI {
  private selectedMetrics: Set<string> = new Set();
  private chartManager: ChartManager | null = null;
  private reportData: any[] = [];

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
          <select class="chart-type">
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
        <div class="report-preview">
          <canvas id="chart-container" style="width: 100%; height: 400px;"></canvas>
        </div>
      </div>
    `;

    const canvas = this.container.querySelector('#chart-container') as HTMLCanvasElement;
    if (canvas) {
      this.chartManager = new ChartManager(canvas);
    }
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

    const chartTypeSelect = this.container.querySelector('.chart-type') as HTMLSelectElement;
    chartTypeSelect?.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.chartManager?.setChartType(target.value as 'bar' | 'line');
      if (this.reportData.length > 0) {
        this.generateReport();
      }
    });

    const generateBtn = this.container.querySelector('.generate-report');
    generateBtn?.addEventListener('click', () => this.generateReport());

    const exportBtn = this.container.querySelector('.export-csv');
    exportBtn?.addEventListener('click', () => this.exportCSV());

    const emailBtn = this.container.querySelector('.email-report');
    emailBtn?.addEventListener('click', () => this.emailReport());
  }

  private generateReport(): void {
    const selectedMetricsArray = Array.from(this.selectedMetrics);
    if (selectedMetricsArray.length === 0) {
      alert('Please select at least one metric');
      return;
    }

    this.reportData = generateDummyData(selectedMetricsArray);
    this.chartManager?.updateChart(this.reportData, selectedMetricsArray);
  }

  private exportCSV(): void {
    if (this.reportData.length === 0) {
      alert('Please generate a report first');
      return;
    }

    const headers = ['month', ...Array.from(this.selectedMetrics)];
    const csvContent = [
      headers.join(','),
      ...this.reportData.map(row => 
        headers.map(header => row[header]).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private emailReport(): void {
    if (this.reportData.length === 0) {
      alert('Please generate a report first');
      return;
    }

    // Implement email functionality
    console.log('Emailing report with metrics:', Array.from(this.selectedMetrics));
  }
}