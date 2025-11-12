import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductOrderService } from '../service/product-order.service';
import  emailjs  from '@emailjs/browser';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css'],
  standalone: true,
  imports: [
    CommonModule, // provides *ngIf, pipes like number
    FormsModule   // provides ngModel
  ],
  providers: [DecimalPipe]
})
export class ProductOrderComponent {
  // Properties referenced in template
  formData = {
    name: '',
    email: '',
    date: '',
    rolls: 1,
    message: ''
  };
  
  submitted = false;
  isSubmitting = false;
  errorMessage = '';
  minDate = new Date().toISOString().split('T')[0];

  constructor(private productOrderService: ProductOrderService) {}

  calculateTotal() {
    const rollPrice = 1200;
    const talentFee = 2000;
    return this.formData.rolls * rollPrice + talentFee;
  }

 onSubmit(event: Event) {
  event.preventDefault();
  this.isSubmitting = true;

  const orderData = {
    ...this.formData,
    total: this.calculateTotal()
  };

  // 1️⃣ Save to database first
  this.productOrderService.createOrder(orderData).subscribe({
    next: () => {
      // 2️⃣ Send EmailJS email
      const templateParams = {
        name: orderData.name,
        email: orderData.email,
        date: orderData.date,
        rolls: orderData.rolls,
        message: orderData.message,
        total: orderData.total
      };
      emailjs.init('_ufdQINddLteRZ6dG');

      emailjs.send('service_oe4f7b7', 'template_v3zlvem', templateParams)
        .then(
          (response) => {
            console.log('Email sent successfully!', response);
            this.submitted = true;
            this.isSubmitting = false;
          },
          (err) => {
            console.error('Email failed to send', err);
            this.errorMessage = 'Order saved, but failed to send email.';
            this.isSubmitting = false;
          }
        );
    },
    error: (err: any) => {
      console.error(err);
      this.errorMessage = 'Something went wrong. Please try again.';
      this.isSubmitting = false;
    }
  });
}
}
