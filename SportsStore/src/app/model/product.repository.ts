import { Injectable } from "@angular/core";
import { Product } from "./product.model"
import { StaticDataSource} from "./static.datasource";

@Injectable()
export class ProductRepository {
  private products: Map<string, Product[]> = new Map<string, Product[]>();
  private categories: string[] = [];

  constructor(private dataSource: StaticDataSource) {
    dataSource.getProducts().subscribe(data =>
      data.forEach(entry => {
        if (!this.products.has(entry.category)) {
          this.products.set(entry.category, []);
          this.categories.push(entry.category);
        }
        this.products.get(entry.category)?.push(entry);
      })
    );
  }

  getProducts(category?: string): Product[] {
    let value: Product[] | undefined;
    if (category !== undefined) {
      value = this.products.get (category);
    } else {
      value = [];
      for (let products of this.products.values()) {
        products.forEach(product => {value?.push(product)});
      }
    }
    return (value === undefined) ? [] : value;
  }

  getProduct(id: number) {
    for (let products of this.products.values()) {
      let match = products.find(predicate => {return predicate.id === id;});
      if (match !== undefined) {
        return match;
      }
    }
    return undefined;
  }

  getCategories(): string[] {
    return this.categories;
  }
}
