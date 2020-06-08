import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private dialogTitle: string;
  private message: string;

  constructor(
      private dialogRef: MatDialogRef<AboutComponent>, 
      @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } 
  ) {

    this.dialogTitle = data.dialogTitle; 
    this.message = data.message; 
  }


  ngOnInit() {
  }


  private onConfirm(): void {
    this.dialogRef.close(true);
  }

}
