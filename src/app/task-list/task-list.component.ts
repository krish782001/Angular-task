import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];  
  filter: string = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.filterTasks(); 
  }

  filterTasks() {
    if (this.filter === 'all') {
      this.filteredTasks = [...this.tasks];
    } else if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    }
  }

  onFilterChanged(filter: string) {
    this.filter = filter;
    this.filterTasks(); 
  }

  toggleCompletion(task: Task) {
    const updatedCompletionStatus = !task.completed;
    this.taskService.updateTask(task.id, updatedCompletionStatus);
    task.completed = updatedCompletionStatus;
    this.filterTasks(); 
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.filterTasks(); 
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
