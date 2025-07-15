<template>
  <form class="todo-form" @submit.prevent="handleSubmit">
    <input
      type="text"
      v-model="newTodo"
      placeholder="What needs to be done?"
      class="todo-input"
      :class="{ error: showError }"
    />
    <button type="submit" class="add-btn">Add</button>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',
  data() {
    return {
      newTodo: '',
      showError: false
    }
  },
  methods: {
    handleSubmit() {
      if (!this.newTodo.trim()) {
        this.showError = true
        return
      }
      this.showError = false
      this.$emit('add-todo', this.newTodo.trim())
      this.newTodo = ''
    }
  }
}
</script>

<style scoped>
.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.todo-input.error {
  border-color: #ff4444;
}

.add-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #45a049;
}
</style> 