import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUserId: string | null = null;

  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<boolean> {
    try {
      // Envoyez une requête HTTP pour récupérer les données JSON (remplacez l'URL par la vôtre)
      const users = await this.http.get<User[]>('http://localhost:3000/users').toPromise();

      // Recherchez un utilisateur avec l'email fourni
      if (users) {
        console.log(" verifier si users existe ====  ",users); 
        const user = users.find(user => user.email === email);
        console.log(" user = ",user);
        if (user && user.password === password) {
          this.isAuthenticated = true;
          this.currentUserId = user.id ?? null;
          sessionStorage.setItem('currentUserId', user.id || '');
          return true;
        } else {
          this.isAuthenticated = false;
          this.currentUserId = null;
          return false;
        }
      }

      return false; // Ajoutez cette ligne pour renvoyer une valeur par défaut si aucun chemin précédent n'est pris

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données JSON :', error);
      return false;
    }
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
