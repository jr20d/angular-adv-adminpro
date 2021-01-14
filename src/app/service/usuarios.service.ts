import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;
const base_url: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _auth2: any;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  get auth2(): any{
    return this._auth2;
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

  logout(): void{
    localStorage.removeItem('token');

    this._auth2.signOut().then(() =>{
      this.ngZone.run(() =>{
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) =>{
        localStorage.setItem('token', resp.token);
      }),
      map((resp: any) => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
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
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
