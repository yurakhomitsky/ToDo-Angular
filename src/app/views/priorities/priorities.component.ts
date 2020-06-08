import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Priority } from '../../model/Priority';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

   defaultColor = '#fff';
  @ViewChild('displayTmpl', { static: true }) displayTmpl: TemplateRef<any>;
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  
  @Input()
  public priorities: Priority[]


  @Output()
  addPriority = new EventEmitter<Priority>();

  @Output()
  updatePriority = new EventEmitter<Priority>();

  @Output()
  deletePriority = new EventEmitter<Priority>();

  selected: Priority;

  isNewPriority: boolean = false;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  
  }
  onAddPriority() {
    this.selected = new Priority(null,'',this.defaultColor);
    this.isNewPriority = true;
  }
  savePriority() {
    
    if(this.isNewPriority) {
      this.addPriority.emit(this.selected);
    } else {
      this.updatePriority.emit(this.selected);
    }
   
    this.reset();
  }

  delete(priority: Priority) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить приоритет: "${priority.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.deletePriority.emit(priority)
      }
    });
  }

  reset() {
    this.selected = null;
    this.isNewPriority = false;
  }
  onEditPriority(priority: Priority) {
    this.selected = {...priority};

  }
  getTemplate(priority: Priority) {
    return this.selected && this.selected.id === priority.id ? this.editTmpl : this.displayTmpl;
  }
}
