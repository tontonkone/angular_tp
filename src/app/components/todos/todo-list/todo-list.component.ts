import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  // Récupération de todos du composant TODOS
  @Input()
  public todos: Todo[] = [];
}
