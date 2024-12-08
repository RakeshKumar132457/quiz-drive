import { Car } from './car';
import { QuizUI, questions } from '../quiz';

export class Game {
  private car: Car;
  private quizUI: QuizUI;
  private currentQuestionIndex: number = 0;
  private score: number = 0;

  constructor(private container: HTMLElement) {
    const carElement = container.querySelector('.game__car') as HTMLElement;
    this.car = new Car(carElement);
    this.quizUI = new QuizUI(container);
    
    this.setupControls();
    this.setupCollisionDetection();
    this.startQuiz();
  }

  private setupControls(): void {
    const leftButton = this.container.querySelector('.game__button--left');
    const rightButton = this.container.querySelector('.game__button--right');

    leftButton?.addEventListener('click', () => this.car.moveLeft());
    rightButton?.addEventListener('click', () => this.car.moveRight());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.car.moveLeft();
      if (e.key === 'ArrowRight') this.car.moveRight();
    });
  }

  private setupCollisionDetection(): void {
    const detectCollision = () => {
      const carElement = this.container.querySelector('.game__car') as HTMLElement;
      const trueOption = this.container.querySelector('.quiz__option--true');
      const falseOption = this.container.querySelector('.quiz__option--false');

      if (!carElement || !trueOption || !falseOption) return;

      const carRect = carElement.getBoundingClientRect();
      const trueRect = trueOption.getBoundingClientRect();
      const falseRect = falseOption.getBoundingClientRect();

      if (this.isColliding(carRect, trueRect)) {
        this.handleAnswer(true);
      } else if (this.isColliding(carRect, falseRect)) {
        this.handleAnswer(false);
      }
    };

    setInterval(detectCollision, 100);
    
    this.container.addEventListener('optionsMissed', () => {
      this.nextQuestion();
    });
  }

  private isColliding(rect1: DOMRect, rect2: DOMRect): boolean {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  private handleAnswer(answer: boolean): void {
    const currentQuestion = questions[this.currentQuestionIndex];
    if (currentQuestion.correctAnswer === answer) {
      this.score++;
    }
    this.nextQuestion();
  }

  private nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= questions.length) {
      this.endGame();
    } else {
      this.startQuiz();
    }
  }

  private startQuiz(): void {
    const currentQuestion = questions[this.currentQuestionIndex];
    this.quizUI.setQuestion(currentQuestion.text);
    this.quizUI.resetOptions();
  }

  private endGame(): void {
    alert(`Game Over! Your score: ${this.score}/${questions.length}`);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.startQuiz();
  }
}