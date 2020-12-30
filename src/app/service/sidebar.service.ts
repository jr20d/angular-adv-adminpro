import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _menu: any[] = [
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
  ];

  constructor() { }

  get menu(): any[]{
    return this._menu;
  }
}