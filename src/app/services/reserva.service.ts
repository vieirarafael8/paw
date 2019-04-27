import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reserva } from '../models/reserva.model';

@Injectable({providedIn: 'root'})
export class ReservaService {
  private reservas: Reserva[] = [];
  private reservasUpdated = new Subject<Reserva[]>();

  getPosts() {
    return [...this.reservas];
  }

  getPostUpdateListener() {
    return this.reservasUpdated.asObservable();
  }

  addReserva(openspace: number, salareuniao: number, salaformacao: number, tele: boolean, correio: boolean, internet: boolean) {
    const reserva: Reserva = {openspace: openspace, salareuniao: salareuniao, salaformacao: salaformacao,
      tele: tele, correio: correio, internet: internet};
    this.reservas.push(reserva);
    this.reservasUpdated.next([...this.reservas]);
  }
}
