import { Component} from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  isLoading = false;

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.createUser(
      form.value.nome,
      form.value.email,
      form.value.NIF,
      form.value.morada,
      form.value.password
      );
  }
}
