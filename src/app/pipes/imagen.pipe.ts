import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    
    if (img?.includes('.googleusercontent.com')){
      return img;
    }
    else{
        const urlImagen = `${base_url}/uploads/${tipo}/`;
        return (img) ? urlImagen.concat(img) : urlImagen.concat('no-img.jpg');
    }
  }

}
