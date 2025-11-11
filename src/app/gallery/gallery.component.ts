import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-gallery',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  looks = [
    { image: 'assets/images/4.webp', caption: '— in Pierced Shadow', showCaption: false },
    { image: 'assets/images/7.webp', caption: '— in Obsidian Fold', showCaption: false },
    { image: 'assets/images/1.webp', caption: '— in Noir Halo', showCaption: false },
    { image: 'assets/images/8.webp', caption: '— in Shadow Blanc', showCaption: false },
    { image: 'assets/images/black.png', caption: '', showCaption: false },
    { image: 'assets/images/3.webp', caption: '— in Ash Mirage', showCaption: false },
    { image: 'assets/images/5.webp', caption: '— in Chalk Armor', showCaption: false },
    { image: 'assets/images/2.webp', caption: '— in Quicksilver', showCaption: false },
    { image: 'assets/images/6.webp', caption: '— in Ivory Static', showCaption: false },
    { image: 'assets/images/black.png', caption: '', showCaption: false },
    { image: 'assets/icon.png', caption: '', showCaption: false }
  ];

  toggleCaption(look: any) {
    look.showCaption = !look.showCaption;
  }
}
