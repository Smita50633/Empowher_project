import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartItem, CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
 cartItems: CartItem[] = [];   // will store items from backend


  constructor(private cartService: CartService,private router:Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(id: number) {
    this.cartService.removeCartItem(id).subscribe(() => {
      this.loadCart(); // refresh after removal
    });
  
  }
  toOrderDetail(){
this.router.navigate(['customer/order-detail']);
  }
}
