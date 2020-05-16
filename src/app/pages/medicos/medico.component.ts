import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalModel } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { MedicoService } from '../../services/medico/medico.service';
import { MedicoModel } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  hospitales: HospitalModel[] = [];
  medico: MedicoModel = new MedicoModel('', '', '', '', '');
  hospital: HospitalModel = new HospitalModel('');

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activateRoute.params.subscribe((params) => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this._hospitalService
      .cargarHospitales()
      .subscribe((hospitales) => (this.hospitales = hospitales));

    this._modalUploadService.notificacion.subscribe(
      (data) => (this.medico.img = data.medico.img)
    );
  }

  guardarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((medico) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(idHospital: string) {
    this._hospitalService
      .obtenerHospital(idHospital)
      .subscribe((hospital) => (this.hospital = hospital));
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe((medico) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostarModal('medicos', this.medico._id);
  }
}
