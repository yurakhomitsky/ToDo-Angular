import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { TaskDatePipe } from './pipe/taskDate.pipe';
import {registerLocaleData} from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { AboutComponent } from './dialog/about/about.component';
import { StatsComponent } from './views/stats/stats.component';
import { StatsCardComponent } from './views/stats/stats-card/stats-card.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PrioritiesComponent } from './views/priorities/priorities.component';
import { SettingsDialogComponent } from './dialog/settings-dialog/settings-dialog.component';
import {SidebarModule} from "ng-sidebar";
import { DeviceDetectorModule } from 'ngx-device-detector';
registerLocaleData(localeUa);
@NgModule({
    declarations: [
        AppComponent,
        CategoriesComponent,
        TasksComponent,
        EditTaskDialogComponent,
        ConfirmDialogComponent,
        TaskDatePipe,
        EditCategoryDialogComponent,
        HeaderComponent,
        FooterComponent,
        AboutComponent,
        StatsComponent,
        StatsCardComponent,
        PrioritiesComponent,
        SettingsDialogComponent
    ],
    imports: [
        BrowserModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        ColorPickerModule,
        SidebarModule.forRoot(),
        DeviceDetectorModule.forRoot()
    ],
    providers: [],
    entryComponents: [EditTaskDialogComponent, ConfirmDialogComponent, EditCategoryDialogComponent,AboutComponent, SettingsDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
