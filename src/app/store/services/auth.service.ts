import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegisterRequestInterface } from 'src/app/auth/types/register-request.inteface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { AuthResponseInterface } from '../../auth/types/auth-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(`${this.baseUrl}/api/users`, data)
      .pipe(map(response => response.user));
  }
}
