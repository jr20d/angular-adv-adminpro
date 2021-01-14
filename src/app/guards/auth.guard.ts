import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../service/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuariosService,
    private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.usuarioService.validarToken().pipe(
        tap(autenticado => {
          if (!autenticado){
            this.router.navigateByUrl('/login');
          }
        })
      );
    }
  
}
