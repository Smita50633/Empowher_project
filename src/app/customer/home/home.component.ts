import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  allProducts: Product[] = [];
  cart: Product[] = [];
  quantity:number=1;
  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products initially
  loadProducts(): void {
    this.productService.listAllProducts().subscribe({
      next: (response: any[]) => {
        console.log('All products:', response);
        this.products = response.map(this.mapProduct);
        this.allProducts = [...this.products];
      },
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  // Map API response to Product object
  private mapProduct(p: any): Product {
    return {
      productId: p.productId,
      title: p.title,
      description: p.description,
      quantity: p.availableQuantity,
      price: p.price,
      category: p.category,
      categoryId: p.categoryId
    };
  }

  // Called whenever filters are changed in header
onFiltersChanged(filters: any): void {
  console.log('Filters received in Home:', filters);

  const searchText = filters.searchText?.trim() || '';
  const categoryId = filters.selectedCategory ? filters.selectedCategory : null;
  const maxPrice = filters.maxPrice ?? 5000;
  const sortMapping: any = { lowToHigh: 'priceAsc', highToLow: 'priceDesc', newest: 'newest' };
  const sortParam = sortMapping[filters.sortBy] || '';

  if (searchText) {
    // Search takes priority
    this.productService.searchProducts(searchText).subscribe({
      next: (response: any[]) => {
        console.log('Search results:', response);
        this.products = response.map(this.mapProduct);

        // Optional: apply frontend sorting if needed
        if (sortParam) {
          this.applyFrontendSort(sortParam);
        }
      },
      error: (err) => console.error('Search API error:', err)
    });
    return;
  }

  // Filter + Sort API call
  this.productService.filterProducts(categoryId, 0, maxPrice, sortParam).subscribe({
    next: (response: any[]) => {
      console.log('Filtered products:', response);
      this.products = response.map(this.mapProduct);
    },
    error: (err) => console.error('Filter API error:', err)
  });
}

// Optional: frontend sorting fallback
applyFrontendSort(sortParam: string) {
  if (sortParam === 'priceAsc') this.products.sort((a, b) => a.price - b.price);
  if (sortParam === 'priceDesc') this.products.sort((a, b) => b.price - a.price);
  if (sortParam === 'newest') this.products.sort((a, b) => b.productId - a.productId); // or use creation date if available
}


  // Add product to cart
  addToCart(product: Product): void {
  if (!product?.productId) {
    console.error('Invalid product ID:', product);
    return;
  }

  // Replace this with actual logged-in user's ID
  const userId = 1; // TODO: get from AuthService

  const cartItemDTO = {
    userId: userId,
    productId: product.productId,
    quantity: this.quantity
  };

  this.cartService.addToCart(cartItemDTO).subscribe({
    next: () => alert(`${product.title} added to cart!`),
    error: (err) => alert('Failed to add to cart: ' + (err?.error?.message || 'Unknown error'))
  });
}

  // Navigate to product detail page
  viewDetailsEvent(productID: number): void {
    if (productID != null) {
      this.router.navigate(['/customer/product-detail', productID]);
    } else {
      alert('Product ID is missing!');
    }
  }
}
