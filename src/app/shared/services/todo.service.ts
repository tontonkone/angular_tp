import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Itodos } from '../models/Itodos';
import { Observable } from 'rxjs';
import { User } from '../models/user';
/**
 * service de todo
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _baseUrl = environment.urlApi.categories;
  private _baseUserUrl = environment.urlApi.users

  constructor(private _http: HttpClient) {}

  public findAll() {
    return this._http.get<Itodos[]>(this._baseUrl);
  }

  public findById(id: string) {
    return this._http.get(`${this._baseUrl}/${id}`);
  }

  public create(todo: Todo) {
    return this._http.post(this._baseUrl, todo);
  }

  public update(updated: Todo) {
    return this._http.put(`${this._baseUrl}/${updated.id}`, updated);
  }

  public delete(todo: Todo) {
    return this._http.delete(`${this._baseUrl}/${todo.id}`);
  }

  getTasksByCategory(category: string): Observable<Todo[]> {
    const url = `${this._baseUrl}/${category}/tasks`;
    return this._http.get<Todo[]>(url);
  }

  getUserByCategory(category: string): Observable<User> {
    const url = `${this._baseUrl}/${category}`; 
    return this._http.get<User>(url);
  }

}
