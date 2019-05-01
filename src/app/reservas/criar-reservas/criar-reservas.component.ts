import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-reservas',
  templateUrl: './criar-reservas.component.html',
  styleUrls: ['./criar-reservas.component.css']
})
export class CriarReservasComponent implements OnInit {

  public criarReserva: FormGroup;
  private pristineFormValues: any[];

  constructor(private formBuilder: FormBuilder) {

    this.criarReserva = this.formBuilder.group({
      openSpace: ['', [Validators.min(0)]],
      salaReuniao: [0, [Validators.min(0), Validators.max(5)]],
      salaFormacao: [0, [Validators.min(0), Validators.max(20)]],
      tele: [false],
      correio: [false],
      internet: [false]
    });
    this.pristineFormValues = this.criarReserva.value;
  }

  ngOnInit() {}

  submitReserva(){

    console.log(this.criarReserva);


    if(this.criarReserva.invalid || this.pristineFormValues === this.criarReserva.value && this.criarReserva.touched) {
      console.log(this.criarReserva);
      console.log(this.pristineFormValues);


      console.log('rdfgthujik');

      return;
    }




  }

}
