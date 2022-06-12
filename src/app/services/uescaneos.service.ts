import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UEscaneos } from '../models/uescaneos.model';

@Injectable({
  providedIn: 'root'
})
export class UescaneosService {

  url = "http://localhost:8080/rest_escaneos";
  urlstat = "http://localhost:8080/scan_stat";

  header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor( private http: HttpClient) { }

  getEscaneos(){
    return this.http.get(this.url);
  }

  getEscaneo( id: string ) {
    return this.http.get(`${this.url}/${id}`);
  }

  getScanStat( id_comisionista: string, clave: string ) {
    return this.http.get(`${this.urlstat}/${id_comisionista}/${clave}`);
  }

  crearEscaneo(ue: UEscaneos): Observable<UEscaneos>{
    const cadena =
      `codigo=${ue.codigo}&importe=${ue.importe}&status=${ue.status}&fecha=${ue.fecha}&id_comisionista=${ue.id_comisionista}&clave=${ue.clave}`;
    return this.http.post<UEscaneos>(this.url, cadena, { headers: this.header});
  }
}
