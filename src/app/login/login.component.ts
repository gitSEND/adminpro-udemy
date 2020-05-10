import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { UsuarioModel } from '../models/usuario.model';

declare function initPlugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    initPlugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const usuario = new UsuarioModel(
      null,
      form.value.email,
      form.value.password
    );

    console.log('usuario de login', usuario);

    this.usuarioService
      .loginUsuario(usuario, form.value.recuerdame)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '433048843632-5rtcc3j6m7o03mv20pncuv3s9sng2mrn.apps.googleusercontent.com',
        cookipolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attarchSignin(document.getElementById('btngoogle'));
    });
  }

  attarchSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioService
        .loginGoogle(token)
        .subscribe(() => this.router.navigate(['/dashboard']));
    });
  }
}
