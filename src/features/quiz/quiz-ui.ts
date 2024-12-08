export class QuizUI {
  private questionElement: HTMLElement | null = null;
  private trueOption: HTMLElement | null = null;
  private falseOption: HTMLElement | null = null;
  private optionsSpeed: number = 3;
  private animationFrameId: number | null = null;

  constructor(private container: HTMLElement) {
    this.initialize();
  }

  private initialize(): void {
    this.createQuestionElement();
    this.createOptions();
    this.startAnimation();
  }

  private createQuestionElement(): void {
    const questionElement = document.createElement("div");
    questionElement.className = "quiz__question";
    this.container.appendChild(questionElement);
    this.questionElement = questionElement;
  }

  private createOptions(): void {
    const roadElement = this.container.querySelector(".game__road") as HTMLElement;

    this.trueOption = document.createElement("div");
    this.trueOption.className = "quiz__option quiz__option--true";
    this.trueOption.textContent = "TRUE";
    this.trueOption.style.top = "-100px";
    roadElement.appendChild(this.trueOption);

    this.falseOption = document.createElement("div");
    this.falseOption.className = "quiz__option quiz__option--false";
    this.falseOption.textContent = "FALSE";
    this.falseOption.style.top = "-100px";
    roadElement.appendChild(this.falseOption);
  }

  private startAnimation(): void {
    const animate = () => {
      if (this.trueOption && this.falseOption) {
        const trueTop = parseFloat(this.trueOption.style.top) || -100;
        const falseTop = parseFloat(this.falseOption.style.top) || -100;

        this.trueOption.style.top = `${trueTop + this.optionsSpeed}px`;
        this.falseOption.style.top = `${falseTop + this.optionsSpeed}px`;

        // Reset if both options are off screen
        if (trueTop > window.innerHeight && falseTop > window.innerHeight) {
          this.resetOptions();
          const event = new CustomEvent("optionsMissed");
          this.container.dispatchEvent(event);
        }
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  public setQuestion(text: string): void {
    if (this.questionElement) {
      this.questionElement.textContent = text;
    }
  }

  public resetOptions(): void {
    if (this.trueOption && this.falseOption) {
      this.trueOption.style.top = "-100px";
      this.falseOption.style.top = "-100px";
    }
  }

  public cleanup(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
