import { Component} from '@angular/core';
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
  tele = false;
  correio = false;
  internet = false;

  constructor(public reservaService: ReservaService) {}

  onAddReserva(form: NgForm) {
    if ( form.invalid ) {
      return;
    }

    this.reservaService.addReserva(form.value.openspace, form.value.salareuniao, form.value.salaformacao,
      form.value.tele, form.value.correio, form.value.internet);

    form.resetForm();

    this.rateControl = new FormControl("", [Validators.max(100), Validators.min(0)])

  }

  }





