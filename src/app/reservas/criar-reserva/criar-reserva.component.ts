import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from 'src/app/models/reserva.model';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Estado } from 'src/app/enums/estado';
import { Subscription } from 'rxjs';
import {AuthService} from '../../auth/auth.service';

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
export class CriarReservaComponent implements OnInit, OnDestroy {
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
  custo: number;
  taxaSecretaria =  1;
  taxaTele = 1;
  taxaCorreio = 1;
  taxaInternet = 1;
  taxaReuniao = 1;
  taxaFormacao = 1;
  private authStatusSub: Subscription;
  public today = new Date();
  validaData = true;



  constructor(
    private formBuilder: FormBuilder,
    public reservaService: ReservaService, public route: ActivatedRoute, private authService: AuthService
  ) {
    this.criarReserva = this.formBuilder.group({
      tipoEspaco: ['', [Validators.required]],
      numComp: [''],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      tele: [false],
      correio: [false],
      internet: [false],
      estado: [''],
      custo: ['']
    });
    this.custo = 0;
    this.reservas = ['Openspace', 'Sala de Reunião', 'Sala de Formação'];
  }

  ngOnInit() {
    this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      });
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
            creator: reservasData.creator,
            custo: reservasData.custo
            };
        });

      } else {
        this.mode = 'create';
        this.reservaId = null;
      }
    });
  }

  onAddReserva() {


    if (this.criarReserva.invalid) {
      console.log('Formulário Inválido!');
      return;
    }

    if (this.criarReserva.value.dataFim < this.criarReserva.value.dataInicio) {

      console.log('A data de início deve ser anterior à data de fim da reserva');
      return;
    } else if ( this.today > this.criarReserva.value.dataInicio) {
      console.log('As datas devem ser iguais ao superiores ao dia de hoje');
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
        this.estado = Estado.PENDENTE,
        this.custo = (this.calculoCustoPessoas(this.criarReserva.value.numComp) +
        this.calculoCustoExtras(this.criarReserva.value.tele, this.criarReserva.value.correio, this.criarReserva.value.internet))
        * this.calculoCustoDatas(this.criarReserva.value.dataInicio, this.criarReserva.value.dataFim)
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
        this.estado = Estado.PENDENTE,
        this.custo = this.calculoCustoPessoas(this.numCompReuniao)
        * this.calculoCustoDatas(this.criarReserva.value.dataInicio, this.criarReserva.value.dataFim)
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
        this.estado = Estado.PENDENTE,
        this.custo = this.calculoCustoPessoas(this.numCompFormacao)
        * this.calculoCustoDatas(this.criarReserva.value.dataInicio, this.criarReserva.value.dataFim)
      );

      this.criarReserva.reset();
      }
    }
  }

  calculoCustoDatas(dataI: Date, dataF: Date) {

    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = new Date(dataI).getTime();
    const end: number = new Date(dataF).getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);

    return daysBetweenDates;
  }

  calculoCustoPessoas(numComp: number) {
    let custoTotalPessoas = 0;

    if (this.criarReserva.value.tipoEspaco === 'Openspace') {
      custoTotalPessoas =  numComp * this.taxaSecretaria;
    } else if (this.criarReserva.value.tipoEspaco === 'Sala de Reunião') {
      custoTotalPessoas = numComp * this.taxaReuniao;
    } else if (this.criarReserva.value.tipoEspaco === 'Sala de Formação') {
      custoTotalPessoas =  numComp * this.taxaFormacao;
    }

    return custoTotalPessoas;
  }

  calculoCustoExtras(tele: boolean, correio: boolean, internet: boolean) {
    let custototalExtras = 0;

    if (tele) {
      custototalExtras = custototalExtras + this.taxaTele;
    }
    if (correio) {
      custototalExtras = custototalExtras +  this.taxaCorreio;
    }
    if (internet) {
      custototalExtras = custototalExtras + this.taxaInternet;
    }
    return custototalExtras;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
