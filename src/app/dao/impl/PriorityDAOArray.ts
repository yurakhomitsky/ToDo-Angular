import { PriorityDAO } from '../interface/PriorityDAO';
import { Priority } from 'src/app/model/Priority';
import { Observable, of } from 'rxjs';
import { TestData } from '../../data/TestData';

export class PriorityDAOArray implements PriorityDAO {
    add(priority: Priority): Observable<Priority> {
        if (priority.id === null || priority.id === 0) {
            priority.id = this.getLastIdPriority();
        }
        TestData.priorities.push(priority);

        return of(priority);
    }
    private getLastIdPriority(): number {
        return Math.max(...TestData.priorities.map(c => c.id)) + 1;
    }
    get(id: number): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    update(priority: Priority): Observable<Priority> {
        const tmp = TestData.priorities.find(t => t.id === priority.id); // обновляем по id
        const priorityInTask =  TestData.tasks.findIndex(todo => todo.priority.id === priority.id);
        TestData.tasks[priorityInTask].priority = priority;
        TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1, priority);

        return of(priority);
    }
    delete(id: number): Observable<Priority> {
        TestData.tasks.forEach(task => {
            if (task.priority && task.priority.id === id) {
                task.priority = null;
            }
        });

        const tmpPriority = TestData.priorities.find(t => t.id === id); // удаляем по id
        TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);

        return of(tmpPriority);
    }
    getAll(): Observable<Priority[]> {
        return of(TestData.priorities);
    }

}