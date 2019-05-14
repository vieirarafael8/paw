import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reserva } from '../models/reserva.model';
import { HttpClient } from '@angular/common/http';
import { TipoEspaco } from '../enums/tipoEspaco';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';
import { Router } from '@angular/router';
import { Estado } from '../enums/estado';

import {environment} from '../../environments/environment';
import { Espaco } from '../models/espaco.model';
import { EstadoEspaco } from '../enums/estadoEspaco';

const BACKEND_URL = environment.apiUrl + '/espacos/';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private espacos: Espaco[] = [];
  private espacosUpdated = new Subject<{reservas: Espaco[], espacoCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}


  getEspacos(espacosPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${espacosPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; espacos: any; maxEspacos: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((espacosData) => {
        return {
          espacos: espacosData.espacos.map(espaco => {
            return {
              id: espaco._id,
              tipoEspaco: espaco.tipoEspaco,
              numComp: espaco.numComp,
              numOpenspace: espaco.numOpenspace,
              numSalaReuniao: espaco.numSalaReuniao,
              numSalaFormacao: espaco.numSalaFormacao,
              estadoEspaco: espaco.estadoEspaco,
              creator: espaco.creator,
              taxaSecretaria: espaco.taxaSecretaria,
              taxaTele: espaco.taxaTele,
              taxaCorreio: espaco.taxaCorreio,
              taxaInternet: espaco.taxaInternet,
              taxaReuniao: espaco.taxaReuniao,
              taxaFormacao: espaco.taxaFormacao
            };
          }),
          maxEspacos: espacosData.maxEspacos
        };
      })
    )
      .subscribe(transformedEspacosData => {
        this.espacos = transformedEspacosData.espacos;
        this.espacosUpdated.next({
          reservas: [...this.espacos],
          espacoCount: transformedEspacosData.maxEspacos
        });
      });
  }


  addEspaco(
    tipoEspaco: TipoEspaco,
    numComp: number,
    numOpenspace: number,
    numSalaReuniao: number,
    numSalaFormacao: number,
    estadoEspaco: EstadoEspaco,
    creator: string,
    taxaSecretaria: number,
    taxaTele: number,
    taxaCorreio: number,
    taxaInternet: number,
    taxaReuniao: number,
    taxaFormacao: number,
  ) {
    const espaco: Espaco = {
      id: null,
      tipoEspaco,
      numComp,
      numOpenspace,
      numSalaReuniao,
      numSalaFormacao,
      estadoEspaco,
      creator: null,
      taxaSecretaria,
      taxaTele,
      taxaCorreio,
      taxaInternet,
      taxaReuniao,
      taxaFormacao
    };
    this.http.post<{ message: string, espacoId: string }>(BACKEND_URL, espaco)
    .subscribe(responseData => {
        this.router.navigate(['/']);
    });

  }
  deleteEspaco(espacoId: string) {
    return this.http.delete(BACKEND_URL + espacoId);
  }
}
