import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { TestData } from '../data/TestData';
import { Task } from '../model/Task';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);
  constructor() { }

  fillCategories() {
    this.categoriesSubject.next(TestData.categories);
  }
  fillTasks() {
    this.tasksSubject.next(TestData.tasks);
  }
  fillTasksByCategory(category: Category) {
    this.tasksSubject.next(TestData.tasks.filter(task => task.category && task.category.id === category.id));
  }
}
