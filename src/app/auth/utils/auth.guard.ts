import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../state/auth.selectors';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);

  return store.select(selectIsAuthenticated).pipe(
    tap((isAuthenticated) => {
      console.log(`Is Authenticated From Guard: ${isAuthenticated}`);
    }),
    map((isAuthenticated) => {
      return isAuthenticated;
    })
  );
};
