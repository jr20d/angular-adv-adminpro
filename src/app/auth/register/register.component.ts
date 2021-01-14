import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuariosService } from 'src/app/service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmited: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['Josué', [Validators.required, Validators.minLength(3)]],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordIguales('password', 'password2')
  });


  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.usuarioService.validarToken() && localStorage.getItem('token')){
      this.router.navigateByUrl('/');
    }
  }

  crearUsuario(): void{
    console.log(this.registerForm.value);

    if (this.registerForm.invalid){
      return;
    }

    //Realizar envío de formulario
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(resp => {
      this.router.navigateByUrl('/');
    }, (err) => {
      // Si sucede un error
      Swal.fire({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });
  }

  campoNoValido(campo: string): boolean{
    if (this.registerForm.get(campo)?.invalid && !this.formSubmited){
      return true;
    }
    else{
      return false;
    }
  }

  passwordsNoValidas(): boolean{
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return (pass1 !== pass2) && !this.formSubmited;
  }

  aceptaTerminos(): boolean{
    return !this.registerForm.get('terminos')?.value && !this.formSubmited;
  }

  passwordIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1 = formGroup.get(pass1Name);
      const pass2 = formGroup.get(pass2Name);

      if (pass1?.value === pass2?.value){
        pass2?.setErrors(null);
      }
      else{
        pass2?.setErrors({noEsIgual: true});
      }
    }
  }
}
