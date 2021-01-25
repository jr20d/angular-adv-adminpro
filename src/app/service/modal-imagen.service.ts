import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  private _tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  private _imagen: string = '';
  private _id: string = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter();

  constructor() { }

  get ocultarModal(): boolean{
    return this._ocultarModal;
  }

  get imagen(): string{
    return this._imagen;
  }

  get tipo(){
    return this._tipo;
  }

  get id(): string{
    return this._id;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = "no-img"): void{
    this._ocultarModal = false;
    this._tipo = tipo;
    this._id = id;

    if (img.includes('https')){
      this._imagen = img;
    }
    else{
      this._imagen = `${base_url}/uploads/usuarios/${img || 'no-img'}`;
    }
  }

  cerrarModal(): void{
    this._ocultarModal = true;
  }
}