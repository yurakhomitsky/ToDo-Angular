// CRUD
import { Observable } from 'rxjs';


export interface CommonDAO<T> {
    add(T): Observable<T>;

    get(id: number): Observable<T>;

    update(arg: T): Observable<T>;

    delete(id: number): Observable<T>;

    getAll(): Observable<T[]>;
}