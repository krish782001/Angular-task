import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  isEditing?: boolean;  // Add this line
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(name: string): void {
    const newTask: Task = { id: Date.now(), name, completed: false };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  updateTask(id: number, completed: boolean): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = completed;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  filterTasks(status: string): Task[] {
    switch (status) {
      case 'completed':
        return this.tasks.filter((task) => task.completed);
      case 'pending':
        return this.tasks.filter((task) => !task.completed);
      default:
        return this.tasks;
    }
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
