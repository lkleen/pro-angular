import { Injectable } from "@angular/core";
import { Product } from "./product.model"
import { RestDataSource } from "./rest.datasource";
import {Observable} from "rxjs";

@Injectable()
export class ProductRepository {
  // Map<category, product>
  private products: Map<string, Product[]> = new Map<string, Product[]>();
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
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

  private addProduct(product: Product) {
    if (!this.products.has(product.category)) {
      this.products.set(product.category, []);
      this.categories.push(product.category);
    }
    this.products.get(product.category)?.push(product);
  }

  private removeProduct(id: number) {
    for (let category of this.products.keys()) {
      let products = this.products.get(category) ?? [];
      let index = products.findIndex(p => {return p.id == id});
      if (index != -1) {
        products.splice(index, 1);
        return;
      }
    }
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

  saveProduct(product: Product) {
    if (product.id == 0) {
      this.dataSource.saveProduct(product)
        .subscribe(p => this.addProduct(p));
    } else {
      this.dataSource.updateProduct(product)
        .subscribe(p => {
          let product = this.getProduct(p.id);
          product = p;
        })

    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(
      p => {this.removeProduct(id);}
    )
  }

  getCategories(): string[] {
    return this.categories;
  }
}
