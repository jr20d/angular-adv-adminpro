import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup | any;
  private _usuario: Usuario | undefined;
  public imagenSubir: File | any;
  public imgTemp: string = '';

  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private fileService: FileUploadService) {
      this._usuario = usuarioService.usuario;
      this.imgTemp = this._usuario?.imagenUrl() || '';
    }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm?.value)
    .subscribe((resp: any) =>{
      const {nombre, email} = resp.usuarioActualizado;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire({
        title: 'Guardado',
        text: 'Los cambios fueron guardados',
        icon: 'success'
      });
    }, (err) =>{
      Swal.fire({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });
  }

  cambiarImagen(file: any){

    this.imagenSubir = file.files[0];

    if (!this.imagenSubir){
      this.imgTemp = this.usuario.imagenUrl() || '';
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
    this.fileService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => {
      if (img.ok){
        this.usuario.imagen = img.nombreArchivo;
        Swal.fire({
          title: 'Guardado',
          text: 'La imagen fué actualizada',
          icon: 'success'
        });
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

  get usuario(): Usuario{
    return this._usuario || new Usuario('', '');
  }

  set usuario(_usuario: Usuario){
    this._usuario = _usuario || new Usuario('', '');
  }
}
