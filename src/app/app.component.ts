import { Component } from "@angular/core";
import { Reserva } from "./models/reserva.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  storedReservas: Reserva[] = [];

  onReservaAdded(reservas) {
    this.storedReservas.push(reservas);
  }
}
