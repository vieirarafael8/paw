import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from 'src/app/models/reserva.model';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Estado } from 'src/app/enums/estado';

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
  isLoading = false;
  estado: Estado;


  constructor(
    private formBuilder: FormBuilder,
    public reservaService: ReservaService, public route: ActivatedRoute
  ) {
    this.criarReserva = this.formBuilder.group({
      tipoEspaco: ['', [Validators.required]],
      numComp: [''],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      tele: [false],
      correio: [false],
      internet: [false],
      estado: ['']
    });

    this.reservas = ['Openspace', 'Sala de Reunião', 'Sala de Formação'];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('reservaId')) {
        this.mode = 'edit';
        this.reservaId = paramMap.get('reservaId');
        this.isLoading = true;
        this.reservaService.getReserva(this.reservaId).subscribe(reservasData => {
          this.isLoading = false;
          this.reserva =  { id: reservasData._id,
            tipoEspaco: reservasData.tipoEspaco,
            numComp: reservasData.numComp,
            dataInicio: reservasData.dataInicio,
            dataFim: reservasData.dataFim,
            tele: reservasData.tele,
            correio: reservasData.correio,
            internet: reservasData.internet,
            estado: reservasData.estado,
            creator: reservasData.creator
            };
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
      console.log('Formulário Inválido!');
      return;
    }
    console.log(this.criarReserva.value.tipoEspaco);

    if (this.criarReserva.value.dataFim < this.criarReserva.value.dataInicio) {
      console.log('Data de Fim deve ser igual ou posterior à Data de Início!');
      alert('Data de Fim deve ser igual ou posterior à Data de Início!');
      return;
    } else {
      if (this.criarReserva.value.tipoEspaco === 'Openspace') {
      this.isLoading = true;
      this.reservaService.addReserva(
        this.criarReserva.value.tipoEspaco,
        this.criarReserva.value.numComp,
        this.criarReserva.value.dataInicio,
        this.criarReserva.value.dataFim,
        this.criarReserva.value.tele,
        this.criarReserva.value.correio,
        this.criarReserva.value.internet,
        this.estado = Estado.PENDENTE
      );
      this.criarReserva.reset();
      } else if (this.criarReserva.value.tipoEspaco === 'Sala de Reunião') {
        this.isLoading = true;
        this.reservaService.addReserva(
        this.criarReserva.value.tipoEspaco,
        this.numCompReuniao,
        this.criarReserva.value.dataInicio,
        this.criarReserva.value.dataFim,
        this.criarReserva.value.tele,
        this.criarReserva.value.correio,
        this.criarReserva.value.internet,
        this.estado = Estado.PENDENTE
      );
        this.criarReserva.reset();
      } else {
      this.isLoading = true;
      this.reservaService.addReserva(
        this.criarReserva.value.tipoEspaco,
        this.numCompFormacao,
        this.criarReserva.value.dataInicio,
        this.criarReserva.value.dataFim,
        this.criarReserva.value.tele,
        this.criarReserva.value.correio,
        this.criarReserva.value.internet,
        this.estado = Estado.PENDENTE
      );
      this.criarReserva.reset();
      }
    }
  }
}
