// src/app/filter/filter.component.ts

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  // Define the filter property
  filter: string = 'all';  // Default filter to 'all'
  
  // Output event to emit the selected filter to the parent component (AppComponent)
  @Output() filterChanged = new EventEmitter<string>();

  // Method to handle filter change and emit it to parent
  setFilter(status: string) {
    this.filterChanged.emit(status);  // Emit the new filter value to parent
  }
}
