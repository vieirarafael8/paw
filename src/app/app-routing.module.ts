import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaReservasComponent } from './reservas/lista-reservas/lista-reservas.component';
import { CriarReservaComponent } from './reservas/criar-reserva/criar-reserva.component';


import { AuthGuard } from './auth/auth.guard';
import { CriarEspacoComponent } from './espaco/criar-espaco/criar-espaco.component';
import { ListagemReservasComponent } from './espaco/listagem-reservas/listagem-reservas.component';

const routes: Routes = [
  {path: '', component: ListaReservasComponent},
  {path: 'criar-espaco', component: CriarEspacoComponent},
  {path: 'lista-reservas', component: ListagemReservasComponent},
  {path: 'criar', component: CriarReservaComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
