import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/oauth2/token";  // Substitua pelo URL correto
  private clientId = 'myclientid';  // Substitua pelo seu client_id
  private clientSecret = 'myclientsecret';  // Substitua pelo seu client_secret

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    // Codificar client_id e client_secret em Base64
    const credentials = btoa(`${this.clientId}:${this.clientSecret}`);

    // Configurar os cabeçalhos da requisição
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Dados a serem enviados no corpo da requisição
    const body = new URLSearchParams();
    body.set('grant_type', 'password');  // Dependendo da especificação da API, você pode precisar definir um tipo de concessão
    body.set('username', email);          // ou 'email'
    body.set('password', password);

    // Requisição POST com cabeçalhos e corpo configurados
    return this.httpClient.post<LoginResponse>(this.apiUrl, body.toString(), { headers }).pipe(
      tap((response) => {
        // Armazenar token e outras informações no sessionStorage
        sessionStorage.setItem("auth-token", response.token);
        sessionStorage.setItem("username", response.name);
      })
    );
  }
}
