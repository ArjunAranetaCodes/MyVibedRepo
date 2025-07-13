<template>
  <div class="home">
    <div class="card">
      <div class="logo">
        <div class="logo-icon">🧠</div>
      </div>
      <h1>Quiz Master</h1>
      <p class="subtitle">Test your knowledge with our interactive quiz</p>
      
      <div class="stats" v-if="quizStore.totalQuizzesTaken > 0">
        <div class="stat">
          <span class="stat-number">{{ quizStore.totalQuizzesTaken }}</span>
          <span class="stat-label">Quizzes Taken</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ quizStore.averageScore }}</span>
          <span class="stat-label">Avg Score</span>
        </div>
      </div>
      
      <button class="start-btn" @click="startQuiz">
        <span>Start Quiz</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const quizStore = useQuizStore()

function startQuiz() {
  router.push('/quiz')
}
</script>

<style scoped>
.home {
  width: 100%;
  max-width: 480px;
  text-align: center;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
  margin-bottom: 1.5rem;
}

.logo-icon {
  font-size: 3rem;
  margin: 0 auto;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

.start-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.start-btn:active {
  transform: translateY(0);
}
</style> 