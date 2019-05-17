import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reserva } from '../models/reserva.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { Espaco } from '../models/espaco.model';
import { EstadoEspaco } from '../enums/estadoEspaco';

const BACKEND_URL = environment.apiUrl + '/espacos/';

@Injectable({ providedIn: 'root' })
export class EspacoService {
  private espacos: Espaco[] = [];
  private espaco: Espaco;
  private espacosUpdated = new Subject<{espacos: Espaco[], espacoCount: number}>();
  private reservas: Reserva[] = [];
  private reservasUpdated = new Subject<{reservas: Reserva[]}>();


  constructor(private http: HttpClient, private router: Router) {}

  getEspacos(reservaPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${reservaPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; espacos: any; maxEspacos: number }>(
        BACKEND_URL + 'info/' + queryParams
      )
      .pipe(
        map((espacosData) => {
        return {
          espacos: espacosData.espacos.map(espaco => {
            return {
              numSecretOpenSpace: espaco.numSecretOpenSpace,
              numSalaReuniao: espaco.numSalaReuniao,
              numSalaFormacao: espaco.numSalaFormacao,
              estadoEspaco: espaco.estadoEspaco,
              taxaSecretaria: espaco.taxaSecretaria,
              taxaTele: espaco.taxaTele,
              taxaCorreio: espaco.taxaCorreio,
              taxaInternet: espaco.taxaInternet,
              taxaReuniao: espaco.taxaReuniao,
              taxaFormacao: espaco.taxaFormacao,
              };
          }),
          maxEspacos: espacosData.maxEspacos,
        };
      })
    )
      .subscribe(transformedEspacosData => {
        this.espacos = transformedEspacosData.espacos;
        this.espacosUpdated.next({
          espacos: [...this.espacos],
          espacoCount: transformedEspacosData.maxEspacos

        });
      });
  }

  getEspacoUpdateListener() {
    return this.espacosUpdated.asObservable();
  }


  getEspaco(id: string) {
    return this.http.get<{
      _id: string;
      numSecretOpenSpace: number,
      numSalaReuniao: number,
      numSalaFormacao: number,
      estadoEspaco: EstadoEspaco,
      taxaSecretaria: number,
      taxaTele: number,
      taxaCorreio: number,
      taxaInternet: number,
      taxaReuniao: number,
      taxaFormacao: number,
    }>(BACKEND_URL + id);
  }


  addEspaco(
    numSecretOpenSpace: number,
    numSalaReuniao: number,
    numSalaFormacao: number,
    estadoEspaco: EstadoEspaco,
    taxaSecretaria: number,
    taxaTele: number,
    taxaCorreio: number,
    taxaInternet: number,
    taxaReuniao: number,
    taxaFormacao: number,
  ) {
    const espaco: Espaco = {
      id: null,
      numSecretOpenSpace,
      numSalaReuniao,
      numSalaFormacao,
      estadoEspaco,
      taxaSecretaria,
      taxaTele,
      taxaCorreio,
      taxaInternet,
      taxaReuniao,
      taxaFormacao
    };
    this.http.post<{ message: string, espacoId: string }>(BACKEND_URL, espaco)
    .subscribe(responseData => {
        this.router.navigate(['/auth/admin']);
    });

  }
  deleteEspaco(espacoId: string) {
    return this.http.delete(BACKEND_URL + espacoId);
  }

  getReservas() {

    this.http
      .get<{ message: string; reservas: any; maxReservas: number }>(
        BACKEND_URL + 'lista'
      )
      .pipe(
        map((reservasData) => {
        return {
          reservas: reservasData.reservas.map(reserva => {
            return {
              id: reserva._id,
              tipoEspaco: reserva.tipoEspaco,
              numComp: reserva.numComp,
              dataInicio: reserva.dataInicio,
              dataFim: reserva.dataFim,
              tele: reserva.tele,
              correio: reserva.correio,
              internet: reserva.internet,
              estado: reserva.estado,
              creator: reserva.creator,
              custo: reserva.custo
            };
          }),
          maxReservas: reservasData.maxReservas
        };
      })
    )
      .subscribe(transformedReservasData => {
        this.reservas = transformedReservasData.reservas;
        this.reservasUpdated.next({
          reservas: [...this.reservas]
        });
      });
  }

  getReservaUpdateListener() {
    console.log(this.reservasUpdated);

    return this.reservasUpdated.asObservable();
  }
}
