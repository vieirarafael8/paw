import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { ReservasModule } from './reservas/reservas.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatSidenavModule, MatNavList, MatListModule } from '@angular/material';
import { CriarEspacoComponent } from './espaco/criar-espaco/criar-espaco.component';
import { ListagemReservasComponent } from './espaco/listagem-reservas/listagem-reservas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    CriarEspacoComponent,
    ListagemReservasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReservasModule,
    ReactiveFormsModule,
    FormsModule,
    MomentDateModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
