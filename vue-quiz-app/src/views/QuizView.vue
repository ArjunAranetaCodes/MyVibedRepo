<template>
  <div class="quiz-container">
    <div class="quiz-card">
      <!-- Progress Bar -->
      <div class="progress-section">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${(currentQuestionIndex / quizStore.questions.length) * 100}%` }"
          ></div>
        </div>
        <div class="progress-text">
          Question {{ currentQuestionIndex + 1 }} of {{ quizStore.questions.length }}
        </div>
      </div>

      <!-- Quiz Content -->
      <div v-if="!isQuizFinished" class="quiz-content">
        <h2 class="question">{{ currentQuestion.text }}</h2>
        <div class="options">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(index)"
            class="option-btn"
            :class="{ 'selected': selectedAnswer === index }"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
            <span class="option-text">{{ option }}</span>
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-else class="results">
        <div class="result-header">
          <div class="result-icon">🎉</div>
          <h2>Quiz Complete!</h2>
        </div>
        
        <div class="score-section">
          <div class="current-score">
            <span class="score-number">{{ score }}</span>
            <span class="score-label">out of {{ quizStore.questions.length }}</span>
          </div>
          <div class="score-percentage">
            {{ Math.round((score / quizStore.questions.length) * 100) }}%
          </div>
        </div>

        <div class="session-stats">
          <div class="stat-item">
            <span class="stat-label">Total Quizzes</span>
            <span class="stat-value">{{ quizStore.totalQuizzesTaken + 1 }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Average Score</span>
            <span class="stat-value">{{ quizStore.averageScore }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="restartQuiz" class="restart-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Try Again
          </button>
          <button @click="goHome" class="home-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { storeToRefs } from 'pinia'

const router = useRouter()
const quizStore = useQuizStore()
const { currentQuestion, isQuizFinished, score } = storeToRefs(quizStore)
const selectedAnswer = ref<number | null>(null)

const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex)

function selectAnswer(index: number) {
  selectedAnswer.value = index
  setTimeout(() => {
    quizStore.answerQuestion(index)
    selectedAnswer.value = null
  }, 300)
}

function restartQuiz() {
  quizStore.resetQuiz()
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.quiz-container {
  width: 100%;
  max-width: 600px;
}

.quiz-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
}

.quiz-content {
  text-align: center;
}

.question {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  color: #333;
  line-height: 1.4;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 1rem;
}

.option-btn:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
}

.option-btn.selected {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.option-letter {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.option-btn.selected .option-letter {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.option-text {
  flex: 1;
}

.results {
  text-align: center;
}

.result-header {
  margin-bottom: 2rem;
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.result-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.score-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
}

.current-score {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.score-number {
  font-size: 3rem;
  font-weight: 700;
}

.score-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

.score-percentage {
  font-size: 1.5rem;
  font-weight: 600;
  opacity: 0.9;
}

.session-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.restart-btn, .home-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.restart-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.home-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.restart-btn:hover, .home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
}

.restart-btn:active, .home-btn:active {
  transform: translateY(0);
}
</style> 