import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map, reduce } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { Espaco } from '../models/espaco.model';
import { EstadoEspaco } from '../enums/estadoEspaco';
import { Estado } from '../enums/estado';

const BACKEND_URL_ESPACOS = environment.apiUrl + '/espacos/';

@Injectable({ providedIn: 'root' })
export class EspacoService {
  private espacos: Espaco[] = [];
  private espaco: Espaco;
  private espacosUpdated = new Subject<{espacos: Espaco[], espacoCount: number}>();
  espacoExist = false;

  constructor(private http: HttpClient, private router: Router) {}

  getEspacos() {
    return this.http
      .get<{ message: string; espacos: any; maxEspacos: number }>(
        BACKEND_URL_ESPACOS + 'admin'
      )
      .pipe(
        map((espacosData) => {
        return {
          espacos: espacosData.espacos.map(espaco => {
            return {
              _id: espaco.id,
              numSecretOpenSpace: espaco.numSecretOpenSpace,
              numSalaReuniao: espaco.numSalaReuniao,
              numSalaFormacao: espaco.numSalaFormacao,
              estadoEspaco: espaco.estadoEspaco,
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
          espacos: [...this.espacos],
          espacoCount: transformedEspacosData.maxEspacos
        });
      });
  }

  getSecretarias() {
    return this.http
      .get(BACKEND_URL_ESPACOS + 'secret');
  }

  getSalaReuniao() {
    return this.http
      .get(BACKEND_URL_ESPACOS + 'reuniao');
  }

  getSalaFormacao() {
    return this.http
      .get(BACKEND_URL_ESPACOS + 'formacao');
  }

  getCountClientes() {
    return this.http
      .get(BACKEND_URL_ESPACOS + 'clientes');
  }
  getCountClientesR() {
    return this.http
      .get(BACKEND_URL_ESPACOS + 'clientesR');
  }
  getCountClientesF() {
    return this.http
      .get(BACKEND_URL_ESPACOS + 'clientesF');
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
    }>(BACKEND_URL_ESPACOS + id);
  }

  getEspacoLimit() {
    return this.http.get(BACKEND_URL_ESPACOS + 'admin');
  }

  getSecretLimit() {
    return this.http.get(BACKEND_URL_ESPACOS + 'secret');
  }
  getReuniaoLimit() {
    return this.http.get(BACKEND_URL_ESPACOS + 'reuniao');
  }
  getFormacaoLimit() {
    return this.http.get(BACKEND_URL_ESPACOS + 'formacao');
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
    this.http.post<{ message: string, espacoId: string }>(BACKEND_URL_ESPACOS, espaco)
    .subscribe(responseData => {
        this.router.navigate(['/auth/admin']);
    });
    this.espacoExist = true;
  }
  deleteEspaco(espacoId: string) {
    return this.http.delete(BACKEND_URL_ESPACOS + espacoId);
  }

}
