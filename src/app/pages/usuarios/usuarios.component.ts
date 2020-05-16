import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styles: [],
})
export class UsuariosComponent implements OnInit {
	usuarios: UsuarioModel[] = [];
	desdee = 0;
	totalRegistros = 0;
	cargando: boolean = true;

	constructor(
		public usuarioService: UsuarioService,
		public modalUploadService: ModalUploadService
	) { }

	ngOnInit(): void {
		this.cargarUsuarios();
		this.modalUploadService.notificacion.subscribe(() => this.cargarUsuarios());
	}

	mostrarModal(id: string) {
		this.modalUploadService.mostarModal('usuarios', id);
	}

	cargarUsuarios() {
		this.cargando = true;
		this.usuarioService.cargarUsuarios(this.desdee).subscribe((res: any) => {
			this.totalRegistros = res.total;
			this.usuarios = res.usuarios;
			this.cargando = false;
		});
	}

	cambiarDesde(valor: number) {
		const desde = this.desdee + valor;

		if (desde >= this.totalRegistros) {
			return;
		}

		if (desde < 0) {
			return;
		}
		console.log(desde);
		this.desdee += valor;
		this.cargarUsuarios();
	}

	buscarUsuairo(termino: string) {
		if (!termino) {
			this.cargarUsuarios();
			return;
		}

		this.cargando = true;
		this.usuarioService
			.buscarUsuarios(termino)
			.subscribe((usuarios: UsuarioModel[]) => {
				this.usuarios = usuarios;
				this.cargando = false;
			});
	}

	borrarUsuario(usuario: UsuarioModel) {
		if (usuario._id === this.usuarioService.usuario._id) {
			Swal.fire(
				'No puede borrar usuario',
				'No se puede borrar a si mismo',
				'error'
			);
			return;
		}

		Swal.fire({
			title: 'Está seguro?',
			text: 'Esta apunto de borrar a:' + usuario.nombre,
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Si, elimínalo!',
		}).then((result) => {
			if (result.value) {
				this.usuarioService.borrarUsuario(usuario._id).subscribe(() => {
					this.cargarUsuarios();
					Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
				});
			}
		});
	}

	guardarUsuario(usuario: UsuarioModel) {
		this.usuarioService.actualizarUsuario(usuario).subscribe();
	}
}
