import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from '../models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  url = "http://localhost:8080/rest_stats";
  urlstat = "http://localhost:8080/stats";

  header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor( private http: HttpClient) { }

  getStats(){
    return this.http.get(this.url);
  }

  getStat( id: string ) {
    return this.http.get(`${this.url}/${id}`);
  }

  getShowstat( id_comisionista = null ){
    return this.http.get(`${this.urlstat}/${id_comisionista}`);
  }

  crearStat(s: Stats): Observable<Stats>{
    const cadena =
      `id_comisionista=${s.id_comisionista}&clave=${s.clave}&importe_total=${s.importe_total}&fecha=${s.fecha}`;
    return this.http.post<Stats>(this.url, cadena, { headers: this.header});
  }
}
