import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { operationsType } from '../../dialog/OperType';
import { SettingsDialogComponent } from 'src/app/dialog/settings-dialog/settings-dialog.component';
import { IntroService } from '../../service/intro.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  showStats: boolean;

  @Input()
  categoryName: string;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  
  @Output()
  toggleMenu = new EventEmitter();

  private isMobile: boolean;
  constructor(private dialog: MatDialog, private introService: IntroService, private deviceDetector: DeviceDetectorService) { 
    this.isMobile = deviceDetector.isMobile();

  }

  ngOnInit() {
  }

  showStatistic() {
    this.toggleStat.emit(!this.showStats);
  }
  showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px'
    })
  }
  showIntroHelp() {
    this.introService.startIntroJS(false);
  }
   onToggleMenu() {
    this.toggleMenu.emit(); // показать/скрыть меню
}
}

