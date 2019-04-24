import { Component } from '@angular/core';

@Component({
  selector: 'app-criar-espaco',
  templateUrl: './criar-espaco.component.html',
  styleUrls: ['./criar-espaco.component.css']
})

export class CriarEspacoComponent{
  enteredValue = '';
  newEspaco = 'VAZIO';

  onAddEspaco() {
    this.newEspaco = this.enteredValue;
  }
}
