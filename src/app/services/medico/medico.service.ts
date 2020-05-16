import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { MedicoModel } from '../../models/medico.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  buscarMedicos(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).pipe(map((res: any) => res.medicos));
  }

  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this.usuarioService.token}`;
    return this.http.delete(url).pipe(
      map((resp) => {
        Swal.fire(
          'Medico borrado',
          'La operación se realizó con éxito',
          'success'
        );
        return resp;
      })
    );
  }

  guardarMedico(medico: MedicoModel): Observable<MedicoModel> {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;
      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          Swal.fire('Médico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          Swal.fire('Médico creado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }
}
