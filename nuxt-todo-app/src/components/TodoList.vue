<template>
  <div class="todo-list">
    <h2>Todo List</h2>
    <div class="todos">
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-complete="$emit('toggle-complete', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
    <div v-if="todos.length === 0" class="empty-state">
      No todos yet. Add one above!
    </div>
  </div>
</template>

<script>
import Todo from './Todo.vue'

export default {
  name: 'TodoList',
  components: {
    Todo
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.todos {
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style> 