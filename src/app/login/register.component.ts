import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function initPlugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {
    initPlugins();

    this.form = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.form.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true,
    });
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true,
      };
    };
  }
  registrarUsuario() {
    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.condiciones) {
      Swal.fire('Importante!', 'Debe seleccionar las condiciones', 'warning');
      return;
    }

    const usuario = new UsuarioModel(
      this.form.value.nombre,
      this.form.value.correo,
      this.form.value.password
    );

    this.usuarioService
      .crearUsuario(usuario)
      .subscribe(() => this.router.navigate(['/login']));
  }
}
