import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { RouterModule } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';

@Component({
  selector: 'app-blog-layout',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],  // Adicione CommonModule aqui
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss']
})
export class BlogLayoutComponent {
  isDropdownOpen = false;

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  currentYear: number = new Date().getFullYear();
}
