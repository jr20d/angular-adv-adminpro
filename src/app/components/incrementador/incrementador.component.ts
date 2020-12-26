import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valor') progreso: number = 0;
  @Input('clase') btnClass: string = "btn-primary";

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  setProgreso(progreso: number){
    if (this.progreso >= 100 && progreso > 0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    else if(this.progreso <= 0 && progreso < 0){
      this.valorSalida.emit(0)
      return this.progreso = 0;
    }
    this.progreso += progreso;
    this.valorSalida.emit(this.progreso);
    return this.progreso;
  }

  onChange(nuevoValor: number){
    if (nuevoValor > 100){
      this.progreso = 100;
    }
    else if (nuevoValor < 0){
      this.progreso = 0;
    }
    else{
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit(this.progreso);
  }
}
