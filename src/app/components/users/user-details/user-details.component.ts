import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
  ) {}
  user!: User;

  ngOnInit(): void {
    // SNAPSHOT
    this._userService
      .findById(this._route.snapshot.paramMap.get('userId') as string)
      .subscribe(user => this.user = user);

    // DYNAMIQUE
    this._route.paramMap.subscribe(paramMap => {
      this._userService
        .findById(paramMap.get('userId') as string)
        .subscribe(user => this.user = user);
    });
  }
}
