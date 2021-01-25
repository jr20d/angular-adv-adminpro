import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private _titulo: string = "";
  private tituloSubs$: Subscription = new Subscription();

  constructor(private router: Router) {
    this.tituloSubs$ = this.argumentosRuta()
    .subscribe(({titulo}) => {
      this._titulo = titulo;
      document.title = titulo;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void{
    this.tituloSubs$.unsubscribe();
  }

  get titulo(): string{
    return this._titulo;
  }

  private argumentosRuta(): Observable<any>{
    return this.router.events
    .pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
