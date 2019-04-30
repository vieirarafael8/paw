import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reserva } from '../models/reserva.model';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({providedIn: 'root'})
export class ReservaService {
  private reservas: Reserva[] = [];
  private reservasUpdated = new Subject<Reserva[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, reservas: Reserva[]}>('http://localhost:3000/api/reservas')
    .subscribe((reservasData) => {
    this.reservas = reservasData.reservas;
    this.reservasUpdated.next([...this.reservas]);
    });
  }

  getPostUpdateListener() {
    return this.reservasUpdated.asObservable();
  }

  addReserva(id: string, openspace: number, salareuniao: number, salaformacao: number,
    tele: boolean, correio: boolean, internet: boolean) {
    const reserva: Reserva = {id: null, openspace: openspace,
      salareuniao: salareuniao, salaformacao: salaformacao,
      tele: tele, correio: correio, internet: internet};
    this.reservas.push(reserva);
    this.reservasUpdated.next([...this.reservas]);
  }
}
