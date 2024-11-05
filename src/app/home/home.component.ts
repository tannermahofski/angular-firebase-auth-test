import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../auth/state/auth.actions';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faTh,
  faArrowRightFromBracket,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { selectAuthUser } from '../auth/state/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  private library = inject(FaIconLibrary);
  private router = inject(Router);

  user$ = this.store.select(selectAuthUser).pipe();

  ngOnInit() {
    this.library.addIcons(faUser, faTh, faArrowRightFromBracket, faBars);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
