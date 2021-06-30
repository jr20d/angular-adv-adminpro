import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './accoun-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

//Dashboard
const childRutes: Routes = [
  { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
  { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de la cuenta'} },
  { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'observables', component: RxjsComponent, data: {titulo: 'RxJs'} },
  { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'} },

  //Mantenimientos
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Usuarios'} },
  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medicos'} },

  //Busquedas globales
  {path: ':busqueda', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutesModule { }
