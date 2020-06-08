import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import { Category } from '../../model/Category';
import { MatDialog } from '@angular/material';
import { EditCategoryDialogComponent } from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import { operationsType } from '../../dialog/OperType';


@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Input() categories: Category[];

    @Output()
    selectCategory = new EventEmitter<Category>();
    
    @Input()
    selectedCategory: Category;

    @Output()
    deleteCategory = new EventEmitter<Category>();

    // изменили категорию
    @Output()
    updateCategory = new EventEmitter<Category>();

    @Output()
    addCategory = new EventEmitter<Category>();

    @Output()
    searchCategory = new EventEmitter<string>();

    indexMouseMove: number;
    constructor(private dataHandler: DataHandlerService,private dialog: MatDialog) {
    }

    searchCategoryTitle: string;

    ngOnInit() {
        // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }


    showTasksByCategory(category: Category) {
        if (this.selectedCategory === category) {
            return;
        }
        this.selectedCategory = category;
        this.selectCategory.emit(this.selectedCategory);
        
    }
    @HostListener('document:keydown.control.z') undo(event: KeyboardEvent) {
        console.log('pids')
        // responds to control+z
      }

      openEditDialog(category: Category) {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [category.title, 'Редактирование категории', operationsType.Edit],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'delete') { 

                this.deleteCategory.emit(category); 

                return;
            }

            if (typeof (result) === 'string') { 
                category.title = result as string;

                this.updateCategory.emit(category); 
                return;
            }
        });
    }
    openAddCategoryDialog() {
       
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: ['', 'Редактирование категории',operationsType.Add],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
                this.addCategory.emit(result); 
        });
    }

    search() {
        if(this.searchCategoryTitle == null) {
            return
        }
        this.searchCategory.emit(this.searchCategoryTitle);
    }
}
