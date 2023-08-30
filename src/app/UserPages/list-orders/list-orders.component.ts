import { Component } from '@angular/core';
import { Order } from 'src/app/Models/order.model';
import { Stock } from 'src/app/Models/stock.model';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent {

  listAllOrders: Order[] = [];
  ordersStoredInSession: Order[] = [];
  totalPrice: number=0;
  stockQuantity: number=0;

  constructor(private orderService: OrderService){
  }

  ngOnInit(){
    console.log("Reuse list stocks component is needed");
    this.getOrdersHistory()
  }

  getOrdersHistory(){
    this.ordersStoredInSession = JSON.parse(sessionStorage.getItem('orders') || '{}')
    if(this.ordersStoredInSession.length>0){
      Array.prototype.forEach.call(this.ordersStoredInSession,order=>{
        this.listAllOrders.push(order)
      })
      Array.prototype.forEach.call(this.orderService.ordersList ,newOrder=>{
        this.listAllOrders.push(newOrder)
      })
      sessionStorage.setItem("orders", JSON.stringify(this.listAllOrders))
    } else {
      sessionStorage.setItem("orders",JSON.stringify(this.orderService.ordersList))
      this.listAllOrders = this.orderService.ordersList;
    }
  }

  getkey(){
    return Object.keys(this.listAllOrders[0]);
  }

  // Reuse list stocks component is needed
  calcTotalPrice(quantity: string, order: Order){
    this.stockQuantity = +quantity;
    let inputTotal = document.getElementById(
      `total`+order.stockId.toString()
    )  as HTMLDivElement ;
    
    inputTotal?
      quantity?this.showValueInInput(inputTotal, quantity, order.price)
      :this.showValueInInput(inputTotal, '1', order.price)
    :null
  }

  showValueInInput(input: HTMLDivElement,quantity: string,price: number){
    this.totalPrice = (parseFloat(quantity)*price);
    input.setAttribute('value',this.totalPrice.toString());
  }

  buyStock(order: Order){
    let stockForm = document.getElementById(
      `order`+order.stockId.toString()
    )  as HTMLDivElement ;

    stockForm.setAttribute('class',"showBuyStock")
  }

  hideOrderform(order: Order){
    let stockForm = document.getElementById(
      `order`+order.stockId.toString()
    )  as HTMLDivElement ;

    stockForm.setAttribute('class',"hideOrderform")
  }

  submitOrder(order: Order){
    
    let newOrder: Order={
      "stockId" : order.stockId,
      "stockName": order.stockName,
      "price": order.price,
      "quantity": this.stockQuantity,
      "totalPrice": this.totalPrice
    } ;
    this.listAllOrders.push(newOrder)
    sessionStorage.setItem("orders", JSON.stringify(this.listAllOrders))

    let msg = document.getElementsByClassName("successMsg")
    msg[0].classList.add( "showMsg")
    setInterval(()=>{
      msg[0].classList.remove("showMsg")
      msg[0].classList.add("successMsg")
    },4000)
  }


}
