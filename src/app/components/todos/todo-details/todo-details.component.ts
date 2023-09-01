import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/shared/services/todo.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { ITask } from 'src/app/shared/models/ITask';

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

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private userService: UserService
  ) { }
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const categoryId = params.get('category');
      if (categoryId) {
        this.selectedCategoryId = categoryId;
        const loadedTasks = await this.todoService.getTasksByCategory(categoryId).toPromise();
        console.log('Loaded tasks:', loadedTasks); // Vérifiez si les données sont correctes ici
        if (loadedTasks) {
          this.tasks = loadedTasks;
          await this.assignUsersToTasks(this.tasks);
          this.tasksTodo = this.tasks.filter(task => !task.done);
          this.tasksDone = this.tasks.filter(task => task.done);
          console.log('Tasks Todo:', this.tasksTodo); // Vérifiez si les tâches à faire sont correctes ici
          console.log('Tasks Done:', this.tasksDone); // Vérifiez si les tâches terminées sont correctes ici
        }
      }
    });
    this.loadTasks();
  }



  loadTasks(): void {
    this.todoService.getTasks().subscribe((tasks) => {
      console.log("taches get =>",tasks);
      this.tasks = tasks;
      this.tasksTodo = this.tasks.filter((task) => !task.done);
      this.tasksDone = this.tasks.filter((task) => task.done);
    });
  }

async assignUsersToTasks(tasks: ITask[]): Promise<void> {
  const promises = tasks.map(async (task) => {
    if (task.userId) {
      const user: User | undefined = await this.userService.findById(task.userId).toPromise();
      if (user) {
        task.user = user;
      }
    }
  });

  await Promise.all(promises);
}

}
