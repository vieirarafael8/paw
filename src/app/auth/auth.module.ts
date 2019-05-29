import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AdminComponent } from '../admin/admin.component';
import { ListagemUsersComponent } from '../listagem-users/listagem-users.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ListagemUsersComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ListagemUsersComponent,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})

export class AuthModule {}
