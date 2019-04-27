import { Component, EventEmitter, Output } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { NgForm } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-criar-reserva',
  templateUrl: './criar-reserva.component.html',
  styleUrls: ['./criar-reserva.component.css']
})
export class CriarReservaComponent {

  openspace = null;
  salareuniao = null;
  salaformacao = null;

  @Output() reservaCriada = new EventEmitter<Reserva>();

  constructor(public reservaService: ReservaService) {}


  onAddReserva(form: NgForm) {
    if ( form.invalid ) {
      return;
    }

    this.reservaService.addReserva(form.value.openspace, form.value.salareuniao, form.value.salaformacao);
    form.resetForm();

  }

  }





