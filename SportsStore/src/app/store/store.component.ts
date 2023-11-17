import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
  selector: "store",
  templateUrl: "store.component.html"
})
export class StoreComponent {
  public selectedCategory: string | undefined;

  constructor(private repo: ProductRepository) {
  }

  changeCategory(category?: string) {
    this.selectedCategory = category;
  }

  get products(): Product[] {
    return this.repo.getProducts(this.selectedCategory);
  }

  get categories(): string[] {
    return this.repo.getCategories();
  }

}
