import { Component } from '@angular/core';
import { Order } from 'src/app/Models/order.model';
import { Stock } from 'src/app/Models/stock.model';
import { OrderService } from 'src/app/Services/order.service';

const DATA = require("../../Data/stocksData.json")

@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.css']
})

export class ListStocksComponent {
  interval;
  stocksFromJson: Stock[] = [];
  stocksList: Stock[] = [];
  stocksPricesList: {}[]=[];
  orders: Order[]=[];
  totalPrice: number=0;
  stockQuantity: number=0;

  constructor(private orderService: OrderService){}

  ngOnInit(){
    this.stocksFromJson = DATA;
    this.changeStocksPrices();
  }

  
  // Reuse list stocks component is needed
  changeStocksPrices(){
    this.stocksList = this.stocksFromJson;
    this.stocksPricesList = this.stocksFromJson.map((stock)=>{
      return {
        price: stock.price,
        name: stock.name
      }
    });
    this.interval = setInterval(() =>{
      this.stocksList = this.stocksFromJson.map(stock=>({ ...stock, price: Math.floor(Math.random()*100) }));
      this.stocksPricesList = this.stocksFromJson.map((stock)=>{
        return {
          price: stock.price,
          name: stock.name
        }
      });
    }, 10000);
  }

  calcTotalPrice(quantity: string, stock: Stock){
    this.stockQuantity = +quantity;
    let inputTotal = document.getElementById(
      `total`+stock.id.toString()
    )  as HTMLDivElement ;
    
    inputTotal?
      quantity?this.showValueInInput(inputTotal, quantity, stock.price)
      :this.showValueInInput(inputTotal, '1', stock.price)
    :null
  }

  showValueInInput(input: HTMLDivElement,quantity: string,price: number){
    this.totalPrice = (parseFloat(quantity)*price);
    input.setAttribute('value',this.totalPrice.toString());
  }

  buyStock(stock: Stock){
    let stockForm = document.getElementById(
      `stock`+stock.id.toString()
    )  as HTMLDivElement ;

    stockForm.setAttribute('class',"showBuyStock")
  }

  submitOrder(stock: Stock){
    
    let order: Order={
      "stockId" : stock.id,
      "stockName": stock.name,
      "price": stock.price,
      "quantity": this.stockQuantity==0?1:this.stockQuantity,
      "totalPrice": this.totalPrice
    } ;
    this.orders.push(order);
    this.orderService.sendOrders(this.orders);

    let msg = document.getElementsByClassName("successMsg")
    msg[0].classList.add( "showMsg")
    setInterval(()=>{
      msg[0].classList.remove("showMsg")
      msg[0].classList.add("successMsg")
    },4000)
  }

  ngOnDestroy(){
    clearInterval(this.interval)
  }

}
