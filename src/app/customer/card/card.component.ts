import { Product } from 'src/app/model/Product';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product!: Product;
  @Output() viewDetails = new EventEmitter<number>();
  quantity:number=1;

 constructor(private cartService: CartService) {}

onAddToCart(product: Product) {
    // Replace this with actual logged-in user's ID
    const userId = 1; // TODO: get from AuthService

    const cartItemDTO = {
      userId: userId,
      productId: product.productId,
      quantity: this.quantity
    };

    this.cartService.addToCart(cartItemDTO).subscribe({
      next: (response) => alert(`${product.title} added to cart!`),
      error: (err) => alert('Failed to add to cart: ' + (err?.error?.message || 'Unknown error'))
    });
  }

  viewDetailsEvent() {
    console.log('Card clicked, emitting product id:', this.product?.productId);
    if (this.product && this.product.productId !== undefined && this.product.productId !== null) {
      this.viewDetails.emit(this.product.productId);
    }
  }
}


