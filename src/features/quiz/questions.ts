export interface Question {
  text: string;
  correctAnswer: boolean;
}

export const questions: Question[] = [
  {
    text: "How do you ensure that your client completely understands the value of your product in your proposition?",
    correctAnswer: true,
  },
  {
    text: "Is it important to focus only on features when presenting your product?",
    correctAnswer: false,
  },
  {
    text: "Should you always demonstrate the practical benefits of your product?",
    correctAnswer: true,
  },
];
