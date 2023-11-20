import { Injectable } from "@angular/core";
import { Product } from "./product.model";

class CartLine {
  constructor(public product: Product, public quantity: number) {
  }
}

@Injectable()
export class Cart {
  public products: Map<number, CartLine> = new Map<number, CartLine>();
  public totalItems: number = 0;
  public totalPrice: number = 0;

  addLine (product: Product, quantity: number) {
    let cartLine: CartLine = this.products.get(product.id) || new CartLine(product, 0);
    cartLine.quantity += quantity;
    this.products.set(product.id, cartLine);
    this.updateTotals ();
  }

  updateQuantity (product: Product, quantity: number) {
    let cartLine: CartLine = this.products.get(product.id) || new CartLine(product, 0);
    cartLine.quantity = quantity;
    this.products.set(product.id, cartLine);
    this.updateTotals ();
  }

  removeLine (id: number) {
    this.products.delete(id);
    this.updateTotals();
  }

  clear() {
    this.products = new Map<number, CartLine>();
    this.totalPrice = 0;
    this.totalItems = 0;
  }

  private updateTotals () {
    this.totalItems = 0;
    this.totalPrice = 0;
    for (let cartLine of this.products.values()) {
      this.totalItems += Number(cartLine.quantity);
      this.totalPrice += cartLine.quantity * cartLine.product.price;
    }
  }
}
