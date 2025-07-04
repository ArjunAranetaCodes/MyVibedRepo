import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.interface';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  template: `
    <div class="task-list-container">
      <h2>Task Manager</h2>
      
      <app-task-form (taskAdded)="onTaskAdded($event)"></app-task-form>

      <div class="tasks-container">
        <div *ngFor="let task of tasks" class="task-item" [class.completed]="task.completed">
          <div class="task-content">
            <input
              type="checkbox"
              [checked]="task.completed"
              (change)="toggleTaskComplete(task.id)"
            />
            <div class="task-details">
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
              <div class="task-meta">
                <span class="priority" [class]="task.priority">{{ task.priority }}</span>
                <span class="date">{{ task.createdAt | date:'short' }}</span>
              </div>
            </div>
          </div>
          <button class="delete-btn" (click)="deleteTask(task.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-list-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .tasks-container {
      margin-top: 20px;
    }

    .task-item {
      background: white;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .task-content {
      display: flex;
      gap: 15px;
      flex: 1;
    }

    .task-details {
      flex: 1;
    }

    .task-details h3 {
      margin: 0 0 5px 0;
      color: #333;
    }

    .task-details p {
      margin: 0;
      color: #666;
    }

    .task-meta {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      font-size: 0.9em;
    }

    .priority {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8em;
    }

    .priority.low {
      background: #e3f2fd;
      color: #1976d2;
    }

    .priority.medium {
      background: #fff3e0;
      color: #f57c00;
    }

    .priority.high {
      background: #ffebee;
      color: #d32f2f;
    }

    .completed {
      opacity: 0.7;
      .task-details h3 {
        text-decoration: line-through;
      }
    }

    .delete-btn {
      background: #ff5252;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .delete-btn:hover {
      background: #ff1744;
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onTaskAdded(task: Omit<Task, 'id' | 'createdAt'>): void {
    this.taskService.addTask(task);
  }

  toggleTaskComplete(id: number): void {
    this.taskService.toggleTaskComplete(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
} 