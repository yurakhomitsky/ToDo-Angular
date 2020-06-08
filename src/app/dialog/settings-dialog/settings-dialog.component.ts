import { Component, OnInit } from '@angular/core';
import { Priority } from '../../model/Priority';
import { DataHandlerService } from '../../service/data-handler.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  priorities: Priority[]

  constructor(private dataHandler: DataHandlerService, private dialgoref: MatDialogRef<SettingsDialogComponent>) { }

  ngOnInit() {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
  }
  onClose() {
    this.dialgoref.close(false);
  }
   onAddPriority(priority: Priority): void {
    this.dataHandler.addPriority(priority).subscribe();
  }

  // удалили приоритет
   onDeletePriority(priority: Priority): void {
    this.dataHandler.deletePriority(priority.id).subscribe();
  }

  // обновили приоритет
   onUpdatePriority(priority: Priority): void {
    this.dataHandler.updatePriority(priority).subscribe();
  }
}
