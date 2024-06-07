import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Importa 'of' desde RxJS
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost/candyStoreRest/src/controllers/Usuarios.php'; 
  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  getUserByCuentaAndPassword(cuenta: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('cuenta', cuenta)
      .set('password', password);

    return this.http.get<{msg: string, usuario: any}>(`${this.apiUrl}/login`, { params })
      .pipe(
        map(response => new User(response.usuario))
      );
  }

  setUserRegister(usuario:any){
    return this.http.post<any>(this.apiUrl, usuario);
  }

  getCurrentUser(): Observable<User | null> {
    if (this.currentUser) {
      return of(this.currentUser);
    } else {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentUser = new User(user);
        return of(this.currentUser);
      } else {
        return of(null); 
      }
    }
  }

  setUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearUser(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
