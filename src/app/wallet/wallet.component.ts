import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'cw-wallet',
  template: `
  <div class="row">
    <div class="col">
      <div>
        <li class="list-group-item">
        <h3 >
          {{ tokenName }}
        </h3>
          <span>{{ tokenquantityNewToken }} ≈ {{ prixOwnCrypto() }}</span>

        </li>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class WalletComponent implements OnInit {


  @Input() tokenName: string;
  @Input() tokenquantityNewToken: number;

  constructor() { }

  ngOnInit(): void {
  }

  prixOwnCrypto() {
    for (let i=0; i<100; i++){

    }
  }
}
