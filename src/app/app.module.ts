import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule, ngxLoadingAnimationTypes  } from 'ngx-loading';
import { TreeModule } from '@circlon/angular-tree-component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PricingComponent } from './product/pricing/pricing.component';
import { PackageComponent } from './product/package/package.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './global/header/header.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { DistributorComponent } from './distributor/distributor.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { TransactionHistoryComponent } from './transaction/transaction-history/transaction-history.component';
import { DraftComponent } from './transaction/draft/draft.component';
import { TopupComponent } from './topup/topup.component';
import { TopupDetailComponent } from './topup/topup-detail/topup-detail.component';
import { TopupHistoryComponent } from './topup/topup-history/topup-history.component';
import { NewDistributorComponent } from './distributor/new-distributor/new-distributor.component'; 
import { RebateComponent } from './rebate/rebate.component';
import { RebateDetailComponent } from './rebate/rebate-detail/rebate-detail.component';
import { ReloginComponent } from './login/relogin/relogin.component';
import { ProfitComponent } from './profit/profit.component';
import { ProfitDetailComponent } from './profit/profit-detail/profit-detail.component';
import { CsvReviewComponent } from './profit/csv-review/csv-review.component';
import { HistoryDistributorComponent } from './distributor/history-distributor/history-distributor.component';  
import { AccountTradingComponent } from './account-trading/account-trading.component'; 
import { ProfitSettingComponent } from './profit-setting/profit-setting.component';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RenewalComponent } from './renewal/renewal.component';
import { MembershipComponent } from './membership/membership.component'; 
import { AdminComponent } from './admin/admin.component';
import { VerivedComponent } from './verived/verived.component'; 



export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    PricingComponent,
    PackageComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    UserDetailComponent,
    DistributorComponent,
    TransactionComponent,
    TransactionDetailComponent,
    TransactionHistoryComponent,
    DraftComponent,
    TopupComponent,
    TopupDetailComponent,
    TopupHistoryComponent,
    NewDistributorComponent, 
    RebateComponent,
    RebateDetailComponent,
    ReloginComponent,
    ProfitComponent,
    ProfitDetailComponent,
    CsvReviewComponent,
    HistoryDistributorComponent,  
    AccountTradingComponent, 
    ProfitSettingComponent, 
    RenewalComponent,
    MembershipComponent, 
    AdminComponent, VerivedComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    NgbModule,  
    CurrencyMaskModule,
    TreeModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
