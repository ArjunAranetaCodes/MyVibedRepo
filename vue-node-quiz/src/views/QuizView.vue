<template>
  <div class="quiz-container">
    <header class="quiz-header">
      <div class="player-info">
        <div class="avatar-container">
          <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=David" alt="David's avatar" class="avatar" />
        </div>
        <div class="player-details">
          <span>David</span>
          <strong class="score">{{ displayScore }} <span v-if="showScoreGain" class="score-gain">+1</span></strong>
        </div>
      </div>
      <div class="timer">
        <span>14</span>
      </div>
      <div class="player-info">
        <div class="player-details timothy-details">
          <span>Timothy</span>
          <strong class="score">20</strong>
        </div>
        <div class="avatar-container">
          <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Timothy" alt="Timothy's avatar" class="avatar" />
        </div>
      </div>
    </header>

    <main class="quiz-content">
      <div v-if="!isQuizFinished" class="question-area">
        <h2 class="question-text">{{ currentQuestion.text }}</h2>
        <div class="options-container">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(index)"
            :class="getButtonClass(index)"
            :disabled="selectedIndex !== null"
          >
            {{ option }}
          </button>
        </div>
      </div>
      <div v-else class="quiz-finished">
        <h2>Quiz Finished!</h2>
        <p>Your score: {{ score }} / {{ quizStore.questions.length }}</p>
        <button @click="restartQuiz" class="restart-button">Restart Quiz</button>
      </div>
    </main>
    
    <div class="progress-bar-left"></div>
    <div class="progress-bar-right"></div>
    
    <footer class="quiz-footer">
      <div class="settings-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V15a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { storeToRefs } from 'pinia'

const quizStore = useQuizStore()
const { currentQuestion, isQuizFinished, score } = storeToRefs(quizStore)

const selectedIndex = ref<number | null>(null)
const showScoreGain = ref(false)
const tempScore = ref(0)

const displayScore = computed(() => {
  return score.value + tempScore.value
})

function selectAnswer(index: number) {
  if (selectedIndex.value !== null) return
  selectedIndex.value = index

  // Immediately update score if correct
  if (index === quizStore.currentQuestion.answer) {
    tempScore.value = 1
    showScoreGain.value = true
    
    // Hide score gain after 2 seconds
    setTimeout(() => {
      showScoreGain.value = false
    }, 2000)
  }

  setTimeout(() => {
    quizStore.answerQuestion(index)
    selectedIndex.value = null
    tempScore.value = 0
  }, 2000)
}

function getButtonClass(index: number): string[] {
  const classes = ['option-button']
  if (selectedIndex.value !== null) {
    const isCorrect = quizStore.currentQuestion.answer === index
    const isSelected = selectedIndex.value === index

    if (isCorrect) {
      classes.push('correct')
    } else if (isSelected && !isCorrect) {
      classes.push('incorrect')
    } else {
      classes.push('disabled')
    }
  }
  return classes
}

function restartQuiz() {
  quizStore.resetQuiz()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap');

.quiz-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 95vh;
  max-height: 900px;
  background-color: #1a0a3b;
  color: white;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  width: 100%;
  box-sizing: border-box;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4a148c;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
}

.avatar {
  width: 45px;
  height: 45px;
}

.player-details {
  display: flex;
  flex-direction: column;
}

.player-details.timothy-details {
    align-items: flex-end;
}

.score {
  font-weight: bold;
  font-size: 1.2rem;
}

.score-gain {
  color: #4caf50;
  font-size: 0.9rem;
  font-weight: bold;
}

.timer {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid #ffeb3b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.quiz-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
}

.question-area {
  width: 100%;
  max-width: 800px;
}

.question-text {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  margin-bottom: 3rem;
  line-height: 1.4;
}

.options-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.option-button {
  background-color: white;
  color: #1a0a3b;
  border: none;
  border-radius: 12px;
  padding: 1.5rem;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-bottom: 4px solid #b0b0b0;
  position: relative;
  width: 150px;
}

.option-button:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.option-button:disabled {
  cursor: not-allowed;
}

.option-button.correct {
  background-color: #4caf50;
  color: white;
  border-bottom-color: #388e3c;
}

.option-button.incorrect {
  background-color: #f44336;
  color: white;
  border-bottom-color: #d32f2f;
}

.option-button.disabled {
  opacity: 0.6;
  background-color: #e0e0e0;
  border-bottom-color: #9e9e9e;
  color: #616161;
}

.quiz-finished {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.restart-button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #ffeb3b;
  color: #1a0a3b;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.restart-button:hover {
    transform: scale(1.05);
}

.progress-bar-left, .progress-bar-right {
    position: absolute;
    top: 25%;
    width: 8px;
    height: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.progress-bar-left { left: 20px; }
.progress-bar-right { right: 20px; }

.progress-bar-left::after, .progress-bar-right::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 4px;
    animation: fill-bar 1s ease-out forwards;
}

.progress-bar-left::after { height: 60%; background-color: #03a9f4; }
.progress-bar-right::after { height: 40%; background-color: #ffc107; }

@keyframes fill-bar {
    from { height: 0; }
}

.quiz-footer {
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
}

.settings-icon {
  font-size: 1.5rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
}
.settings-icon:hover {
    color: white;
    transform: rotate(45deg);
}
</style> 