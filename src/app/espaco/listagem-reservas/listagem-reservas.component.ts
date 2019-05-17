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
    public espacoService: EspacoService,
    public reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.espacoService.getReservas();
    this.userId = this.authService.getUserId();
    console.log('AQUI 1');

    this.reservaSub = this.reservaService.getPostUpdateListener().subscribe(
        (reservasData: { reservas: Reserva[]}) => {
          console.log('AQUI 2');
          this.isLoading = false;
          this.reservas = reservasData.reservas;
        }
      );
    console.log('AQUI 3');
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.reservaPerPage = pageData.pageSize;
    this.espacoService.getReservas();
  }

  ngOnDestroy(): void {
    this.reservaSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  /*onDelete(reservaId: string) {
    this.isLoading = true;
    this.reservasService.deleteReserva(reservaId).subscribe(() => {
      this.espacoService.getAdminReservas(this.reservaPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }*/


}
