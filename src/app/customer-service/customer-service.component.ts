// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-customer-service',
//   templateUrl: './customer-service.component.html',
//   styleUrls: ['./customer-service.component.css']
// })
// export class CustomerServiceComponent {

// //  customer = {
// //     name: 'Jane Doe',
// //     email: 'janedoe@email.com',
// //     phone: '0912-345-6789',
// //     address: '123 Makati Avenue, Makati City'
// //   };

// //   editProfile() {
// //     alert('Edit profile clicked!');
// //   }
  
// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-service',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.css']
})

export class CustomerServiceComponent  {
  customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  };

  createAccount() {
    if (
      this.customer.name &&
      this.customer.email &&
      this.customer.phone &&
      this.customer.address &&
      this.customer.password
    ) {
      alert(`Account created successfully for ${this.customer.name}!`);
      console.log('New Account Created:', this.customer);
      this.customer = {
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
      };
    } else {
      alert('Please fill in all fields before creating an account.');
    }
  }
}
