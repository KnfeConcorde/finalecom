import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;
  shippingFee: number = 150;
  customerId = 1; 

  constructor(private cartService: CartService, private router:Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart(this.customerId).subscribe({
      next: (data) => {
        console.log('Cart data received:', data);
        // json-server returns an array directly, but handle both array and object responses
        if (Array.isArray(data)) {
          this.cart = data.filter(i => i.status === 0 || i.status === 'Created');
        } else if (data && Array.isArray(data.orderitem)) {
          // Handle nested response if needed
          this.cart = data.orderitem.filter((i: any) => i.status === 0 || i.status === 'Created');
        } else {
          this.cart = [];
        }
        console.log('Cart items after filtering:', this.cart);
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        console.error('Error details:', {
          status: err.status,
          message: err.message,
          url: err.url
        });
        alert(`Failed to load cart. Error: ${err.status || 'Unknown'}. Make sure the backend is running at http://localhost:8080`);
      },
    });
  }

  calculateTotal(): void {
    // Calculate subtotal based on price * quantity for each item
    const subtotal = this.cart.reduce(
      (sum, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[₱,]/g, ''));
        const quantity = item.quantity || 1;
        return sum + (price * quantity);
      },
      0
    );
    // Add shipping fee only if cart has items
    this.total = subtotal + (this.cart.length > 0 ? this.shippingFee : 0);
    console.log('Cart total calculated:', {
      subtotal,
      shippingFee: this.shippingFee,
      total: this.total,
      itemCount: this.cart.length
    });
  }

  increaseQuantity(index: number): void {
    const item = this.cart[index];
    item.quantity++;
    this.updateItem(item);
  }

  decreaseQuantity(index: number): void {
    const item = this.cart[index];
    if (item.quantity > 1) {
      item.quantity--;
      this.updateItem(item);
    }
  }

  removeItem(index: number): void {
    const item = this.cart[index];
    if (!item || !item.id) {
      console.error('Cannot remove item: missing id', item);
      alert('Cannot remove item. Please try again.');
      return;
    }

    console.log('Removing item:', item);
    this.cartService.deleteItem(item.id).subscribe({
      next: () => {
        console.log('Item deleted successfully, reloading cart...');
        // Reload cart from server to ensure sync
        this.loadCart();
      },
      error: (err) => {
        console.error('Error removing item:', err);
        alert(`Failed to remove item: ${err.message || 'Unknown error'}. Please try again.`);
      },
    });
  }

  clearCart(): void {
    // Check if cart is empty
    if (this.cart.length === 0) {
      console.log('Cart is already empty');
      return;
    }

    // Confirm before clearing
    if (!confirm('Are you sure you want to clear all items from your cart?')) {
      return;
    }

    // Filter out items without IDs
    const validItems = this.cart.filter(item => item && item.id);
    
    if (validItems.length === 0) {
      console.warn('No valid items to delete');
      this.cart = [];
      this.calculateTotal();
      return;
    }

    console.log('Clearing cart:', validItems.length, 'items');
    const deleteCalls = validItems.map((item) =>
      this.cartService.deleteItem(item.id)
    );

    forkJoin(deleteCalls).subscribe({
      next: () => {
        console.log('Cart cleared successfully, reloading...');
        // Reload cart from server to ensure sync
        this.loadCart();
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
        alert(`Failed to clear cart: ${err.message || 'Unknown error'}. Please try again.`);
        // Reload cart anyway to show current state
        this.loadCart();
      }
    });
  }

private updateItem(item: any): void {
  if (!item || !item.id) {
    console.error('Cannot update item: missing id', item);
    return;
  }

  console.log('Updating item:', item);
  this.cartService.updateCartItem(item).subscribe({
    next: () => {
      console.log('Item updated successfully, reloading cart...');
      this.loadCart();
    }, 
    error: (err) => {
      console.error('Error updating item:', err);
      alert(`Failed to update item: ${err.message || 'Unknown error'}. Please try again.`);
      // Reload cart to show current state
      this.loadCart();
    },
  });
}

  goToProducts() {
    this.router.navigate(['/product']);
  }

  showReceipt: boolean = false;
  showThankYou = false;
  purchaseDate: Date = new Date();

  checkout(): void {
    this.purchaseDate = new Date(); 
    this.showReceipt = true;
  }

  closeReceipt(): void {
    this.showReceipt = false;
  }

  confirmPurchase(): void {
    const updates$ = this.cart.map(item =>
    this.cartService.updateCartItem({ ...item, status: 1 }) 
  );

  forkJoin(updates$).subscribe({
    next: () => {
      this.showReceipt = false;
      this.showThankYou = true;

      this.cart = [];
      this.calculateTotal();
    },
    error: (err) => {
      console.error('Confirm failed', err);
      alert('Confirm failed — please try again.');
    }
  });
  }

  closeThankYou() {
    this.showThankYou = false;
  }

}
