import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
  export class TodosComponent implements OnInit {
    //Tableau de tâches
    todos: Todo[] = [];
    //categorie selectioné
    selectedCategory: string | undefined;

    //Déclaration d'une tâche vide
    todo: Todo = {
    done: false,
    editable: false
  };

  //Injection du service
  constructor(private _todoService: TodoService) { }

  ngOnInit(): void {
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


  showCategoryTodo(category: string | undefined): void {
    this.selectedCategory = category;
  }

  get categories(){
    return [...new Set(this.todos.map(todo => todo.categorie))];
  }


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



