import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/service/busquedas.service';
import { HospitalesService } from 'src/app/service/hospitales.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSub$: Subscription = new Subscription();

  constructor(private hospitalService: HospitalesService,
    private modalService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSub$ = this.modalService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSub$.unsubscribe();
  }

  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
    .subscribe(hospitales =>{
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
    .subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    });
  }

  eliminarHospital(hospital: Hospital){
    this.hospitalService.eliminarHospital(hospital._id)
    .subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }

  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
      title: 'Agregar Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if (value && value.trim().length > 0){
      this.hospitalService.crearHospital(value)
      .subscribe((resp: any) =>{
        this.hospitales.push(resp.hospital);
        Swal.fire('Creado', value, 'success');
      });
    }
  }

  abrirModal(hospital: Hospital){
    this.modalService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(buscar: string){
    if (buscar.trim().length === 0){
      this.cargarHospitales();
      return;
    }

    this.busquedaService.bucar('hospitales', buscar)
      .subscribe((hospitales: any) =>{
        this.hospitales = hospitales;
      });
  }
}
