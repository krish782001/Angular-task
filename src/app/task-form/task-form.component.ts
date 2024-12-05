

import { Component } from '@angular/core';
import { TaskService } from '../task.service';  

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskName: string = '';  

  constructor(private taskService: TaskService) {}

 
  onSubmit() {
    if (this.taskName.trim()) {
      this.taskService.addTask(this.taskName);
      this.taskName = '';
    }
  }
}
