<template>
  <div class="home">
    <h2>Task List</h2>
    <TaskList ref="taskListRef" />
    <button @click="addTask">Add New Task</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskList from '../components/TaskList.vue'

const taskListRef = ref<InstanceType<typeof TaskList> | null>(null)

function addTask() {
  const title = window.prompt('Enter the task title:')
  if (title && taskListRef.value) {
    taskListRef.value.addTask(title)
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
.task-list {
  margin: 20px 0;
}
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style> 