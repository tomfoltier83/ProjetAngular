import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'cw-root',
  template: `
  <app-header></app-header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>

  `,
  styles: []
})
export class AppComponent{

  constructor() {

    var config = {
      apiKey: "AIzaSyBftoXq9wtA9k1Ddr3xh0h838Zp-0x998Q",
      authDomain: "crypto-wallet-f2e92.firebaseapp.com",
      databaseURL: "https://crypto-wallet-f2e92-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "crypto-wallet-f2e92",
      storageBucket: "crypto-wallet-f2e92.appspot.com",
      messagingSenderId: "678229651205",
      appId: "1:678229651205:web:1244ed433297c28fd1916c"
    };
    firebase.initializeApp(config);
  }

  ngOnInit() {
  }
}
