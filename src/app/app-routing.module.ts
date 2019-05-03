import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaReservasComponent } from './reservas/lista-reservas/lista-reservas.component';
import { CriarReservaComponent } from './reservas/criar-reserva/criar-reserva.component';

const routes: Routes = [
  {path: '', component: ListaReservasComponent},
  {path: 'criar', component: CriarReservaComponent},
  {path: 'edit/:reservaId', component: CriarReservaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
