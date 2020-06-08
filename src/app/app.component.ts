import { Component, HostListener } from '@angular/core';
import { Task } from './model/Task';
import { DataHandlerService } from './service/data-handler.service';
import { Category } from './model/Category';
import { switchMap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { Priority } from './model/Priority';
import { IntroService } from './service/intro.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent {
    public title = 'Todo';
    public tasks: Task[];
    public categories: Category[];
    public priorities: Priority[];

    private categoryMap = new Map<Category, number>()
    //статистика
    private totalTasksCountInCategory: number;
    private completedCountInCategory: number;
    private uncompletedCountInCategory: number;
    private uncompletedTotalTasksCount: number;


    private showStat = true;

    public selectedCategory: Category = null;

    // пошук
    public searchTaskText = '';
    public searchCategoryText = '';


    // фільтрація
    public priorityFilter: Priority;
    public statusFilter: boolean;

    // параметры бокового меню с категориями
    private menuOpened: boolean; // открыть-закрыть
    private menuMode: string; // тип выдвижения (поверх, с толканием и пр.)
    private menuPosition: string; // сторона
    private showBackdrop: boolean; // показывать фоновое затемнение или нет


    // тип устройства
    private isMobile: boolean;
    private isTablet: boolean;
    constructor(
        private dataHandler: DataHandlerService,
        private introService: IntroService,
        private deviceService: DeviceDetectorService,
    ) {
        this.setMenuValues();
        this.isMobile = deviceService.isMobile();
        this.isTablet = deviceService.isTablet();
        this.showStat = !this.isMobile ? true : false;
    }

    ngOnInit(): void {
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

        this.onSelectCategory(null); // показати всі задачі

        this.introService.startIntroJS(true);
    }


    // зміна категорії
    public onSelectCategory(category: Category) {

        this.selectedCategory = category;

        this.updateTasksAndStat()

    }

    // видалення категорії
    public onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(cat => {
            this.selectedCategory = null;
            this.onSelectCategory(null);

        });
    }

    // обновлении категорії
    public onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSearchCategory(this.searchCategoryText);
        });
    }

    // оновлення задачі
    public onUpdateTask(task: Task) {

        this.dataHandler.updateTask(task).subscribe(cat => {
            this.updateTasksAndStat()
        });

    }

    // видалення задачі
    public onDeleteTask(task: Task) {

        this.dataHandler.deleteTask(task.id).subscribe(cat => {
            this.updateTasksAndStat()
        });
    }


    // пошук задач
    public onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }

    // фільтрація задач по статусу 
    public onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status;
        this.updateTasks();
    }

    // фільтрація задач по пріоритету
    public onFilterTasksByPriority(priority: Priority) {
        this.priorityFilter = priority;
        this.updateTasks();
    }

    public updateTasks() {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }


    // добавление задачі
    public onAddTask(task: Task) {

        this.dataHandler.addTask(task).subscribe(result => {

            this.updateTasksAndStat()

        });

    }

    // добавление категорії
    public onAddCategory(title: string) {
        this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
    }

    public updateCategories() {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    // пошук категорії
    public onSearchCategory(title: string) {

        this.searchCategoryText = title;

        this.dataHandler.searchCategories(title).subscribe(categories => {
            this.categories = categories;
        });
    }

    private updateTasksAndStat() {

        this.updateTasks();

        this.updateStat();

    }

    // обновити статистику
    private updateStat() {
        zip(
            this.dataHandler.getTotalCountInCategory(this.selectedCategory),
            this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTotalCount())

            .subscribe(array => {
                this.totalTasksCountInCategory = array[0];
                this.completedCountInCategory = array[1];
                this.uncompletedCountInCategory = array[2];
                this.uncompletedTotalTasksCount = array[3];
            });
    }
    toggleStat(showStat: boolean) {
        this.showStat = showStat;
    }
    private onClosedMenu() {
        this.menuOpened = false;
    }

    // параметры меню
    private setMenuValues() {
        this.menuPosition = 'left';
        if (this.isMobile) {
            this.menuOpened = false; // меню сразу будет открыто по-умолчанию
            this.menuMode = 'over'; // будет "толкать" основной контент, а не закрывать его
            this.showBackdrop = true; // показывать темный фон или нет (нужно больше для мобильной версии)

        } else {
            this.menuOpened = true; // меню сразу будет открыто по-умолчанию
            this.menuMode = 'push'; // будет "толкать" основной контент, а не закрывать его
            this.showBackdrop = false;
        }


    }

    // показать-скрыть меню
    private toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }
}
