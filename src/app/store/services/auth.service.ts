import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegisterRequestInterface } from 'src/app/shared/types/register-request.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { AuthResponseInterface } from '../../shared/types/auth-response.interface';
import { environment } from 'src/environments/environment';
import { LoginRequestInterface } from 'src/app/shared/types/login-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + '/api';

  constructor(private http: HttpClient) { }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.get<AuthResponseInterface>(`${this.baseUrl}/user`)
      .pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${this.baseUrl}/users`, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${this.baseUrl}/users/login`, data)
      .pipe(map(this.getUser));
  }
}
