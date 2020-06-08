import { CategoryDAO } from '../interface/CategoryDAO';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { TestData } from '../../data/TestData';

export class CategoryDAOArray implements CategoryDAO {
    get(id: number): Observable<Category> {
        return undefined;
    }

    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }


    add(category: Category): Observable<Category> {

    
        if (category.id === null || category.id === 0) {
            category.id = this.getLastIdCategory();
        }

        TestData.categories.push(category);

        return of(category);
    }

    
    private getLastIdCategory(): number {
        return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
    }

    delete(id: number): Observable<Category> {
        
        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === id) {
                task.category = null;
            }
        });

        const tmpCategory = TestData.categories.find(t => t.id === id); 
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
        return of(tmpCategory);

    }

    update(category: Category): Observable<Category> {

        const tmpCategory = TestData.categories.find(t => t.id === category.id); 
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

        return of(tmpCategory);
    }


    // поиск категорий по названию
    search(title: string): Observable<Category[]> {

        return of(TestData.categories.filter(
            cat => cat.title.toUpperCase().includes(title.toUpperCase())));
    }

}