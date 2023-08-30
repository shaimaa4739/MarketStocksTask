import { Subject } from "rxjs";
import { Order } from "../Models/order.model";

export class OrderService {
    private orders = new Subject<any>();
    ordersList: Order[]=[];

    sendOrders(orders: Order[]){
        this.ordersList = orders
        this.orders.next(orders)
    }

    getOrders(){
        return this.orders.asObservable();
    }
}