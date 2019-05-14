import { Component, OnInit, OnDestroy} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
export class SignupComponent implements OnInit, OnDestroy {

  public today = new Date();
  valida = true;

  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
    this.criarUser = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      NIF: ['', [Validators.required, Validators.max(999999999)]],
      morada: ['', [Validators.required]],
      password: ['', [Validators.required]],
      numCartao: ['', [Validators.required, Validators.max(9999999999999999)]],
      validade: ['', [Validators.required]],
      ccv: ['', [Validators.required, Validators.max(999)]],
    });
  }
  public criarUser: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;

  ngOnInit() {
   this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(
     authStatus => {
        this.isLoading = false;
     }
   );
  }

  onSignup() {
    console.log(this.today);
    console.log(this.criarUser.value.validade);

    if (this.criarUser.invalid) {
      return;
    }

    if (this.today > this.criarUser.value.validade) {
      return;
    } else {

    this.isLoading = true;

    this.authService.createUser(
      this.criarUser.value.nome,
      this.criarUser.value.email,
      this.criarUser.value.NIF,
      this.criarUser.value.morada,
      this.criarUser.value.password,
      this.criarUser.value.numCartao,
      this.criarUser.value.validade,
      this.criarUser.value.ccv
      );
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
