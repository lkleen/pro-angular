import {Component, IterableDiffer, IterableDiffers, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../model/order.model";
import {OrderRepository} from "../model/order.repository";

@Component({
  templateUrl: "orderTable.component.html"
})
export class OrderTableComponent {
  colsAndRows: string[] = ['name', 'zip','cart_p','cart_q', 'buttons'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>(this.orderRepo.getOrders());
  differ: IterableDiffer<Order>;

  constructor(private orderRepo: OrderRepository, private differs: IterableDiffers) {
    this.differ = differs.find(this.orderRepo.getOrders()).create();
    this.dataSource.filter = "true";
    this.dataSource.filterPredicate = (order: Order, filter: string) => {
      return filter == "true" || !order.shipped;
    };
  }

  get includeShipped() {
    return this.dataSource.filter == "true";
  }

  set includeShipped(include: boolean) {
    this.dataSource.filter = include.toString();
  }

  ngDoCheck() {
    let changes = this.differ?.diff(this.orderRepo.getOrders());
    if (changes != null) {
      this.dataSource.data = this.orderRepo.getOrders();
    }
  }

  toggleShipped(order: Order) {
    order.shipped = !order.shipped;
    this.orderRepo.updateOrder(order);
  }

  delete(id: number) {
    this.orderRepo.deleteOrder(id);
  }
}
