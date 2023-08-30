import { Shared } from "./shared.model";

export interface Order extends Shared{
    id?: number;
    stockId: number;
    stockName: string;
    quantity: number;
    totalPrice: number;
}
