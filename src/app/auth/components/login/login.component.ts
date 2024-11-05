import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth.actions';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { LoadingComponent } from '../../../loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private store = inject(Store);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private emailKey = 'email';
  private passwordKey = 'password';

  emailErrorMessage = signal<string | null>(null);
  passwordErrorMessage = signal<string | null>(null);

  onEmailUpdated() {
    if (this.loginForm.get(this.emailKey)?.valid) {
      this.emailErrorMessage.set(null);
      return;
    }

    if (this.loginForm.get(this.emailKey)?.errors?.['required']) {
      this.emailErrorMessage.set('Email is required');
      return;
    }

    this.emailErrorMessage.set('Invalid email');
  }

  onPasswordUpdated() {
    if (this.loginForm.get(this.passwordKey)?.valid) {
      this.passwordErrorMessage.set(null);
      return;
    }

    if (this.loginForm.get(this.passwordKey)?.errors?.['required']) {
      this.passwordErrorMessage.set('Password is required');
      return;
    }

    if (this.loginForm.get(this.passwordKey)?.errors?.['minlength']) {
      this.passwordErrorMessage.set(
        'Password must be at least 6 characters long'
      );
    }

    this.passwordErrorMessage.set('Invalid password');
  }

  login() {
    this.store.dispatch(
      login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
    );
  }

  navigateToSignUp() {
    console.log('Navigate to signup');
    this.router.navigate(['/sign-up']);
  }
}
