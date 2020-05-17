import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root',
})
export class UsuarioService {
	usuario: UsuarioModel;
	token: string;
	menu: any[] = [];

	constructor(
		public http: HttpClient,
		public subirArchivoService: SubirArchivoService
	) {
		this.cargarStorage();
	}

	renuevaToken() {
		let url = URL_SERVICIOS + '/login/renuevatoken';
		url += '?token=' + this.token;

		return this.http.get(url).pipe(
			map((resp: any) => {
				this.token = resp.token;
				localStorage.setItem('token', this.token);
				return true;
			}),
			catchError(err => {
				Swal.fire('No se pudo renovar token', 'No fue posible renovar token', 'error');
				this.logout();
				throw err;
			})
		);
	}

	actualizarUsuario(usuario: UsuarioModel) {
		const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
		return this.http.put(url, usuario).pipe(
			map((resp: any) => {
				if (usuario._id === this.usuario._id) {
					const usu = resp.usuario;
					this.guardarStorage(usu._id, this.token, usu, this.menu);
				}
				Swal.fire('Usuario actualizado', usuario.nombre, 'success');
				return true;
			}),
			catchError(err => {
				console.log(err.error.mesaje);
				Swal.fire(err.error.mesaje, err.error.errors.message, 'error');
				throw (err);
			})
		);
	}

	crearUsuario(usuario: UsuarioModel) {
		const url = `${URL_SERVICIOS}/usuario`;
		return this.http.post(url, usuario).pipe(
			map((response: any) => {
				Swal.fire('Usuario creado', usuario.email, 'success');
				return response.usuario;
			}),
			catchError(err => {
				console.log(err.error.mesaje);
				Swal.fire(err.error.mesaje, err.error.errors.message, 'error');
				throw (err);
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
				console.log('login usuario: ', res);

				this.guardarStorage(res.id, res.token, res.usuario, res.menu);
				return true;
			}),
			catchError(err => {
				console.log(err.error.mesaje);
				Swal.fire('Error en el login', err.error.mesaje, 'error');
				throw (err);
			})
		);
	}

	loginGoogle(token: string) {
		const url = `${URL_SERVICIOS}/login/google`;
		return this.http.post(url, { token }).pipe(
			map((res: any) => {
				console.log('login google: ', res);
				this.guardarStorage(res.id, res.token, res.usuario, res.menu);
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
		localStorage.removeItem('menu');
		window.location.href = '#/login';
	}

	cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService
			.subirArchivo(archivo, 'usuarios', id)
			.then((resp: any) => {
				this.usuario.img = resp.usuario.img;
				Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
				this.guardarStorage(id, this.token, this.usuario, this.menu);
			})
			.catch((resp) => {
				console.log(resp);
			});
	}

	cargarUsuarios(desde: number = 0) {
		const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
		return this.http.get(url);
	}

	buscarUsuarios(termino: string) {
		const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
		return this.http.get(url).pipe(map((res: any) => res.usuarios));
	}

	borrarUsuario(id: string) {
		const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
		return this.http.delete(url);
	}

	private cargarStorage() {
		if (localStorage.getItem('token')) {
			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse(localStorage.getItem('usuario'));
			this.menu = JSON.parse(localStorage.getItem('menu'));
		} else {
			this.token = '';
			this.usuario = null;
			this.menu = [];
		}
	}

	private guardarStorage(
		id: string,
		token: string,
		usuario: UsuarioModel,
		menu: any
	): void {
		localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));
		localStorage.setItem('menu', JSON.stringify(menu));
		this.usuario = usuario;
		this.token = token;
		this.menu = menu;
	}
}
