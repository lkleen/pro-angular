import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import {findIndex, Observable} from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded = false;

  constructor(private dataSource: RestDataSource) {
  }

  getOrders(): readonly Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.orders;
  }

  loadOrders() {
    this.loaded = true;
    return this.dataSource.getOrders().subscribe(
      orders => this.orders = orders
    );
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe(
      updated => {
        let index = this.orders.findIndex(
          elem => {return elem.id == updated.id;}
        )
        if (index == -1) {return;}
        this.orders.splice(index, 1, updated);
      }
    );
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe(
      deleted => {
        let index = this.orders.findIndex(elem => {return elem.id == deleted.id;})
        this.orders.splice(index, 1);
      }
    )
  }

  saveOrder(order: Order): Observable<Order> {
    this.loaded = false;
    return this.dataSource.saveOrder(order);
  }

}
