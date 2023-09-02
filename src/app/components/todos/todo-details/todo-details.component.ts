import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/shared/services/todo.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { ITask } from 'src/app/shared/models/ITask';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmitterService } from 'src/app/shared/services/emetter.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  tasks: ITask[] = [];
  tasksTodo: ITask[] = [];
  tasksDone: ITask[] = [];
  selectedCategoryId: string | null = null;
  currentUserId: string | null = null;
  categoryName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private _todoService: TodoService,
    private _userService: UserService,
    private _emetterService: EmitterService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUserId = sessionStorage.getItem('currentUserId');
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('category'); // je veux recuperer le nom du category ?
      if (categoryId) {
        this.selectedCategoryId = categoryId;
        this._todoService.getCategoryNameById(categoryId).subscribe(categoryName => {
          this.categoryName = categoryName.name;
        });
        this._todoService.getTasksByCategory(categoryId).subscribe(loadedTasks => {
          console.log('Loaded tasks:', loadedTasks);
          if (loadedTasks) {
            this.tasks = loadedTasks;
            this.assignUsersToTasks(this.tasks);
            this.tasks = loadedTasks.filter(task => task.userId === this.currentUserId);
            this.tasksTodo = this.tasks.filter(task => !task.done);
            this.tasksDone = this.tasks.filter(task => task.done);
          }
        });
      }
    });
    this.loadTasks();
    
  }

  loadTasks(): void {
    this._todoService.getTasks().subscribe(tasks => {
      console.log("taches get =>", tasks);
      this.tasks = tasks;
      this.tasksTodo = this.tasks.filter(task => !task.done);
      this.tasksDone = this.tasks.filter(task => task.done);
    });
  }

  assignUsersToTasks(tasks: ITask[]): void {
    tasks.forEach(async (task) => {
      if (task.userId) {
        const user = await this._userService.findById(task.userId).toPromise();
        if (user) {
          task.user = user;
        }
      }
    });
  }
}
