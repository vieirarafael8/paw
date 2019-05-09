import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from 'src/app/models/reserva.model';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// create our cost var with the information about the format that we want
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',

  },
};

@Component({
  selector: 'app-criar-reserva',
  templateUrl: './criar-reserva.component.html',
  styleUrls: ['./criar-reserva.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.

    { provide: MAT_DATE_LOCALE, useValue: 'fr' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue:  MY_FORMATS},
  ],
})
export class CriarReservaComponent implements OnInit {
  public criarReserva: FormGroup;

  reservas: any[];

  submitted = false;
  numCompReuniao = 5;
  numCompFormacao = 20;
  private mode = 'create';
  private reservaId: string;
  reserva: Reserva;
  err: any;

  constructor(
    private formBuilder: FormBuilder,
    public reservaService: ReservaService, public route: ActivatedRoute
  ) {
    this.criarReserva = this.formBuilder.group({
      tipoEspaco: ['', [Validators.required]],
      numComp: [''],
      dataInicio: [''],
      dataFim: [''],
      tele: [false],
      correio: [false],
      internet: [false]
    });

    this.reservas = ['Openspace', 'Sala de Reunião', 'Sala de Formação'];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('reservaId')) {
        this.mode = 'edit';
        this.reservaId = paramMap.get('reservaId');
        this.reservaService.getReserva(this.reservaId).subscribe(reservasData => {
          this.reserva =  { id: reservasData._id,
            tipoEspaco: reservasData.tipoEspaco,
            numComp: reservasData.numComp,
            dataInicio: reservasData.dataInicio,
            dataFim: reservasData.dataFim,
            tele: reservasData.tele,
            correio: reservasData.correio,
            internet: reservasData.internet,
            }
        });

      } else {
        this.mode = 'create';
        this.reservaId = null;
      }
    });
  }

  onAddReserva() {
    console.log(this.criarReserva);

    if (this.criarReserva.invalid) {
      console.log('erro!');
      return;
    }
    console.log(this.criarReserva.value.tipoEspaco);

    if (this.criarReserva.value.dataFim < this.criarReserva.value.dataInicio) {
      console.log('Data de Fim deve ser igual ou posterior à Data de Início!');
      alert('Data de Fim deve ser igual ou posterior à Data de Início!');
      return;
    } else {
      if (this.criarReserva.value.tipoEspaco === 'Openspace') {
      this.reservaService.addReserva(
        this.criarReserva.value.tipoEspaco,
        this.criarReserva.value.numComp,
        this.criarReserva.value.dataInicio,
        this.criarReserva.value.dataFim,
        this.criarReserva.value.tele,
        this.criarReserva.value.correio,
        this.criarReserva.value.internet
      );
      this.criarReserva.reset();
      alert('Reserva realizada com sucesso!');
      } else if (this.criarReserva.value.tipoEspaco === 'Sala de Reunião') {
      this.reservaService.addReserva(
        this.criarReserva.value.tipoEspaco,
        this.numCompReuniao,
        this.criarReserva.value.dataInicio,
        this.criarReserva.value.dataFim,
        this.criarReserva.value.tele,
        this.criarReserva.value.correio,
        this.criarReserva.value.internet
      );
      this.criarReserva.reset();
      alert('Reserva realizada com sucesso!');
      } else {
      this.reservaService.addReserva(
        this.criarReserva.value.tipoEspaco,
        this.numCompFormacao,
        this.criarReserva.value.dataInicio,
        this.criarReserva.value.dataFim,
        this.criarReserva.value.tele,
        this.criarReserva.value.correio,
        this.criarReserva.value.internet
      );
      this.criarReserva.reset();
      alert('Reserva realizada com sucesso!');
      }
    }
  }
}
