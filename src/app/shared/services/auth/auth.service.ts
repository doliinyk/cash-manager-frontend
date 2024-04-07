import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public verifyEmail(userId: string | null, activationToken: string | null): Observable<void> {
    const params = new HttpParams().set('userId', userId ? userId : 'null').set('activationToken', activationToken ? activationToken : 'null');
    return this.httpClient.post<void>('http://localhost:8080/api/v1/auth/activate', {}, { params: params });
  }
}
