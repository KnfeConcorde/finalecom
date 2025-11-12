import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

interface BookingFormData {
  name: string;
  email: string;
  date: string;
  rolls: number;
  message: string;
}

@Component({
  selector: 'app-product-order',
  standalone: true,
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ProductOrderComponent implements OnInit {
  // EmailJS Configuration - Replace with your actual values
  private readonly EMAIL_SERVICE_ID = 'service_oe4f7b7';
  private readonly EMAIL_TEMPLATE_ID = 'template_v3zlvem';
  private readonly EMAIL_PUBLIC_KEY = '_ufdQINddLteRZ6dG';

  formData: BookingFormData = {
    name: '',
    email: '',
    date: '',
    rolls: 1,
    message: ''
  };

  submitted = false;
  isSubmitting = false;
  errorMessage = '';
  minDate: string;

  constructor() {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    // Initialize EmailJS with your public key
    emailjs.init(this.EMAIL_PUBLIC_KEY);
  }

  calculateTotal(): number {
    const pricePerRoll = 1200;
    const talentFee = 2000;
    return (this.formData.rolls * pricePerRoll) + talentFee;
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    
    if (!this.isFormValid() || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      // Prepare email parameters
      const emailParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        preferred_date: this.formatDate(this.formData.date),
        number_of_rolls: this.formData.rolls,
        additional_notes: this.formData.message || 'No additional notes',
        total_cost: this.calculateTotal(),
        // Add timestamp
        booking_date: new Date().toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short'
        })
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        this.EMAIL_SERVICE_ID,
        this.EMAIL_TEMPLATE_ID,
        emailParams
      );

      console.log('Email sent successfully:', response);
      this.submitted = true;
      
      // Reset form after 4 seconds
      setTimeout(() => {
        this.resetForm();
      }, 4000);

    } catch (error: any) {
      console.error('Failed to send email:', error);
      this.errorMessage = 'Failed to submit booking. Please try again or contact us directly.';
      this.isSubmitting = false;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name.trim() &&
      this.formData.email.trim() &&
      this.formData.date &&
      this.formData.rolls > 0
    );
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      date: '',
      rolls: 1,
      message: ''
    };
    this.submitted = false;
    this.isSubmitting = false;
    this.errorMessage = '';
  }
}