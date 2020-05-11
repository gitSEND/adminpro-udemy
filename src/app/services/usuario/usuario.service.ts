import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: UsuarioModel;
  token: string;

  constructor(
    public http: HttpClient,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  actualizarUsuario(usuario: UsuarioModel) {
    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        // this.usuario = resp.usuario;
        const usu = resp.usuario;
        this.guardarStorage(usu._id, this.token, usu);
        Swal.fire('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );
  }

  crearUsuario(usuario: UsuarioModel) {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario).pipe(
      map((response: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');

        return response.usuario;
      })
    );
  }

  loginUsuario(usuario: UsuarioModel, recuerdame: boolean) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${URL_SERVICIOS}/login`;

    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      })
    );
  }

  loginGoogle(token: string) {
    const url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      })
    );
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '#/login';
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }

  private cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  private guardarStorage(
    id: string,
    token: string,
    usuario: UsuarioModel
  ): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
}
