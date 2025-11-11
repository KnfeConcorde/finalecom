import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
concern = {
    name: '',
    email: '',
    message: ''
  };

  createMessage() {
    if (
      this.concern.name &&
      this.concern.email &&
      this.concern.message
    ) {
      alert(`Message successfully sent from ${this.concern.name}!`);
      console.log('New Message:', this.concern);
      this.concern = {
        name: '',
        email: '',
        message: ''
      };
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }

}
