import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'cw-token-view',
  template: `
  <h2>Mes cryptomonnaies</h2>
    <cw-wallet *ngFor="let token of tokens" [tokenName]="token.name" [tokenquantityNewToken]="token.quantityNewToken">
    </cw-wallet>
    <button class="btn btn-primary" style="margin-top: 10px;" (click)="onNewCrypto()">Ajouter</button>
  `,
  styles: [
  ]
})
export class TokenViewComponent implements OnInit {

  tokens: any[];
  tokenSubscription: Subscription;

  constructor(private router: Router, private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.tokenSubscription = this.cryptoService.tokenSubject.subscribe(
      (tokens: any[]) => {
        this.tokens = tokens;
      }
    );
    this.cryptoService.emitTokenSubject();
    this.cryptoService.walletLoad();
  }

  onNewCrypto() {
    this.router.navigate(['/wallet', 'newcrypto']);
  }

}
