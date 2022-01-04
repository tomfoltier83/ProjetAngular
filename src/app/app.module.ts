import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CryptoService } from './services/crypto.service';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { CryptoFormComponent } from './crypto-list/crypto-form/crypto-form.component';
import { TokenViewComponent } from './token-view/token-view.component';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'market', component: CryptoListComponent },
  { path: 'token-view', canActivate: [AuthGuardService],  component: TokenViewComponent },
  { path: 'wallet/newcrypto', canActivate: [AuthGuardService], component: CryptoFormComponent },
  { path: '', redirectTo: 'market', pathMatch: 'full' },
  { path: '**', redirectTo: 'market' },
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CryptoListComponent,
    HeaderComponent,
    WalletComponent,
    CryptoFormComponent,
    TokenViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    CryptoService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
