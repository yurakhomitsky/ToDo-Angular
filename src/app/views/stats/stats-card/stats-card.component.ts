import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent implements OnInit {

  @Input()
  completed = false;
  
  @Input()
  iconName: string;
  
  @Input()
  count1: any;

  @Input()
  countTotal: any;

  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
  }

}
