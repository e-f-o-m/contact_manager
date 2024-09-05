import { Injectable } from '@angular/core';
import { User } from '../../../core/models/types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.url_base + 'user';

  constructor(private _httpClient: HttpClient) {
  }


  login(user: User): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}/validate`, user);
  }

  signup(user: User): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}/create`, user);
  }
}
