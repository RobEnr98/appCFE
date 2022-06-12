import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  url = "http://localhost:8080/files_anexo";
  header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor( private http: HttpClient) { }

  getFiles( id: string ){
    return this.http.get(`${this.url}/${id}`);
  }
}
