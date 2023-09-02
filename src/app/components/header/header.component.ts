import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private authService: AuthService,private router: Router) { }

  isUserLoggedIn(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  logout(): void {
    this.authService.logout();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
