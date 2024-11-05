import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
} from './auth.actions';
import { catchError, from, map, of, switchMap, take, tap } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { CustomUser } from '../models/user';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthState } from './auth.selectors';
import { AuthStatus } from './auth.state';

export class AuthEffects {
  private actions$ = inject(Actions);
  private auth = inject(Auth);
  private router = inject(Router);
  private store = inject(Store);

  private authRoutes = ['/home', '/profile'];

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      console.log(`User state changed: ${JSON.stringify(user)}`);
      if (user === null) {
        this.store
          .select(selectAuthState)
          .pipe(take(1))
          .subscribe((authState) => {
            if (
              authState.status === AuthStatus.authenticated ||
              authState.status === AuthStatus.loading
            ) {
              this.store.dispatch(logoutSuccess());
            }
          });
      } else {
        this.store
          .select(selectAuthState)
          .pipe(take(1))
          .subscribe((authState) => {
            if (
              authState.status === AuthStatus.unauthenticated ||
              authState.status === AuthStatus.loading
            ) {
              this.store.dispatch(
                loginSuccess({ user: CustomUser.fromFirebaseUser(user) })
              );
            }
          });
      }
    });
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) => {
        return from(
          signInWithEmailAndPassword(this.auth, email, password)
        ).pipe(
          map((userCredential) => {
            return loginSuccess({
              user: CustomUser.fromFirebaseUser(userCredential.user),
            });
          }),
          catchError((error) => {
            console.log(error);
            return of(loginFailure({ error: error }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          console.log('Successful login');
          const currentRoute = this.router.url;
          if (!this.authRoutes.includes(currentRoute)) {
            this.router.navigate(['/home']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        console.log('Logging out');
        return from(signOut(this.auth)).pipe(
          map(() => logoutSuccess()),
          catchError((error) => {
            console.log(error);
            return of(logoutFailure({ error: error }));
          })
        );
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          console.log('Successful Logout');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap(({ email, password, username }) => {
        console.log('Signing Up');
        return from(
          createUserWithEmailAndPassword(this.auth, email, password)
        ).pipe(
          switchMap((userCredential) =>
            from(
              updateProfile(userCredential.user, {
                displayName: username,
              })
            ).pipe(
              map(() =>
                signUpSuccess({
                  user: CustomUser.fromFirebaseUser(
                    this.auth.currentUser ?? userCredential.user
                  ),
                })
              ),
              catchError((error) => of(signUpFailure({ error })))
            )
          ),
          catchError((error) => of(signUpFailure({ error })))
        );
      })
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        tap(() => {
          console.log('successful sign up');
        })
      ),
    { dispatch: false }
  );
}
