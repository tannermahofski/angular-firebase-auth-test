import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signUp } from '../../state/auth.actions';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private router = inject(Router);
  private store = inject(Store);

  private usernameKey = 'username';
  private emailKey = 'email';
  private passwordKey = 'password';

  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  usernameErrorMessage = signal<string | null>(null);
  emailErrorMessage = signal<string | null>(null);
  passwordErrorMessage = signal<string | null>(null);

  onUsernameUpdated() {
    if (this.signUpForm.get(this.usernameKey)?.valid) {
      this.usernameErrorMessage.set(null);
      return;
    }

    if (this.signUpForm.get(this.usernameKey)?.errors?.['required']) {
      this.usernameErrorMessage.set('Username is required');
      return;
    }

    if (this.signUpForm.get(this.usernameKey)?.errors?.['minLength']) {
      this.usernameErrorMessage.set('Username is too short');
      return;
    }
  }

  onEmailUpdated() {
    if (this.signUpForm.get(this.emailKey)?.valid) {
      this.emailErrorMessage.set(null);
      return;
    }

    if (this.signUpForm.get(this.emailKey)?.errors?.['required']) {
      this.emailErrorMessage.set('Email is required');
      return;
    }

    this.emailErrorMessage.set('Invalid email');
  }

  onPasswordUpdated() {
    if (this.signUpForm.get(this.passwordKey)?.valid) {
      this.passwordErrorMessage.set(null);
      return;
    }

    if (this.signUpForm.get(this.passwordKey)?.errors?.['required']) {
      this.passwordErrorMessage.set('Password is required');
      return;
    }

    if (this.signUpForm.get(this.passwordKey)?.errors?.['minlength']) {
      this.passwordErrorMessage.set(
        'Password must be at least 6 characters long'
      );
    }

    this.passwordErrorMessage.set('Invalid password');
  }

  signUp() {
    this.store.dispatch(
      signUp({
        email: this.signUpForm.value.email!,
        password: this.signUpForm.value.password!,
        username: this.signUpForm.value.username!,
      })
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
