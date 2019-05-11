import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaReservasComponent } from './reservas/lista-reservas/lista-reservas.component';
import { CriarReservaComponent } from './reservas/criar-reserva/criar-reserva.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: ListaReservasComponent},
  {path: 'criar', component: CriarReservaComponent, canActivate: [AuthGuard]},
  {path: 'edit/:reservaId', component: CriarReservaComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
