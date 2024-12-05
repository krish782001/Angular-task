// src/app/task-form/task-form.component.ts

import { Component } from '@angular/core';
import { TaskService } from '../task.service';  // Import TaskService

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskName: string = '';  // Model for task input

  constructor(private taskService: TaskService) {}

  // onSubmit method to handle task creation
  onSubmit() {
    if (this.taskName.trim()) {
      // Add the task using the TaskService
      this.taskService.addTask(this.taskName);
      // Clear the input field after submission
      this.taskName = '';
    }
  }
}
