import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];  // To hold filtered tasks
  filter: string = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.filterTasks(); // Apply the default filter
  }

  // Update filter and apply filter on tasks
  filterTasks() {
    if (this.filter === 'all') {
      this.filteredTasks = [...this.tasks];
    } else if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    }
  }

  // Handle filter change from FilterComponent
  onFilterChanged(filter: string) {
    this.filter = filter;
    this.filterTasks(); // Re-apply filter
  }

  toggleCompletion(task: Task) {
    const updatedCompletionStatus = !task.completed;
    this.taskService.updateTask(task.id, updatedCompletionStatus);
    task.completed = updatedCompletionStatus;
    this.filterTasks(); // Re-apply filter after completion toggle
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.filterTasks(); // Re-apply filter after task deletion
  }

  editTask(task: Task) {
    task.isEditing = true;
  }

  saveTask(task: Task) {
    if (task.name.trim()) {
      this.taskService.updateTask(task.id, task.completed);
      task.isEditing = false;
    } else {
      alert('Task name cannot be empty!');
    }
  }
}
