import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { MedicoModel } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  medicos: MedicoModel[] = [];

  constructor(public medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService
      .cargarMedicos()
      .subscribe((resp) => (this.medicos = resp));
  }

  buscarMedico(termino: string) {
    if (!termino) {
      this.cargarMedicos();
      return;
    }
    this.medicoService
      .buscarMedicos(termino)
      .subscribe((res) => (this.medicos = res));
  }

  borrarMedico(medico: MedicoModel) {
    this.medicoService
      .borrarMedico(medico._id)
      .subscribe(() => this.cargarMedicos());
  }
}
