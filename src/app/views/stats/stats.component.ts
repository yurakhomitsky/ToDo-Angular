import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Input()
  totalTasksInCategory: number; 

  @Input()
  completeTasksInCategory: number; 
  
  @Input()
  uncompleteTasksInCategory: number; 


  constructor() {}

  ngOnInit() {}


}
