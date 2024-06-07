import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getItems(); // Update the cart items
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, product) => total + parseFloat(product.precio), 0).toFixed(2);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
