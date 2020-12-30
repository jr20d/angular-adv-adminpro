import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {
  private intervalSubs: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    /*this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Subs: ', valor),
      error => console.warn('Error: ', error),
      () => console.info("Obs terminado")
    );*/

    this.intervalSubs = this.retornaIntervalo()
    .subscribe(console.log);
  }

  ngOnDestroy(): void{
    this.intervalSubs.unsubscribe();
  }

  private retornaIntervalo(): Observable<number>{
    return interval(500)
    .pipe(
      //take(10),
      map(valor => ++valor),
      filter(valor => valor % 2 === 0)
    );
  }

  private retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>(observer =>{
      const intervalo = setInterval(() =>{
        i++;
        observer.next(i);

        if (i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2){
          observer.error("i llegó al valor de 2");
        }
      }, 1000);
    });
  }
}
