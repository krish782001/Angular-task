

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
 
  filter: string = 'all';  
  @Output() filterChanged = new EventEmitter<string>();

  setFilter(status: string) {
    this.filterChanged.emit(status);  
  }
}
