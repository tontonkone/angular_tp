import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ContactComponent } from './components/contact/contact.component';
import { TodosComponent } from './components/todos/todos.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { TodoDetailsComponent } from './components/todos/todo-details/todo-details.component';

// /home/one/two

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'todos', 
    component: TodosComponent,
    children: [
      { path: 'categories/:category', component: TodoDetailsComponent}
    ]
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':userId', component: UserDetailsComponent },
    ]
  },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
