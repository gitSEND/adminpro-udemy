import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioModel } from '../../models/usuario.model';
import { MedicoModel } from '../../models/medico.model';
import { HospitalModel } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  medicos: MedicoModel[] = [];
  hospitales: HospitalModel[] = [];

  constructor(public activateRoute: ActivatedRoute, public http: HttpClient) {
    activateRoute.params.subscribe((params) => {
      const termino = params.termino;
      this.buscar(termino);
    });
  }

  ngOnInit(): void {}

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
