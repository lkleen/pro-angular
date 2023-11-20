import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
  selector: "store",
  templateUrl: "store.component.html"
})
export class StoreComponent {
  public selectedCategory: string | undefined;
  public productsPerPage: number = 4;
  public selectedPage: number = 1;

  constructor(private repo: ProductRepository) {
  }

  changeCategory(category?: string) {
    this.selectedCategory = category;
  }

  get products(): Product[] {
    let productsPerPage: number = Number(this.productsPerPage);
    let pageIndex = (this.selectedPage - 1) * productsPerPage;
    let pageEnd = pageIndex + productsPerPage;
    return this
      .repo
      .getProducts(this.selectedCategory)
      .slice(pageIndex, pageEnd);
  }

  changePage(page: number) {
    this.selectedPage = page;
  }

  changePageSize(size: number) {
    this.productsPerPage = size;
    this.changePage(1);
  }

  get pageCount(): number {
    let products = this.repo.getProducts(this.selectedCategory);
    return Math.ceil(products.length / this.productsPerPage);
  }

  get categories(): string[] {
    return this.repo.getCategories();
  }

}
