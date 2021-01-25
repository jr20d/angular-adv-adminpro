import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuariosService } from 'src/app/service/usuarios.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  private auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
    if (this.usuarioService.validarToken()) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    if (this.loginForm.invalid){
      Swal.fire({
        title: 'Error',
        text: 'Asegurese de ingresar usuario y contraseña',
        icon: 'error'
      });
      return;
    }

    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        console.log('Usuario logeado');
        //TODO: Mover al dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.msg,
          icon: 'error'
        });
      })
  }

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token)
          .subscribe(resp => {
            //Navegar al dashboard
            this.ngZone.run(() =>{
              this.router.navigateByUrl('/');
            });            
          });
      }, (error: any) => {
        console.log(JSON.stringify(error.error, undefined, 2));
      });
  }
}
