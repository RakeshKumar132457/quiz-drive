export class Car {
  private element: HTMLElement;
  private position: number = 0;
  private readonly MOVE_STEP = 50;
  private readonly ROAD_BOUNDS = {
    MIN: -200,
    MAX: 200,
  };

  constructor(carElement: HTMLElement) {
    this.element = carElement;
    this.updatePosition();
  }

  public moveLeft(): void {
    if (this.position > this.ROAD_BOUNDS.MIN) {
      this.position -= this.MOVE_STEP;
      this.updatePosition();
    }
  }

  public moveRight(): void {
    if (this.position < this.ROAD_BOUNDS.MAX) {
      this.position += this.MOVE_STEP;
      this.updatePosition();
    }
  }

  private updatePosition(): void {
    this.element.style.transform = `translateX(calc(-50% + ${this.position}px))`;
  }
}
