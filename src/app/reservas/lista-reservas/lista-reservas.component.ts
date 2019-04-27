import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent {
  reservas: Reserva[] = [];
  private reservaSub: Subscription;

  constructor(public postsService: ReservaService) {}

  ngOnInit() {
    this.reservas = this.postsService.getPosts();
    this.reservaSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Reserva[]) => {
        this.reservas = posts;
      });
  }

  ngOnDestroy() {
    this.reservaSub.unsubscribe();
  }
}



