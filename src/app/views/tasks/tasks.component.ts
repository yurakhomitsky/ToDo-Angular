import {Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from 'src/app/model/Task';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { EditTaskDialogComponent } from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { Category } from '../../model/Category';
import { Priority } from '../../model/Priority';
import { operationsType } from 'src/app/dialog/OperType';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

   
    public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category','operations','select'];
    public dataSource: MatTableDataSource<Task>; 


    


    @ViewChild(MatPaginator, { static: false}) public paginator: MatPaginator;
    @ViewChild(MatSort, { static: true}) public sort: MatSort;
    
    public tasks: Task[];
    @Input('tasks') 
    set setTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.fillTable();
    }

    @Input() priorities: Priority[];

    @Input() selectedCategory: Category

    @Output()
    updateTask = new EventEmitter<Task>()

    @Output()
    deleteTask = new EventEmitter<Task>()

    @Output()
    addTask = new EventEmitter<Task>()

    @Output()
    selectCategory = new EventEmitter<Category>()

    @Output()
    filterByTitle = new EventEmitter<string>();

    @Output()
    filterByStatus = new EventEmitter<boolean>();

    @Output()
    filterByPriority = new EventEmitter<Priority>();

    //пошук
    public searchTaskText: string; // значення для пошука задач
    public selectedStatusFilter: boolean = null;
    public selectedPriorityFilter: Priority = null;

    constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
    }

    ngOnInit() {
        // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataSource = new MatTableDataSource();

        this.fillTable();
    }

    ngAfterViewInit() {
        // this.addTableObjects();
    }
    toggleTaskCompleted(task: Task) {
        task.completed = !task.completed;
    }

     getPriorityColor(task: Task) {
         
        if (task.completed) {
            return '#F8F9FA';
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff'; 

    }

   
    private fillTable() {
        if(!this.dataSource) {
            return;
        }
        this.dataSource.data = this.tasks; 

        this.addTableObjects();
        this.dataSource.sortingDataAccessor = (task, colName) => {

            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'title': {
                    return task.title;
                }
            }
        };
    }

    private addTableObjects() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    openEditTaskDialog(task: Task) {
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [
                task,
                'Редактирование задачи',
                operationsType.Edit
            ],
            autoFocus: false
        })
        dialogRef.afterClosed()
            .subscribe((result) => {

                if (result === 'delete') {
                    this.deleteTask.emit(task);
                    return;
                }
    
                if (result as Task) {
                    this.updateTask.emit(result);
                    return;
                }
            })
        
    }
    openAddTaskDiaglog() {
        const task = new Task(null,'',false,null, this.selectedCategory,null)
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [
                task,
                'Добавление задачи',
                operationsType.Add
            ],
            autoFocus: false
        })
        dialogRef.afterClosed()
            .subscribe((result) => {
                this.addTask.emit(result);
            })

    }
    openDeleteDialog(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data : {
              dialogTitle: 'Подтвердите действие',
              message: `Вы действительно хотите удалить задачу: "${task.title}"?`
            },
            autoFocus: false
          })
          
          dialogRef.afterClosed()
            .subscribe((result) => {
              if(result) {
                this.deleteTask.emit(task);
              }
            })
    }
    onToggleStatus(task: Task) {
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }
    onSelectCategory(category: Category) {
        this.selectCategory.emit(category);
    }
    onFilterByTitle() {
        this.filterByTitle.emit(this.searchTaskText);
    }

    onFilterByStatus(value: boolean) {
        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }
    onFilterByPriority(priority: Priority): void {
        if (priority !== this.selectedPriorityFilter) {
        this.selectedPriorityFilter = priority;
        this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }
}
