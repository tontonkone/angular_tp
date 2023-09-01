import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/shared/models/ITask';
import { Todo } from 'src/app/shared/models/todo';
import { User } from 'src/app/shared/models/user';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
  export class TodosComponent implements OnInit {
  categories: any[] = [];
  selectedUserId: string = '';
  selectedCategory: string | undefined;

  todos: Todo[] = [];
  tasks: ITask[] = [];
  createdByUser: User | undefined;

  todo: Todo = {
    done: false,
    editable: false
  };

  //Injection du service
  constructor(private _todoService: TodoService) { 
  }

  ngOnInit(): void {
    this._todoService.getCategories().subscribe(data => {
      console.log(data)
      this.categories = data;
    });
    this._init();
  }

  getTodosByCategory(category: string | undefined): Todo[] {
    if (this.selectedCategory === undefined || category === this.selectedCategory) {
      if (category === undefined) {
        // Traitez le cas où la catégorie est undefined
        return this.todos.filter(todo => todo.categorie === 'Sans catégorie');
      }
      // retourner les categories
      return this.todos.filter(todo => todo.categorie === category);
    }
    // retourner tableau vide
    return [];
  }
  onSelectUser(userId: string) {
    this.selectedUserId = userId;
  }

  onSelectCategory(event: any) {
    if (event && event.target) {
      const selectedCategoryId = event.target.value;
      this._todoService.getTasksByCategory(selectedCategoryId).subscribe(tasks => {
        this.tasks = tasks;
        if (tasks.length > 0) {
          this.createdByUser = tasks[0].user;
        }
      });
    }
  }


  showCategoryTodo(category: string | undefined): void {
    this.selectedCategory = category;
  }

  /* get categories(){
    return [...new Set(this.todos.map(todo => todo.categorie))];
  } */


  //Appel du service pour récupérer en base toutes les taĉhes
  //enregistrées
  private _init() {
    this._todoService
      .findAll()//récupération de toutes les tâches en mémoire
      .subscribe(todosReceived => { //
        this.todos = todosReceived;
      });
  }

  createOrUpdateTodo() {
    if (!this.todo.id) {
      this._todoService
        .create(this.todo)
        .subscribe(() => {
          this.reInitTodo();
          this._init();
        });
    }
    else {
      this._todoService
        .update(this.todo)
        .subscribe(() => {
          this.reInitTodo();
          this._init();
        });
    }
  }

  reInitTodo() {
    this.todo = {
      done: false,
      editable: false
    };
  }

}



