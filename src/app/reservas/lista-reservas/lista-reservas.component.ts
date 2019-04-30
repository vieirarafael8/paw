import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit, OnDestroy{
  reservas: Reserva[] = [];
  private reservaSub: Subscription;

  constructor(public reservasService: ReservaService) {}

  ngOnInit() {
    this.reservasService.getPosts();
    this.reservaSub = this.reservasService.getPostUpdateListener()
      .subscribe((reservas: Reserva[]) => {
        this.reservas = reservas;
      });
  }

  ngOnDestroy() {
    this.reservaSub.unsubscribe();
  }
}



