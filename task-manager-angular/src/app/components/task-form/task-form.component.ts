import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-form">
      <h3>Add New Task</h3>
      <form (ngSubmit)="onSubmit()" #taskForm="ngForm">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            [(ngModel)]="task.title"
            required
            #title="ngModel"
          />
          <div *ngIf="title.invalid && (title.dirty || title.touched)" class="error">
            Title is required
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            [(ngModel)]="task.description"
            required
            #description="ngModel"
          ></textarea>
          <div *ngIf="description.invalid && (description.dirty || description.touched)" class="error">
            Description is required
          </div>
        </div>

        <div class="form-group">
          <label for="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            [(ngModel)]="task.priority"
            required
            #priority="ngModel"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" [disabled]="taskForm.invalid">Add Task</button>
      </form>
    </div>
  `,
  styles: [`
    .task-form {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #333;
      font-weight: 500;
    }

    input, textarea, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1em;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    button {
      background: #2196f3;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      transition: background 0.3s;
    }

    button:hover {
      background: #1976d2;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .error {
      color: #f44336;
      font-size: 0.9em;
      margin-top: 5px;
    }
  `]
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Omit<Task, 'id' | 'createdAt'>>();

  task: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    completed: false,
    priority: 'medium'
  };

  onSubmit(): void {
    this.taskAdded.emit(this.task);
    this.resetForm();
  }

  private resetForm(): void {
    this.task = {
      title: '',
      description: '',
      completed: false,
      priority: 'medium'
    };
  }
} 