import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from '../admin/admin.component';
import { ListagemUsersComponent } from '../listagem-users/listagem-users.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'secret', component: AdminComponent},
  {path: 'clientes', component: AdminComponent},
  {path: 'listar', component: ListagemUsersComponent},
  {path: 'totalgasto', component: ListagemUsersComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})

export class AuthRoutingModule {

}
