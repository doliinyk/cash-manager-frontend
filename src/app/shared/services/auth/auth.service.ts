import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private handler: HttpBackend
  ) {}

  public verifyEmail(userId: string, activationToken: string): Observable<void> {
    this.httpClient = new HttpClient(this.handler);
    const params = new HttpParams().set('userId', userId).set('activationToken', activationToken);
    return this.httpClient.post<void>('http://localhost:8080/api/v1/auth/activate', {}, { params: params });
  }
}
