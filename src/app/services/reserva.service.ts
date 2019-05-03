import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reserva } from '../models/reserva.model';
import { HttpClient } from '@angular/common/http';
import { TipoEspaco } from '../enums/tipoEspaco';



@Injectable({ providedIn: 'root' })
export class ReservaService {
  private reservas: Reserva[] = [];
  private reservasUpdated = new Subject<Reserva[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; reservas: Reserva[] }>(
        'http://localhost:3000/api/reservas'
      )
      .subscribe(reservasData => {
        this.reservas = reservasData.reservas;
        this.reservasUpdated.next([...this.reservas]);
      });
  }

  getPostUpdateListener() {
    return this.reservasUpdated.asObservable();
  }

  addReserva(
    tipoEspaco: TipoEspaco,
    numComp: number,
    dataInicio: Date,
    dataFim: Date,
    tele: boolean,
    correio: boolean,
    internet: boolean
  ) {
    const reserva: Reserva = {
      tipoEspaco: tipoEspaco,
      numComp: numComp,
      dataInicio: dataInicio,
      dataFim: dataFim,
      tele: tele,
      correio: correio,
      internet: internet
    };
    this.http.post<{ message: string }>('http://localhost:3000/api/reservas', reserva).subscribe(responseData => {
        console.log(responseData.message);
        this.reservas.push(reserva);
        this.reservasUpdated.next([...this.reservas]);
    });
  }
}
