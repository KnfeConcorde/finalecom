import { Component } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent {
  rolls: number = 1;
  total: number = 0;
  talentFee: number = 2000;
  pricePerRoll: number = 1200;

  // Replace these with your actual EmailJS credentials
  serviceID = 'service_oe4f7b7';
  templateID = 'template_v3zlvem';
  publicKey = '_ufdQINddLteRZ6dG';

  ngOnInit() {
    this.updateTotal();
  }

  updateTotal() {
    this.total = (this.rolls * this.pricePerRoll) + this.talentFee;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    // Collect form values
    const templateParams = {
      name: (form.querySelector('#name') as HTMLInputElement).value,
      email: (form.querySelector('#email') as HTMLInputElement).value,
      date: (form.querySelector('#date') as HTMLInputElement).value,
      rolls: this.rolls,
      total: this.total.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' }),
      message: (form.querySelector('#message') as HTMLTextAreaElement).value
    };

    // Send the email
    emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
      .then(() => {
        alert('✅ Booking request sent successfully! Check your email.');
        form.reset();
        this.rolls = 1;
        this.updateTotal();
      })
      .catch((error) => {
        console.error('❌ Failed to send booking email:', error);
        alert('Something went wrong while sending your booking. Please try again later.');
      });
  }
}
