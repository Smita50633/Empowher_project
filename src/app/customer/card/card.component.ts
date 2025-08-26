import { Product } from 'src/app/model/Product';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product!: Product;
  @Output() viewDetails = new EventEmitter<number>();
  @Input() addToCart!: (product: Product) => void;

  viewDetailsEvent() {
    console.log('Card clicked, emitting product id:', this.product?.id);
    if (this.product && this.product.id !== undefined && this.product.id !== null) {
      this.viewDetails.emit(this.product.id);
    }
  }
}


