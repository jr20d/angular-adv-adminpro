import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/service/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({busqueda}) =>{
      this.busquedaGlobal(busqueda);
    });
  }

  private busquedaGlobal(busqueda: string){
    this.busquedaService.busquedaGlobal(busqueda)
    .subscribe((resp: any) =>{
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
