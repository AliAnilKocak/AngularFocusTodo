import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../model/Todo';

const API_URL = 'http://localhost:9191/';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + 'todos');
  }

  gettTodoByActionId(id): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + 'todosbyaction/' + id);
  }

}
