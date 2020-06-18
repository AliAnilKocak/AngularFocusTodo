import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from '../model/Action';

const API_URL = 'http://localhost:9191/';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) {
  }

  getAllActions(): Observable<Action[]> {
    return this.http.get<Action[]>(API_URL + 'actions');
  }

}
