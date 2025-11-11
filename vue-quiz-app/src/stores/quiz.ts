import { defineStore } from 'pinia'

export interface Question {
  text: string
  options: string[]
  answer: number // index of the correct option
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [
      {
        text: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Madrid'],
        answer: 1
      },
      {
        text: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        answer: 1
      },
      {
        text: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        answer: 3
      },
      {
        text: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen'],
        answer: 0
      },
      {
        text: 'What is the chemical symbol for Gold?',
        options: ['Ag', 'Au', 'Gd', 'Go'],
        answer: 1
      },
      {
        text: 'Which language is primarily spoken in Brazil?',
        options: ['Spanish', 'Portuguese', 'French', 'English'],
        answer: 1
      },
      {
        text: 'How many continents are there on Earth?',
        options: ['5', '6', '7', '8'],
        answer: 2
      },
      {
        text: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'],
        answer: 2
      },
      {
        text: 'What is the square root of 81?',
        options: ['7', '8', '9', '10'],
        answer: 2
      },
      {
        text: 'Which country hosted the 2020 Summer Olympics (held in 2021)?',
        options: ['China', 'Japan', 'Brazil', 'United Kingdom'],
        answer: 1
      }
    ] as Question[],
    currentQuestionIndex: 0,
    score: 0,
    totalScore: 0,
    totalQuizzesTaken: 0
  }),
  getters: {
    currentQuestion(state): Question {
      return state.questions[state.currentQuestionIndex]
    },
    isQuizFinished(state): boolean {
      return state.currentQuestionIndex >= state.questions.length
    },
    averageScore(state): number {
      return state.totalQuizzesTaken > 0 ? Math.round((state.totalScore / state.totalQuizzesTaken) * 10) / 10 : 0
    }
  },
  actions: {
    answerQuestion(selectedIndex: number) {
      if (selectedIndex === this.currentQuestion.answer) {
        this.score++
      }
      this.currentQuestionIndex++
    },
    resetQuiz() {
      this.totalScore += this.score
      this.totalQuizzesTaken++
      
      this.currentQuestionIndex = 0
      this.score = 0
    }
  }
}) 