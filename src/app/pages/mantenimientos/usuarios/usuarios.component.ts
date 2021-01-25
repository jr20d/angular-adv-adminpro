import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { RolUsuario } from 'src/app/interfaces/rol-usuario';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/service/busquedas.service';
import { ModalImagenService } from 'src/app/service/modal-imagen.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  private usuariosTemp: Usuario[] = [];
  public pagina: number = 1;
  private resultados: number = 0;
  public cargando: boolean = true;
  private usuariosSubs$: Subscription = new Subscription();
  private imgSub$: Subscription = new Subscription();

  constructor(private usuarioService: UsuariosService,
    private busquedaService: BusquedasService,
    private modalService: ModalImagenService){}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSub$ = this.modalService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe((img:any) => {
      if (img.ok){
        this.cargarUsuarios();
      }
    });
  }

  ngOnDestroy(): void {
    this.usuariosSubs$.unsubscribe();
    this.imgSub$.unsubscribe();
  }

  get cantResultados(): number{
    return this.resultados;
  }

  private cargarUsuarios(){
    this.cargando = true;
    this.usuariosSubs$ = this.usuarioService.cargarUsuario((this.pagina - 1) * 5)
    .subscribe(({total, usuarios}) =>{
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.resultados = total / 5;
      this.cargando = false;

      if (this.resultados.toString().includes('.')){
        this.resultados = Number.parseInt(this.resultados.toString().split('.')[0]) + 1;
      }
    });
  }

  cambiarPagina(valor: number): void{
    if (this.pagina > 0 && this.pagina <= this.resultados){
      this.pagina += valor;
    }
    
    if (this.pagina === 0){
      this.pagina = 1;
    }
    else if (this.pagina > this.resultados){
      this.pagina = this.resultados;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string){
    if (termino.trim().length === 0){
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaService.bucar('usuarios', termino)
    .subscribe(resp => {
      this.usuarios = resp;
    });
  }

  eliminarUsuario(usuario: Usuario){
    const uid = this.usuarioService.usuario?.uid;
    
    if (uid === usuario.uid){
      return Swal.fire({
        title: 'Error',
        text: 'No puede borrar su propio usuario',
        icon: 'error'
      });
    }

    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar al usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then(result =>{
      if (result.value){
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe((resp: any) => {
          this.cargarUsuarios();
          Swal.fire({
            title: 'Borrado',
            text: resp.msg,
            icon: 'success'
          });
        });
      }
    });
  }

  cambiarRol(usuario: Usuario){
    const userActualizado: RolUsuario = {
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      uid: usuario.uid
    }
    this.usuarioService.cambiarUsuario(userActualizado).subscribe();
  }

  abrirModal(usuario: Usuario){
    this.modalService.abrirModal('usuarios', usuario.uid, usuario.imagen);
  }
}
