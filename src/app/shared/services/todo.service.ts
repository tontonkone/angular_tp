import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Itodos } from '../models/Itodos';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ITask } from '../models/ITask';
import { ICategory } from '../models/ICategory';
import { UserService } from './user.service';
/**
 * service de todo
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _baseUrl = environment.urlApi.categories;
  private _baseUserUrl = environment.urlApi.users
  private _baseTodoUrl = environment.urlApi.tasks;

  constructor(private _http: HttpClient, private _userService : UserService) {}

  public findAll() {
    return this._http.get<Itodos[]>(this._baseUrl);
  }

  public findById(id: string) {
    return this._http.get(`${this._baseUrl}/${id}`);
  }

  public create(todo: ITask) {
    return this._http.post(this._baseTodoUrl, todo);
  }

  public update(updated: Todo) {
    return this._http.put(`${this._baseUrl}/${updated.id}`, updated);
  }

  public delete(todo: Todo) {
    return this._http.delete(`${this._baseUrl}/${todo.id}`);
  }

  getCategories(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(`${this._baseUrl}`);
  }
  getTasksByCategory(category: string): Observable<ITask[]> {
    const url = `${this._baseUrl}/${category}/tasks`;
    return this._http.get<ITask[]>(url);
  }

  getUserByCategory(category: string): Observable<User> {
    const url = `${this._baseUrl}/${category}`; 
    return this._http.get<User>(url);
  }
  getTasks(): Observable<ITask[]> {
    const url = `${this._baseTodoUrl}`;
    return this._http.get<ITask[]>(url);
  }
  getCategoryNameById(categoryId: string): Observable<ICategory> {
    const url = `${this._baseUrl}/${categoryId}`;
    return this._http.get<ICategory>(url);
  }
  /////////////////////////////////////
}
