import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspacoService } from 'src/app/services/espaco.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Espaco } from 'src/app/models/espaco.model';
import { EstadoEspaco } from 'src/app/enums/estadoEspaco';

@Component({
  selector: 'app-criar-espaco',
  templateUrl: './criar-espaco.component.html',
  styleUrls: ['./criar-espaco.component.css']
})
export class CriarEspacoComponent implements OnInit, OnDestroy {


  public criarEspaco: FormGroup;
  tipo: any[];
  isLoading = false;
  private authStatusSub: Subscription;
  private mode = 'create';
  private espacoId: string;
  espaco: Espaco;
  estadoEspaco: EstadoEspaco;

  constructor(
    private formBuilder: FormBuilder,
    public espacoService: EspacoService, public route: ActivatedRoute, private authService: AuthService
  ) {
    this.criarEspaco = this.formBuilder.group({
      numSecretOpenSpace: ['', [Validators.required]],
      numSalaReuniao: ['', [Validators.required]],
      numSalaFormacao: ['', [Validators.required]],
      taxaSecretaria: ['', [Validators.required]],
      taxaTele: ['', [Validators.required]],
      taxaCorreio: ['', [Validators.required]],
      taxaInternet: ['', [Validators.required]],
      taxaReuniao: ['', [Validators.required]],
      taxaFormacao: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('espacoId')) {
        this.mode = 'edit';
        this.espacoId = paramMap.get('espacoId');
        this.isLoading = true;
        this.espacoService.getEspaco(this.espacoId).subscribe(espacosData => {
          this.isLoading = false;
          this.espaco =  { id: espacosData._id,
            numSecretOpenSpace: espacosData.numSecretOpenSpace,
            numSalaReuniao: espacosData.numSalaReuniao,
            numSalaFormacao: espacosData.numSalaFormacao,
            estadoEspaco: espacosData.estadoEspaco,
            creator: espacosData.creator,
            taxaSecretaria: espacosData.taxaSecretaria,
            taxaTele: espacosData.taxaTele,
            taxaCorreio: espacosData.taxaCorreio,
            taxaInternet: espacosData.taxaInternet,
            taxaReuniao: espacosData.taxaReuniao,
            taxaFormacao: espacosData.taxaFormacao,
            };
        });

      } else {
        this.mode = 'create';
        this.espacoId = null;
      }
    });
  }

  onAddEspaco() {

    if (this.criarEspaco.invalid) {
      console.log('Formulário Inválido!');
      return;
    }


    this.isLoading = true;

    this.espacoService.addEspaco(
      this.criarEspaco.value.numSecretOpenSpace,
      this.criarEspaco.value.numSalaReuniao,
      this.criarEspaco.value.numSalaFormacao,
      this.estadoEspaco = EstadoEspaco.LIVRE,
      this.criarEspaco.value.taxaSecretaria,
      this.criarEspaco.value.taxaTele,
      this.criarEspaco.value.taxaCorreio,
      this.criarEspaco.value.taxaInternet,
      this.criarEspaco.value.taxaReuniao,
      this.criarEspaco.value.taxaFormacao
      );
    }


    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
  }

