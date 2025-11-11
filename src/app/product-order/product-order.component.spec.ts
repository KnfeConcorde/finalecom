import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-booking',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent {
  formData = {
    name: '',
    email: '',
    date: '',
    rolls: '1',
    message: ''
  };

  onSubmit(event: Event) {
    event.preventDefault();

    emailjs.init('YOUR_PUBLIC_KEY'); // ✅ Replace with your EmailJS public key

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: this.formData.name,
      from_email: this.formData.email,
      preferred_date: this.formData.date,
      number_of_rolls: this.formData.rolls,
      message: this.formData.message
    }).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Booking submitted successfully!');
      },
      (error) => {
        console.error('FAILED...', error);
        alert('There was an error sending your booking.');
      }
    );
  }
}
