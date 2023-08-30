import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStocksComponent } from './UserPages/list-stocks/list-stocks.component';
import { ListOrdersComponent } from './UserPages/list-orders/list-orders.component';
import { BackButtonComponent } from './Components/back-button/back-button.component';
import { OrderService } from './Services/order.service';

import { IgxFinancialChartModule, 
  IgxLegendModule,  IgxDataChartScatterModule } from "igniteui-angular-charts";

@NgModule({
  declarations: [
    AppComponent,
    ListStocksComponent,
    ListOrdersComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IgxFinancialChartModule,
    IgxLegendModule, IgxDataChartScatterModule
    
  ],
  providers: [
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
