import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Task } from '../../model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { Category } from '../../model/Category';
import { Priority } from 'src/app/model/Priority';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  
  public dialogTitle: string // заголовок вікна
  public task: Task; // задача
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  public tmpTaskTitle: string;

  public categories: Category[];
  public priorities: Priority[];
  public tmpCategory: Category;
  public tmpPriority: Priority;
  public tmpDate: Date;

  public operationType: any;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для можливості роботи з поточним діалоговим вікном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, any],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    const [task, title, operType] = this.data;
    this.task = task;
    this.dialogTitle = title;
    this.operationType = operType;

    this.tmpTaskTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;


    this.dataHandler.getAllCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
    this.dataHandler.getAllPriorities()
      .subscribe((priorities) => {
        this.priorities = priorities;
      })

  }
  onConfirm(): void {
    this.dialogRef.close({
      ...this.task,
      title: this.tmpTaskTitle,
      category: this.tmpCategory,
      priority: this.tmpPriority,
      date: this.tmpDate
    });

  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data : {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    })
    
    dialogRef.afterClosed()
      .subscribe((result) => {
        if(result) {
          this.dialogRef.close('delete');
        }
      })
  }

  changeStateTask() {
    // this.task.completed = !this.task.completed;
    this.dialogRef.close({
      ...this.task,
      completed: !this.task.completed
    });
  }
}
