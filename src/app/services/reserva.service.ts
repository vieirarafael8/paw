import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoEspaco } from '../enums/tipoEspaco';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Estado } from '../enums/estado';
import {environment} from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

const BACKEND_URL_RESERVAS = environment.apiUrl + '/reservas/';


@Injectable({ providedIn: 'root' })
export class ReservaService {
  private reservas: Reserva[] = [];
  private reservasUpdated = new Subject<{reservas: Reserva[], reservaCount: number}>();
  private reservasUpdatedAdmin = new Subject<{reservas: Reserva[], reservaCount: number}>();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  getReservas(reservaPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${reservaPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; reservas: any; maxReservas: number }>(
        BACKEND_URL_RESERVAS + queryParams
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
          reservas: [...this.reservas],
          reservaCount: transformedReservasData.maxReservas
        });
      });

  }

  getAllReservas(reservaPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${reservaPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; reservas: any; maxReservas: number }>(
        BACKEND_URL_RESERVAS + 'allreservas/' + queryParams
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
        this.reservasUpdatedAdmin.next({
          reservas: [...this.reservas],
          reservaCount: transformedReservasData.maxReservas
        });
      });
  }


  getPostUpdateListener() {
    return this.reservasUpdated.asObservable();
  }

  getAdminUpdateListener() {
    return this.reservasUpdatedAdmin.asObservable();
  }

  getReserva(id: string) {
    return this.http.get<{
      _id: string;
      tipoEspaco: TipoEspaco;
      numComp: number;
      dataInicio: Date;
      dataFim: Date;
      tele: boolean;
      correio: boolean;
      internet: boolean;
      estado: Estado;
      creator: string;
      custo: number;
    }>(BACKEND_URL_RESERVAS + id);
  }

  getReservasTotalGasto() {
    return this.http.get(BACKEND_URL_RESERVAS + 'totalGasto');
  }


  addReserva(
    tipoEspaco: TipoEspaco,
    numComp: number,
    dataInicio: Date,
    dataFim: Date,
    tele: boolean,
    correio: boolean,
    internet: boolean,
    estado: Estado,
    custo: number
  ) {
    const reserva: Reserva = {
      id: null,
      tipoEspaco,
      numComp,
      dataInicio,
      dataFim,
      tele,
      correio,
      internet,
      estado,
      creator: null,
      custo
    };
    this.http.post<{ message: string, reservaId: string }>(BACKEND_URL_RESERVAS, reserva)
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });

  }

  updateEstado(id: string, estado: Estado) {
    const reservaData = {
      estado: estado,
      };
    return this.http
      .put(BACKEND_URL_RESERVAS + id, reservaData);
  }

  deleteReserva(reservaId: string) {
    return this.http.delete(BACKEND_URL_RESERVAS + reservaId);
  }

  deleteAllReservas(userId: string) {
    return this.http.delete( BACKEND_URL_RESERVAS + 'deleteAllReservas/' + userId);
  }

}
