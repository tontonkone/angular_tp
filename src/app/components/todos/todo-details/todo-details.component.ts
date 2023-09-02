import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/shared/services/todo.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { ITask } from 'src/app/shared/models/ITask';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private userService: UserService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {

    this.currentUserId = sessionStorage.getItem('currentUserId');
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('category');
      if (categoryId) {
        this.selectedCategoryId = categoryId;
        this.todoService.getTasksByCategory(categoryId).subscribe(loadedTasks => {
          console.log('Loaded tasks:', loadedTasks); // Vérifiez si les données sont correctes ici
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
    this.todoService.getTasks().subscribe(tasks => {
      console.log("taches get =>", tasks);
      this.tasks = tasks;
      this.tasksTodo = this.tasks.filter(task => !task.done);
      this.tasksDone = this.tasks.filter(task => task.done);
    });
  }

  assignUsersToTasks(tasks: ITask[]): void {
    tasks.forEach(async (task) => {
      if (task.userId) {
        const user = await this.userService.findById(task.userId).toPromise();
        if (user) {
          task.user = user;
        }
      }
    });
  }
}
