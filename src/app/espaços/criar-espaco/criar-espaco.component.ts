import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-criar-espaco",
  templateUrl: "./criar-espaco.component.html",
  styleUrls: ["./criar-espaco.component.css"]
})
export class CriarEspacoComponent {
  enteredTitle = "";
  enteredContent = "";
  @Output() reservaCriada = new EventEmitter();

  onAddEspaco() {
    const reserva = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.reservaCriada.emit(reserva);
  }
}
