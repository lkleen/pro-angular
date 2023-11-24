import { Injectable } from "@angular/core";
import { Product } from "./product.model";

class CartLine {
  constructor(public product: Product, public quantity: number) {
  }
}

@Injectable()
export class Cart {
  private products: Map<number, CartLine> = new Map<number, CartLine>();
  public lines: CartLine[] = [];
  public totalItems: number = 0;
  public totalPrice: number = 0;

  addLine (product: Product, quantity: number) {

    let cartLine: CartLine = this.products.get(product.id) || new CartLine(product, 0);
    cartLine.quantity += quantity;
    this.products.set(product.id, cartLine);
    this.update ();
  }

  updateQuantity (product: Product, quantity: number) {
    let cartLine: CartLine = this.products.get(product.id) || new CartLine(product, 0);
    cartLine.quantity = quantity;
    this.products.set(product.id, cartLine);
    this.update ();
  }

  removeLine (id: number) {
    this.products.delete(id);
    this.update ();
  }

  clear() {
    this.products = new Map<number, CartLine>();
    this.totalPrice = 0;
    this.totalItems = 0;
  }

  private update () {
    this.totalItems = 0;
    this.totalPrice = 0;
    this.lines = [];
    for (let cartLine of this.products.values()) {
      this.totalItems += Number(cartLine.quantity);
      this.totalPrice += cartLine.quantity * cartLine.product.price;
      this.lines.push(cartLine);
    }
  }
}
