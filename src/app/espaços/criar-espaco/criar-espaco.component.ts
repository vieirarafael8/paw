import { Component, EventEmitter, Output } from '@angular/core';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-criar-espaco',
  templateUrl: './criar-espaco.component.html',
  styleUrls: ['./criar-espaco.component.css']
})
export class CriarEspacoComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() reservaCriada = new EventEmitter<Reserva>();

  onAddEspaco() {
    const reserva: Reserva = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    // não deixa criar reservas em branco
    if (reserva.title.length > 0 && reserva.content.length > 0) {
      this.reservaCriada.emit(reserva);
    }
  }
}
