import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <ul class="nav nav-pills nav-fill">
        <li routerLinkActive="active" class="nav-item">
          <a routerLink="market" class="nav-link">Marchés</a>
        </li>
        <li routerLinkActive="active" class="nav-item">
          <a routerLink="token-view" class="nav-link">Porte-feuille</a>
        </li>
      </ul>
      <ul class="nav nav-pills nav-fill">
        <li routerLinkActive="active" *ngIf="!isAuth" class="nav-item">
          <a routerLink="auth/signup" class="nav-link">Créer un compte</a>
        </li>
        <li routerLinkActive="active" *ngIf="!isAuth" class="nav-item">
          <a routerLink="auth/signin" class="nav-link active">Connexion</a>
        </li>
        <li class="nav-item">
          <a (click)="onSignOut()" *ngIf="isAuth" style="cursor:pointer" class="nav-link active">Déconnexion</a>
        </li>
      </ul>
    </div>
  </nav>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
