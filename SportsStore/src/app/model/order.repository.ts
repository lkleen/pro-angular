import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded = false;

  constructor(private dataSource: RestDataSource) {
  }

  getOrders(): Order[] {
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
    this.dataSource.deleteOrder(id).subscribe(order => {
      let index = this.orders.findIndex(order => {return order.id == id;});
      this.orders.splice(index, 1);
    });
  }

  saveOrder(order: Order) {
    this.loaded = false;
    return this.dataSource.saveOrder(order);
  }

}
