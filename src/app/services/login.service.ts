import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/rest_usuarios";
  header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor( private http: HttpClient) { }

  getUsuario( id: string ) {
    return this.http.get(`${this.url}/${id}`);
  }
}
