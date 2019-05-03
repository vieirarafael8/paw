import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reserva } from '../models/reserva.model';
import { HttpClient } from '@angular/common/http';
import { TipoEspaco } from '../enums/tipoEspaco';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';


@Injectable({ providedIn: 'root' })
export class ReservaService {
  private reservas: Reserva[] = [];
  private reservasUpdated = new Subject<Reserva[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; reservas: any }>(
        'http://localhost:3000/api/reservas'
      )
      .pipe(map((reservasData) => {
        return reservasData.reservas.map(reserva => {
          return {
            tipoEspaco: reserva.tipoEspaco,
            numComp: reserva.numComp,
            dataInicio: reserva.dataInicio,
            dataFim: reserva.dataFim,
            tele: reserva.tele,
            correio: reserva.correio,
            internet: reserva.internet,
            id: reserva._id
          };
        });
      }))
      .subscribe(transformedReservas => {
        this.reservas = transformedReservas;
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
      id: null,
      tipoEspaco: tipoEspaco,
      numComp: numComp,
      dataInicio: dataInicio,
      dataFim: dataFim,
      tele: tele,
      correio: correio,
      internet: internet
    };
    this.http.post<{ message: string, reservaId: string }>('http://localhost:3000/api/reservas', reserva)
    .subscribe(responseData => {
        const id = responseData.reservaId;
        reserva.id = id;
        this.reservas.push(reserva);
        this.reservasUpdated.next([...this.reservas]);
    });

  }
  deleteReserva(reservaId: string) {
    this.http.delete('http://localhost:3000/api/reservas/' + reservaId)
    .subscribe(() => {
      const updatedReservas = this.reservas.filter(reserva => reserva.id !== reservaId);
      this.reservas = updatedReservas;
      this.reservasUpdated.next([...this.reservas]);
    });
  }
}
