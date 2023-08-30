import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStocksComponent } from './UserPages/list-stocks/list-stocks.component';
import { ListOrdersComponent } from './UserPages/list-orders/list-orders.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: ListStocksComponent},
    {path: 'orders-list', component: ListOrdersComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
