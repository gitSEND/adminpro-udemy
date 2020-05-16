import { Component, OnInit } from '@angular/core';
import { HospitalModel } from '../../models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  hospitales: HospitalModel[] = [];

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(() =>
      this.cargarHospitales()
    );
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((resp) => (this.hospitales = resp));
  }

  buscarHospital(termino: string) {
    if (!termino) {
      return;
    }
    this.hospitalService
      .buscarHospital(termino)
      .subscribe((resp) => (this.hospitales = resp));
  }

  guardarHospital(hospital: HospitalModel) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: HospitalModel) {
    this.hospitalService
      .borrarHospital(hospital._id)
      .subscribe(() => this.cargarHospitales());
  }

  async crearHospital() {
    const { value: hospital } = await Swal.fire({
      title: 'Registrar Hospital',
      text: 'Ingreso nombre del hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre de hospital';
        }
      },
    });
    console.log(hospital);
    this.hospitalService
      .crearHospital(hospital)
      .subscribe(() => this.cargarHospitales());
  }

  actualizarImagen(hospital: HospitalModel) {
    this.modalUploadService.mostarModal('hospitales', hospital._id);
  }
  mostrarModal(id: string) {}
}
