export class Router {
  private routes: Map<string, (container: HTMLElement) => any>;
  private container: HTMLElement;
  private currentComponent: any = null;

  constructor(container: HTMLElement) {
    this.routes = new Map();
    this.container = container;
    this.handleRoute = this.handleRoute.bind(this);
    window.addEventListener("hashchange", this.handleRoute);
    this.setupNavigation();
  }

  private setupNavigation(): void {
    const nav = document.createElement("nav");
    nav.className = "app-navigation";
    nav.innerHTML = `
      <a href="#game" class="nav-link">Car Game</a>
      <a href="#reports" class="nav-link">Reports</a>
    `;
    this.container.parentElement?.insertBefore(nav, this.container);
  }

  addRoute(path: string, componentFn: (container: HTMLElement) => any): void {
    this.routes.set(path, componentFn);
  }

  handleRoute(): void {
    const hash = window.location.hash || "#game";
    const path = hash.slice(1);
    const componentFn = this.routes.get(path);

    if (componentFn) {
      if (this.currentComponent?.cleanup) {
        this.currentComponent.cleanup();
      }
      this.container.innerHTML = "";
      this.currentComponent = componentFn(this.container);
    }
  }

  initialize(): void {
    this.handleRoute();
  }
}
