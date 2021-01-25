import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir: File | any;
  public imgTemp: string = '';

  constructor(public modalService: ModalImagenService,
    private fileService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = '';
    this.modalService.cerrarModal();
  }

  cambiarImagen(file: any){

    this.imagenSubir = file.files[0];

    if (!this.imagenSubir){
      this.imgTemp = '';
    }
    else{
      const reader = new FileReader();
      reader.readAsDataURL(file.files[0]);
      reader.onloadend = () =>{
        this.imgTemp = reader.result?.toString() || '';
      }
    }
  }

  subirImagen(){
    const id = this.modalService.id;
    const imagen = this.modalService.imagen;
    const tipo = this.modalService.tipo;

    this.fileService.actualizarFoto(this.imagenSubir, tipo, id)
    .then(img => {
      if (img.ok){
        Swal.fire({
          title: 'Guardado',
          text: 'La imagen fué actualizada',
          icon: 'success'
        });

        this.modalService.nuevaImagen.emit(img);

        this.cerrarModal();
      }
      else{
        Swal.fire({
          title: 'Error',
          text: img.msg,
          icon: 'error'
        });
      }
    });
  }
}