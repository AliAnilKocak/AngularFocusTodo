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

  getFavoriteTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + 'favoritetodos');
  }

  getCompletedTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + 'completedtodos');
  }

  saveTodo(title: string, description: string, actionId: number): Observable<Todo[]> {
    return this.http.post<Todo[]>(API_URL + 'todos', {
      title,
      description,
      action_id: actionId
    });
  }

  updateTodo(title: string, description: string, id: number): Observable<Todo[]> {
    return this.http.put<Todo[]>(API_URL + 'todos', {
      id,
      title,
      description
    });
  }

  updateTodoToggle(title: string, description: string, id: number, completed, favorite): Observable<Todo[]> {
    return this.http.put<Todo[]>(API_URL + 'todos', {
      id,
      title,
      description,
      completed,
      favorite
    });
  }

  favoriteTodoUpdate(title: string, description: string, id: number, favorite, completed): Observable<Todo[]> {
    return this.http.put<Todo[]>(API_URL + 'todos', {
      id,
      title,
      description,
      favorite,
      completed
    });
  }

  createTodoForAllFields(title, description, time, energy, dueDate, actionId) {
    return this.http.post(API_URL + 'todos', {
      title,
      description,
      time,
      energy,
      dueDate,
      action_id: actionId,
    });
  }

  updateTodoForAllFields(id, title, description, time, energy, dueDate, actionId, completed, favorite) {
    return this.http.put(API_URL + 'todos', {
      id,
      title,
      description,
      time,
      energy,
      dueDate,
      action_id: actionId,
      completed,
      favorite
    });
  }


  gettTodoByActionId(id): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + 'todosbyaction/' + id);
  }

}
