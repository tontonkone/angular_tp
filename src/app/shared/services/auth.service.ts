import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUserId: string | null = null;

  constructor() { }

  login(userId: string) {
    this.isAuthenticated = true;
    this.currentUserId = userId;
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUserId = null;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUserId(): string | null {
    return this.currentUserId;
  }
}
