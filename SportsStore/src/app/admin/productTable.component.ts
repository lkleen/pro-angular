import {Component, IterableDiffer, IterableDiffers} from "@angular/core";
import {ProductRepository} from "../model/product.repository";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../model/product.model";

@Component({
  templateUrl: "productTable.component.html"
})
export class ProductTableComponent {
  colsAndRows: string[] = ["id","name","category","price","buttons"];
  dataSource = new MatTableDataSource(this.repo.getProducts());
  differ: IterableDiffer<Product>;

  constructor(private repo: ProductRepository, differs: IterableDiffers) {
    this.differ = differs.find(this.repo.getProducts()).create();
  }

  ngDoCheck() {
    let changes = this.differ?.diff(this.repo.getProducts());
    if (changes != null) {
      this.dataSource.data = this.repo.getProducts();
    }
  }

  deleteProduct(id: number) {
    this.repo.deleteProduct(id);
  }

}
