import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Coin } from '../models/Coin.models';


@Injectable({
  providedIn: 'root'
})
export class CryptoService implements OnInit {

  tokenSubject = new Subject<any[]>();

  private tokens = <any[]>([]);

  coins: Coin[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient
    .get<Coin[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    .subscribe(
      res => {
        console.log(res);
        this.coins = res;
      },
      err => console.log(err)
    );
  }

  emitTokenSubject() {
    this.tokenSubject.next(this.tokens.slice());
  }

  addCrypto(name: string, quantityNewToken: number) {
    const cryptoObject ={
      name: '',
      quantityNewToken: 0
    };
    cryptoObject.name = name;
    cryptoObject.quantityNewToken = quantityNewToken;

    this.tokens.push(cryptoObject);
    this.emitTokenSubject();
  }

  /*addCrypto2(id: string, quantityNewToken: number) {
    let ownToken = new Coin('', 0);

  }*/

  saveTokensToServer() {
    this.httpClient
      .put('https://crypto-wallet-f2e92-default-rtdb.europe-west1.firebasedatabase.app/ownToken.json', this.tokens)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur de sauvegarde !' + error);
        }
      );
  }

  getAppareilsFromServeur() {
    this.httpClient
      .get<any[]>('https://crypto-wallet-f2e92-default-rtdb.europe-west1.firebasedatabase.app/ownToken.json')
      .subscribe(
        (response) => {
          this.tokens = response;
          this.emitTokenSubject();
        },
        (error) => {
          console.log('Erreur de chargement !' + error);
        }
      );
  }

  walletLoad() {
    return new Promise(
      (resolve, reject) => {
          setTimeout(
              () => {
                this.getAppareilsFromServeur();;
                  resolve(true);
              }, 2000
          );
      }
  );
  }

}
