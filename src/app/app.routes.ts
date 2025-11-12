import { Routes } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
  { path: '', component: MainBodyComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'customer', component: CustomerServiceComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'booking', component: ProductOrderComponent }
];