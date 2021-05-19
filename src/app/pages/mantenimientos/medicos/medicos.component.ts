import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/service/busquedas.service';
import { MedicosService } from 'src/app/service/medicos.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  constructor(private medicosService: MedicosService,
    private modalService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSub$: Subscription = new Subscription();

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSub$ = this.modalService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSub$.unsubscribe();
  }

  private cargarMedicos(){
    this.cargando = true;

    this.medicosService.listadoMedicos()
    .subscribe(medicos =>{
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  abrirModal(medico: Medico){
    this.modalService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(busqueda: string){
    if (!busqueda || busqueda.trim().length === 0){
      this.cargarMedicos();
    }

    this.busquedaService.bucar('medicos', busqueda)
    .subscribe((resp: any) =>{
      this.medicos = resp;
    });
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    })
    .then((restult) => {
      if (restult.value){
        this.medicosService.eliminarMedico(medico._id)
        .subscribe(resp =>{
          this.cargarMedicos();
          Swal.fire({
            title: 'Médico borrado',
            text: `${medico.nombre} fué borrado correctamente`,
            icon: 'success'
          })
        });
      }
    });
  }
}