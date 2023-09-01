import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/shared/models/ICategory';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TodoService } from 'src/app/shared/services/todo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  taskForm: FormGroup;
  users: User[] = [];
  categories: ICategory[] = [];
  currentUserId: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private _todoService: TodoService, 
    private _userService: UserService,
    private _authService: AuthService) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      done: [false],
      categoryId: ['', Validators.required],
      userId: ['', Validators.required]
    });
    this.currentUserId = this._authService.getCurrentUserId();
    console.log(this.currentUserId)
  }
  ngOnInit(): void {
    // Récupérer la liste des utilisateurs depuis le backend ou un service
    this._userService.findAll().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
    this.loadCategories();
  }
  loadCategories(){
    this._todoService.getCategories().subscribe(data => this.categories = data)
  }

  onSubmit(): void {
    console.log(this.currentUserId)
    console.log("cc ")
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;

      // Envoyer la demande POST pour créer la tâche
      this._todoService.create(newTask).subscribe(
        (response) => {
          console.log('Tâche créée avec succès :', response);
          // Réinitialiser le formulaire après la création réussie
          this.taskForm.reset();
        },
        (error) => {
          console.error('Erreur lors de la création de la tâche :', error);
        }
      );
    }
  }



}
