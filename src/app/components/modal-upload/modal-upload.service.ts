import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalUploadService {
  tipoArchivo: string;
  id: string;
  oculto: string = 'oculto';
  notificacion = new EventEmitter<any>();

  constructor() {}

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipoArchivo = null;
    this.id = null;
  }

  mostarModal(tipoArchivo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipoArchivo = tipoArchivo;
  }
}
