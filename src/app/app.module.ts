import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,

} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarReservaComponent } from './reservas/criar-reserva/criar-reserva.component';
import { HeaderComponent } from './header/header.component';
import { ListaReservasComponent } from './reservas/lista-reservas/lista-reservas.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CriarReservaComponent,
    HeaderComponent,
    ListaReservasComponent,


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
    MatExpansionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
