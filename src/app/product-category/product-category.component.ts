import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  formData = {
    name: '',
    email: '',
    date: '',
    rolls: '1',
    message: ''
  };

  onSubmit(event: Event) {
    event.preventDefault();

    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual EmailJS public key

    // Send email
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: this.formData.name,
      from_email: this.formData.email,
      preferred_date: this.formData.date,
      number_of_rolls: this.formData.rolls,
      message: this.formData.message
    }).then(
      (response) => {
        console.log('SUCCESS!', respo
nse.status, response.text);