import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from 'src/app/models/reserva.model';

@Component({
  selector: 'app-criar-reserva',
  templateUrl: './criar-reserva.component.html',
  styleUrls: ['./criar-reserva.component.css']
})
export class CriarReservaComponent implements OnInit {


  public criarReserva: FormGroup;

  reservas: any[];

  submitted = false;

  constructor(private formBuilder: FormBuilder, public reservaService: ReservaService) {

    this.criarReserva = this.formBuilder.group({
      tipoEspaco: ['', [Validators.required]],
      numComp: ['', Validators.required],
      tele: [false],
      correio: [false],
      internet: [false]
    });

    this.reservas = ['Openspace', 'Sala de Reunião', 'Sala de Formação'];
  }

  ngOnInit() {}

  onAddReserva() {
    console.log(this.criarReserva);

    if (this.criarReserva.invalid) {
      console.log('erro!');
      return;
    }

    this.reservaService.addReserva(this.criarReserva.value.tipoEspaco, this.criarReserva.value.numComp,
      this.criarReserva.value.tele, this.criarReserva.value.correio, this.criarReserva.value.internet);

    this.criarReserva.reset();

  }

}





