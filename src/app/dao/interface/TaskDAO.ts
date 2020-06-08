import { CommonDAO } from './CommonDAO';
import { Task } from 'src/app/model/Task';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { Observable } from 'rxjs';

export interface TodoDAO extends CommonDAO<Task> {

    // пошук задач по всіх параметрах
    // якщо, який-небудь параметр рівний null він не будет враховуватись при пошуку
    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

    // к-кість закінчених задач в заданій категорії (якщо category === null, то для всіх категорій)
    getCompletedCountInCategory(category: Category): Observable<number>;

    // к-кість не закінчених задач в заданій категорії (якщо category === null, то для всіх категорій)
    getUncompletedCountInCategory(category: Category): Observable<number>;

    // к-кість всіх задач в заданій категорії (якщо category === null, то для всіх категорій)
    getTotalCountInCategory(category: Category): Observable<number>;
    
    // к-кість всіх задач загалом
    getTotalCount(): Observable<number>;

}