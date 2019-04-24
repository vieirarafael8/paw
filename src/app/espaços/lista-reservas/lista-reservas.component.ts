import { Component, Input } from "@angular/core";

import { Reserva } from "../../models/reserva.model";

@Component({
  selector: "app-lista-reservas",
  templateUrl: "./lista-reservas.component.html",
  styleUrls: ["./lista-reservas.component.css"]
})
export class ListaReservasComponent {
  /* reservas = [
    { title: "Primeira Reserva", content: "Conteudo da primeira reserva" },
    { title: "Segunda Reserva", content: "Conteudo da segunda reserva" },
    { title: "Terceira Reserva", content: "Conteudo da terceira reserva" }
  ];*/
  @Input() reservas: Reserva[] = [];
}
