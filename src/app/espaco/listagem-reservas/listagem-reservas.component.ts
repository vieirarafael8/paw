import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { EspacoService } from 'src/app/services/espaco.service';

@Component({
  selector: 'app-listagem-reservas',
  templateUrl: './listagem-reservas.component.html',
  styleUrls: ['./listagem-reservas.component.css']
})

export class ListagemReservasComponent implements OnInit, OnDestroy {

  reservas: Reserva[] = [];
  private reservaSub: Subscription;
  isLoading = false;
  totalReservas = 0;
  reservaPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  constructor(
    public reservasService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.reservasService.getAllReservas(this.reservaPerPage, this.currentPage);
    this.reservaSub = this.reservasService
      .getAdminUpdateListener()
      .subscribe((reservasData: {reservas: Reserva[], reservaCount: number}) => {
        this.isLoading = false;
        this.totalReservas = reservasData.reservaCount;
        this.reservas = reservasData.reservas;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
          .getAuthStatusListener()
          .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.reservaPerPage = pageData.pageSize;
    this.reservasService.getAllReservas(this.reservaPerPage, this.currentPage);
  }

  onDelete(reservaId: string) {
    this.isLoading = true;
    this.reservasService.deleteReserva(reservaId).subscribe(() => {
      this.reservasService.getAllReservas(this.reservaPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.reservaSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
