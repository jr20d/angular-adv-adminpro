import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  private _usuario: Usuario | undefined;

  constructor(private usuarioService: UsuariosService) {
    this._usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logout(): void{
    this.usuarioService.logout();
  }

  get usuario(): Usuario{
    return this._usuario || new Usuario('', '');
  }
}
