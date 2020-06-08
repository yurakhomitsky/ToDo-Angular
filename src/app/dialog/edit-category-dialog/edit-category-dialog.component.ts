import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { operationsType } from '../OperType';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, operationsType],
    private dialog: MatDialog
  ) {
  }
  dialogTitle: string;
  categoryTitle: string;
  operationsType: operationsType
  
  ngOnInit() {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operationsType = this.data[2];
  }
   onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

   onCancel() {
    this.dialogRef.close(false);
  }
   delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"? (сами задачи не удаляются)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); 
      }
    });

}
}
