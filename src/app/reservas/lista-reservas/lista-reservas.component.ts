import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css'],
})
export class ListaReservasComponent implements OnInit, OnDestroy {
  reservas: Reserva[] = [];
  private reservaSub: Subscription;
  isLoading = false;
  totalReservas = 10;
  reservaPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public reservasService: ReservaService) {}

  ngOnInit() {
    this.isLoading = true;
    this.reservasService.getReservas(this.reservaPerPage, this.currentPage);
    this.reservaSub = this.reservasService.getPostUpdateListener()
      .subscribe((reservas: Reserva[]) => {
        this.isLoading = false;
        this.reservas = reservas;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.reservaPerPage = pageData.pageSize;
    this.reservasService.getReservas(this.reservaPerPage, this.currentPage);
  }

  onDelete(reservaId: string) {
    this.reservasService.deleteReserva(reservaId);
  }

  ngOnDestroy() {
    this.reservaSub.unsubscribe();
  }
}



