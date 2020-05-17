import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
	providedIn: 'root'
})
export class RenuevaTokenGuard implements CanActivate {

	constructor(public _usuarioService: UsuarioService) {

	}

	canActivate(): Promise<boolean> | boolean {
		const token = this._usuarioService.token;
		const payload = JSON.parse(atob(token.split('.')[1]));
		const expirado = this.expirado(payload.exp);

		if (expirado) {
			this._usuarioService.logout();
			return false;
		}

		return this.verificaRenueva(payload.exp);
	}


	verificaRenueva(fechaExp: number): Promise<boolean> {

		return new Promise((resolve, reject) => {
			const tokenExp = new Date(fechaExp * 1000);
			const ahora = new Date();

			ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));
			console.log(tokenExp);
			console.log(ahora);

			if (tokenExp.getTime() > ahora.getTime()) {
				resolve(true);
			} else {
				this._usuarioService.renuevaToken().subscribe(
					() => resolve(true),
					() => {
						this._usuarioService.logout();
						reject(false);
					}
				);
			}
		});
	}


	expirado(fechaExp: number) {
		const ahora = new Date().getTime() / 1000;

		if (fechaExp < ahora) {
			return true;
		} else {
			return false;
		}
	}

}
