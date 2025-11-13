import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Print {
  id: string;
  title: string;
  location: string;
  description: string;
  filmType: string;
  edition: string;
  imageUrl: string;
  price: number;
}

interface OrderData {
  printId: string;
  size: string;
  finish: string;
  quantity: number;
  name: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-prints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  prints: Print[] = [];
  selectedPrint: Print | null = null;
  orderSubmitted = false;
  isSubmitting = false;
  errorMessage = '';

  orderData: OrderData = {
    printId: '',
    size: '',
    finish: '',
    quantity: 1,
    name: '',
    email: '',
    address: ''
  };

  private apiUrl = 'http://localhost:8080/api'; // Update with your Maven backend URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPrints();
  }

  loadPrints(): void {
    // Fetch prints from backend
    this.http.get<Print[]>(`${this.apiUrl}/prints`).subscribe({
      next: (data) => {
        this.prints = data;
      },
      error: (error) => {
        console.error('Error loading prints:', error);
        this.errorMessage = 'Failed to load prints. Please try again later.';
        
        // Fallback sample data for development
        this.prints = [
          {
            id: '1',
            title: 'White Dreams',
            location: 'Pasay City',
            description: 'Captured beneath the warm mall lights, and an accidental double exposure.',
            filmType: 'Fujicolor C400',
            edition: '10 of 25',
            imageUrl: './assets/images/whitedreams.jpg',
            price: 800
          },
          {
            id: '2',
            title: 'Seven Suiseis',
            location: 'Pasay City',
            description: 'Street photography showcasing the pulse of city life.',
            filmType: 'Fujicolor C400',
            edition: '5 of 20',
            imageUrl: './assets/images/sevensuiseis.jpg',
            price: 950
          },
          {
            id: '3',
            title: 'GSR Racing Miku',
            location: 'Pasay City',
            description: 'A portrait of cosplayer Mitsu Hime in her cosplay portrayal of Hatsune Miku\'s racing outfit of 2025',
            filmType: 'Fuji Pro 400H',
            edition: '8 of 30',
            imageUrl: './assets/images/goodsmilemiku.jpg',
            price: 850
          }
        ];
      }
    });
  }

  selectPrint(print: Print): void {
    this.selectedPrint = print;
    this.orderData.printId = print.id;
    this.orderData.size = '';
    this.orderData.finish = '';
    this.orderData.quantity = 1;
    this.orderSubmitted = false;
    this.errorMessage = '';
  }

  closeModal(): void {
    this.selectedPrint = null;
    this.resetForm();
  }

  updatePrice(): void {
    // Trigger change detection for price update
  }

  calculateSubtotal(): number {
    if (!this.selectedPrint || !this.orderData.size) return 0;
    
    let basePrice = this.selectedPrint.price;
    
    // Apply size multiplier
    if (this.orderData.size === '8x10') {
      basePrice *= 1.5;
    } else if (this.orderData.size === '11x14') {
      basePrice *= 2;
    }
    
    return basePrice * this.orderData.quantity;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + 150; // 150 shipping fee
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.isSubmitting || this.orderSubmitted) return;
    
    this.isSubmitting = true;
    this.errorMessage = '';

    const orderPayload = {
      ...this.orderData,
      subtotal: this.calculateSubtotal(),
      shipping: 150,
      total: this.calculateTotal(),
      printTitle: this.selectedPrint?.title
    };

    // Submit order to backend
    this.http.post(`${this.apiUrl}/orders`, orderPayload).subscribe({
      next: (response) => {
        console.log('Order submitted successfully:', response);
        this.orderSubmitted = true;
        this.isSubmitting = false;
        
        setTimeout(() => {
          this.closeModal();
        }, 2000);
      },
      error: (error) => {
        console.error('Error submitting order:', error);
        this.errorMessage = 'Failed to submit order. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.orderData = {
      printId: '',
      size: '',
      finish: '',
      quantity: 1,
      name: '',
      email: '',
      address: ''
    };
    this.orderSubmitted = false;
    this.errorMessage = '';
  }
}