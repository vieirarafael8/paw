import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CriarEspacoComponent } from "./espaços/criar-espaco/criar-espaco.component";
import { HeaderComponent } from "./header/header.component";
import { ListaReservasComponent } from "./espaços/lista-reservas/lista-reservas.component";

@NgModule({
  declarations: [
    AppComponent,
    CriarEspacoComponent,
    HeaderComponent,
    ListaReservasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
