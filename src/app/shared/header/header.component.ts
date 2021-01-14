import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.usuarioService.logout();
  }
}
