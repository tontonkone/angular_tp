import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { TodoDetailsComponent } from './components/todos/todo-details/todo-details.component';
import { TodoFormComponent } from './components/todos/todo-form/todo-form.component';
import { TodoItemComponent } from './components/todos/todo-item/todo-item.component';
import { TodoListComponent } from './components/todos/todo-list/todo-list.component';
import { TodosComponent } from './components/todos/todos.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PresentationComponent,
    ContactComponent,
    TodosComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFormComponent,
    TodoDetailsComponent,
    UsersComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
