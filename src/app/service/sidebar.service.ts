import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _menu = [];

  cargarMenu(){
    let menuItem: string;
    menuItem = localStorage.getItem('menu')?.toString() || '';
    this._menu = JSON.parse(menuItem) || [];

    if (this._menu.length === 0){
      this.router.navigateByUrl("/login");
    }
  }

  /*private _menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/dashboard/progress'},
        {titulo: 'Gráficas', url: '/dashboard/grafica1'},
        {titulo: 'Promesas', url: '/dashboard/promesas'},
        {titulo: 'Obsevables', url: '/dashboard/observables'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/mantenimiento/usuarios'},
        {titulo: 'Hospitales', url: '/mantenimiento/hospitales'},
        {titulo: 'Médicos', url: '/mantenimiento/medicos'}
      ]
    }
  ];*/

  constructor(private router: Router) { }

  get menu(): any[]{
    return this._menu;
  }
}