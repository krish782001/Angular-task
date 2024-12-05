// src/app/app.component.ts

import { Component } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private taskService: TaskService) {}

  // Handle filter change from FilterComponent and update TaskListComponent
  filterTasks(status: string) {
    // Use the service to filter tasks based on status (all, completed, or pending)
    this.taskService.filterTasks(status);
  }
}
