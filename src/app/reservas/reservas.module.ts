import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CriarReservaComponent } from "./criar-reserva/criar-reserva.component";
import { ListaReservasComponent } from "./lista-reservas/lista-reservas.component";
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [CriarReservaComponent, ListaReservasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ReservasModule {}
