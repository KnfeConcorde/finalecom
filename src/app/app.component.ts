import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,             // ✅ Make it standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,            // ✅ For <app-header>
    FooterComponent,            // ✅ For <app-footer>
    RouterOutlet                // ✅ For <router-outlet>
  ]
})
export class AppComponent {
  title = 'finalecom';
}
