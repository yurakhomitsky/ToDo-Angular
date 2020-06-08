import {Injectable} from '@angular/core';
import { Category } from '../model/Category';
import {TestData} from "../data/TestData";
import { Task } from '../model/Task';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskDAOArray } from '../dao/impl/TaskDAOArrray';
import { CategoryDAOArray } from '../dao/impl/CategoryDAOArray';
import { Priority } from '../model/Priority';
import { PriorityDAOArray } from '../dao/impl/PriorityDAOArray';


@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private taskDaoArray = new TaskDAOArray();
    private categoryDaoArray = new CategoryDAOArray();
    private priorityDaoArray = new PriorityDAOArray();
 
     constructor() {
         
     }
 
     getAllTasks(): Observable<Task[]> {
         return this.taskDaoArray.getAll();
     }
     
     getAllCategories(): Observable<Category[]> {
         return this.categoryDaoArray.getAll();
     }
     getAllPriorities(): Observable<Priority[]> {
         return this.priorityDaoArray.getAll();
     }

     addPriority(priority: Priority): Observable<Priority> {
        return this.priorityDaoArray.add(priority);
    }

    deletePriority(id: number): Observable<Priority> {
        return this.priorityDaoArray.delete(id);
    }

    updatePriority(priority: Priority): Observable<Priority> {
        return this.priorityDaoArray.update(priority);
    }

     searchTasks(category: Category, searchText:string, status: boolean, priority: Priority): Observable<Task[]> {
         return this.taskDaoArray.search(category,searchText,status,priority);
     }

     searchCategories(title: string): Observable<Category[]> {
        return this.categoryDaoArray.search(title);
     }

     addTask(task: Task): Observable<Task> {
         return this.taskDaoArray.add(task)
     }
     updateTask(task: Task): Observable<Task> {
         return this.taskDaoArray.update(task);
     }
     deleteTask(id: number): Observable<Task> {
         return this.taskDaoArray.delete(id);
     }
     addCategory(category: string): Observable<Category> {
         return this.categoryDaoArray.add(new Category(null,category));
     }
     updateCategory(category: Category): Observable<Category> {
        return this.categoryDaoArray.update(category);
    }

    deleteCategory(id: number): Observable<Category> {
        return this.categoryDaoArray.delete(id);
    }


    // статистика

    getCompletedCountInCategory(category: Category): Observable<number> {
        return this.taskDaoArray.getCompletedCountInCategory(category);
    }

    getUncompletedTotalCount(): Observable<number> {
        return this.taskDaoArray.getUncompletedCountInCategory(null);
    }

    getUncompletedCountInCategory(category: Category): Observable<number> {
        return this.taskDaoArray.getUncompletedCountInCategory(category);
    }

    getTotalCountInCategory(category: Category): Observable<number> {
        return this.taskDaoArray.getTotalCountInCategory(category);
    }
}
