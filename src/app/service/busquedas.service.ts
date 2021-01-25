import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  private get token(): string{
    return localStorage.getItem('token') || '';
  }

  private get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]): Usuario[]{
    return resultados.map((user: Usuario) => new Usuario(user.nombre, user.email, user.rol, user.google, user.imagen, user.uid));
  }

  bucar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map((resp: any) =>{
        switch(tipo){
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
            break;
          default:
            return [];
        }
      })
    );
  }
}