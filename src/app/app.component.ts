import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthState } from './auth/state/auth.selectors';
import { AuthStatus } from './auth/state/auth.state';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-auth-test';

  private store = inject(Store);

  authState$ = this.store.select(selectAuthState);
  AuthStatus = AuthStatus;

  // private auth = inject(Auth);
  // user$ = user(this.auth);
  // userSubscription: Subscription | null = null;

  ngOnInit(): void {}
}
