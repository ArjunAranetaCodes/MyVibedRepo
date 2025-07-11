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