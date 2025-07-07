import { defineStore } from 'pinia'

export interface Question {
  text: string
  options: string[]
  answer: number // index of the correct option
}

export const useQuizStore = defineStore('quiz', {
  state: () => {
    const allQuestions = [
      {
        text: 'Express',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'WebStreamify',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'Moment.js',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'Reactify',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'Axios',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'Lodash',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'NodeStreamer',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'Jest',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'WebPackify',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'TypeScript',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'VueMaster',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'Chalk',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'Socket.IOU',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'React',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'NodePackager',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'Vue.js',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'Expressify',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'Webpack',
        options: ['Real', 'No'],
        answer: 0
      },
      {
        text: 'AngularMaster',
        options: ['Real', 'No'],
        answer: 1
      },
      {
        text: 'Redux',
        options: ['Real', 'No'],
        answer: 0
      }
    ] as Question[]

    // Initialize with first 5 questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    const initialQuestions = shuffled.slice(0, 5)

    return {
      allQuestions,
      questions: initialQuestions,
      currentQuestionIndex: 0,
      score: 0,
      questionsPerRound: 5
    }
  },
  getters: {
    currentQuestion(state): Question {
      return state.questions[state.currentQuestionIndex]
    },
    isQuizFinished(state): boolean {
      return state.currentQuestionIndex >= state.questionsPerRound
    }
  },
  actions: {
    shuffleQuestions() {
      const shuffled = [...this.allQuestions].sort(() => Math.random() - 0.5)
      this.questions = shuffled.slice(0, this.questionsPerRound)
    },
    answerQuestion(selectedIndex: number) {
      if (selectedIndex === this.currentQuestion.answer) {
        this.score++
      }
      this.currentQuestionIndex++
    },
    resetQuiz() {
      this.currentQuestionIndex = 0
      this.score = 0
      this.shuffleQuestions()
    }
  }
}) 