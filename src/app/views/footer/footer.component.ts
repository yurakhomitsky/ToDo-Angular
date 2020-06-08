import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AboutComponent } from 'src/app/dialog/about/about.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private year: Date;
  private site = 'https://javabegin.ru/';
  private blog = 'https://javabegin.ru/blog/tag/angular/';
  private siteName = 'JavaBegin';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.year = new Date(); // текуший год
  }

  // окно "О программе"
  private openAboutDialog() {
    this.dialog.open(AboutComponent,
        {
          autoFocus: false,
          data: {
            dialogTitle: 'О программе',
            message: 'Данное приложение было создано для видеокурса "Angular для начинающих" на сайте javabegin.ru'
          },
          width: '400px'
        });

  }

}
