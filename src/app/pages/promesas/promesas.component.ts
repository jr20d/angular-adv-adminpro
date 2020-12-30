import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*const promesa = new Promise((resolve, reject) =>{
      if (false){
        resolve("Hola Mundo");
      }
      else{
        reject('Algo salió mal');
      }
    });
    promesa.then((mensaje) =>{
      console.log(mensaje);
      console.log("Fin promesa");
    })
    .catch((error) =>{
      console.log("Error en mi promesa: ", error);
      console.log("Fin promesa");
    });

    console.log("Fin del Init");
  }*/
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
  }

  private getUsuarios(): Promise<unknown> {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
  }

}
