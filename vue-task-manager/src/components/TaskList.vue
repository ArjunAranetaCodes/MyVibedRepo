<template>
  <div class="task-list">
    <h3>Tasks</h3>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <div>
          <button @click="editTask(task.id)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' }
])

function deleteTask(id: number) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

function addTask(title: string) {
  const newId = tasks.value.length > 0 ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1
  tasks.value.push({ id: newId, title })
}

function editTask(id: number) {
  const task = tasks.value.find(t => t.id === id)
  if (!task) return
  const newTitle = window.prompt('Edit task title:', task.title)
  if (newTitle && newTitle !== task.title) {
    task.title = newTitle
  }
}

// Expose the addTask function to the parent component
defineExpose({ addTask })
</script>

<style scoped>
.task-list {
  margin: 20px 0;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
div {
  display: flex;
  gap: 8px;
}
button {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #d32f2f;
}
button:first-child {
  background-color: #2196F3;
}
button:first-child:hover {
  background-color: #1976D2;
}
</style> 