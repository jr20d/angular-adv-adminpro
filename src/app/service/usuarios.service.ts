import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios';
import { RolUsuario } from '../interfaces/rol-usuario';

declare const gapi: any;
const base_url: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _auth2: any;
  private _usuario: Usuario | undefined;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  get auth2(): any{
    return this._auth2;
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit(){
    return new Promise<void>(resolve =>{
      gapi.load('auth2', () =>{
        this._auth2 = gapi.auth2.init({
          client_id: '833631103429-uv6d11llefe6sgkc2lvk8qkgedabaoni.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }

  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  get usuario(): Usuario | undefined{
    return this._usuario;
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this._auth2.signOut().then(() =>{
      this.ngZone.run(() =>{
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean>{
    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp: any) =>{
        const {nombre, email, rol, google, imagen, uid} = resp.usuario;
        this._usuario = new Usuario(nombre, email, rol, google, imagen, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  actualizarPerfil(data: {email: string, nombre: string, rol: string}){
    data.rol = this.usuario?.rol || '';

    return this.http.put(`${base_url}/usuarios/${this.usuario?.uid}`, data, this.headers);
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
        if (formData.remember){
          localStorage.setItem('email', formData.email);
        }
        else{
          localStorage.removeItem('email');
        }
      })
    );
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  cargarUsuario(desde: number = 0){
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers)
    .pipe(
      map(resp =>{
        const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email,
          user.rol, user.google, user.imagen, user.uid));
        return {
          total: resp.total,
          usuarios
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  cambiarUsuario(usuario: RolUsuario){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
