import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Contact } from '../../core/models/types';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = environment.url_base + 'contact';
  userId = Number(localStorage.getItem('user_id'))

  constructor(private _httpClient: HttpClient) {
  }


  getContactsByUser(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/getAllByUser?user_id=${this.userId}`);
  }
  
  updateContact(contact: Contact): Observable<any> {
    contact.user_id = this.userId
    return this._httpClient.put<any>(`${this.apiUrl}/update`, contact);
  }
  
  createContact(contact: Contact): Observable<any> {
    contact.user_id = this.userId
    return this._httpClient.post<any>(`${this.apiUrl}/create`, contact);
  }
  deleteContact(contact: Contact): Observable<any> {
    return this._httpClient.delete<any>(`${this.apiUrl}/delete?contact_id=${contact.contact_id}`,);
  }
}
