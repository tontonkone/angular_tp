import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selected!: User;
  user: User = {};
  
  constructor(private _userService: UserService) {}

  ngOnInit() {
    this._init();
  }

  private _init() {
    this._userService
      .findAll()
      .subscribe(usersReceived => {
        this.users = usersReceived;
      });
  }

  reInitUser() {
    this.user = {};
  }

  createOrUpdateUser() {
    if (!this.user.id) {
      this._userService
      .create(this.user)
      .subscribe(() => {
        this.reInitUser();
        this._init();
      });
    }
    else {
      this._userService
      .update(this.user)
      .subscribe(() => {
        this.reInitUser();
        this._init();
      });
    }
  }

  delete(id?: string) {
    if (id) {
      this._userService
        .delete(id)
        .subscribe(() => this._init());
    }
  }
}
