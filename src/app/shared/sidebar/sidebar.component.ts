import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/service/sidebar.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  private _menuItems: any;
  private _usuario: Usuario;

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuariosService) {
    this._menuItems = this.sidebarService.menu;
    this._usuario = usuarioService.usuario || new Usuario('', '');
  }

  ngOnInit(): void {
  }

  get menuItems(): any[]{
    return this._menuItems;
  }

  get usuario(): Usuario{
    return this._usuario;
  }  
}