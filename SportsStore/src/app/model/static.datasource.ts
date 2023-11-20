import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable, from } from "rxjs";
import { Order } from "./order.model";

@Injectable()
export class StaticDataSource {
  private products: Product[] = [
    new Product(1, "Amy",         "Cats",     "Amy (Cats)",         100),
    new Product(2, "Kylie",       "Cats",     "Kylie (Cats)",       100),
    new Product(3, "Lulu",        "Cats",     "Lulu (Cats)",        100),
    new Product(4, "Yoko",        "Cats",     "Yoko (Cats)",        100),
    new Product(5, "Tini",        "Cats",     "Tini (Cats)",        100),
    new Product(6,  "Bernd",      "Dogs",     "Bernd (Dogs)",       100),
    new Product(7,  "Stefan",     "Dogs",     "Stefan (Dogs)",      100),
    new Product(8,  "Arne",       "Dogs",     "Arne (Dogs)",        100),
    new Product(9,  "Thorsten",   "Dogs",     "Thorsten (Dogs)",    100),
    new Product(10, "Frank",      "Dogs",     "FRank (Dogs)",       100),
    new Product(11, "Herbert",    "Hamster",  "Herbert (Hamster)",  100),
    new Product(12, "Igor",       "Hamster",  "Igor (Hamster)",     100),
    new Product(13, "John",       "Hamster",  "John (Hamster)",     100),
    new Product(14, "Mary",       "Hamster",  "Mary (Hamster)",     100),
    new Product(15, "Ben",        "Hamster",  "Ben (Hamster)",      100),
  ];
  getProducts(): Observable<Product[]> {
    return from([this.products]);
  }

  saveOrder(order: Order) : Observable<Order> {
    console.log(JSON.stringify(order));
    return from([order]);

  }
}
