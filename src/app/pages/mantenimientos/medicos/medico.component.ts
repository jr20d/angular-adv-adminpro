import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalesService } from 'src/app/service/hospitales.service';
import { MedicosService } from 'src/app/service/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup | any;

  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico | any;
  public hospitalSeleccionado: Hospital | any;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalesService,
    private medicoService: MedicosService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hid: ['', Validators.required]
    });
    this.cargarHospitales();

    this.medicoForm.get('hid').valueChanges
    .subscribe((hospitalId: string) => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);      
    });
  }

  private cargarMedico(id: string){
    if (id === 'nuevo'){
      return;
    }
    this.medicoService.obtenerMedicoPorId(id)
    .subscribe(medico =>{
      if (!medico){
        return this.router.navigateByUrl('/mantenimiento/medicos');
      }
      const {nombre, hospital} = medico as Medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({
        nombre: nombre,
        hid: (hospital) ? hospital._id : ''
      });
      this.hospitalSeleccionado = hospital;
      return;
    });
  }
  
  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value;
    if (this.medicoSeleccionado){
      const medico = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(medico)
      .subscribe((resp: any) =>{
        Swal.fire({
          title: 'Actualizado',
          text: `${nombre} ha sido actualizado correctamente`,
          icon: 'success'
        });
      });
    }
    else{
      this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe((resp: any) =>{
        Swal.fire({
          title: 'Creado',
          text: `${nombre} ha sido creado correctamente`,
          icon: 'success'
        });
        this.router.navigateByUrl(`/mantenimiento/medico/${resp.medico._id}`);
      });
    }
  }
}
