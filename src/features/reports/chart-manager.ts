import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);
export class ChartManager {
  private chart: any = null;
  private chartType: 'bar' | 'line' = 'bar';
  private container: HTMLCanvasElement;

  constructor(container: HTMLCanvasElement) {
    this.container = container;
  }

  public updateChart(data: any[], metrics: string[]): void {
    // Ensure previous chart is destroyed
    this.destroy();
    
    // Create new canvas element to prevent reuse issues
    const oldCanvas = this.container;
    const newCanvas = document.createElement('canvas');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    newCanvas.id = 'chart-container';
    oldCanvas.parentNode?.replaceChild(newCanvas, oldCanvas);
    this.container = newCanvas;

    const ctx = this.container.getContext('2d');
    if (!ctx) return;

    const months = data.map(item => item.month);
    const datasets = metrics.map((metric, index) => ({
      label: metric,
      data: data.map(item => item[metric]),
      backgroundColor: `hsla(${index * 45}, 70%, 50%, 0.5)`,
      borderColor: `hsl(${index * 45}, 70%, 50%)`,
      borderWidth: 1
    }));

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: months,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Metrics Visualization'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  public setChartType(type: 'bar' | 'line'): void {
    this.chartType = type;
  }

  public destroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}