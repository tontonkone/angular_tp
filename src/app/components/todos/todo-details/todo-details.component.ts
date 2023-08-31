import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/shared/models/todo';
import { User } from 'src/app/shared/models/user';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent  implements OnInit{

  @Input() tasks: Todo[] = []; //  les taches dans le composant 
  @Input() done: boolean = false;
  createdByUser: User | undefined;
  category!: string;

  constructor(
    private _route: ActivatedRoute,
    private _todoService: TodoService) { }
  ngOnInit(): void {
    console.log('TodoDetailsComponent ngOnInit called');
    this._route.paramMap.subscribe((paramMap) => {
      const category = paramMap.get('category');
      console.log('Category:', category);
      if (category) {
        // Utilisez la catégorie pour charger les détails et les tâches correspondantes
        // Par exemple, appelez une méthode de service pour charger les détails par catégorie
        this.loadCategoryDetails(category);
      }
    });
  }

  loadCategoryDetails(category: string): void {
    // Utilisez le service pour charger les détails et les tâches de la catégorie
    this._todoService.getTasksByCategory(category).subscribe(tasks => {
      this.tasks = tasks;
    });

    this._todoService.getUserByCategory(category).subscribe(user => {
      this.createdByUser = user;
    });
  }


/*   deleteTodo(todoId: Todo): void
  {
    if (todoId) {
      this._todoService
        .delete(todoId)
        .subscribe(()=> this.initTodo());
    }
  }

  private initTodo(): void
  {
    this.tasks = this.tasks.filter( task=> task.id !== task.id );
  }
  getFilteredTasks(): Todo[] {
    return this.tasks.filter(task => task.done === this.done);
  } */
}
