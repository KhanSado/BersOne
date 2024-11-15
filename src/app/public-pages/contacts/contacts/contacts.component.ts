import { Component } from '@angular/core';
import { BlogLayoutComponent } from "../../../blog-layout/blog-layout.component";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [BlogLayoutComponent, SharedModule, RouterModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  onSubmit() {
    // Lógica para processar os dados do formulário
    console.log('Formulário enviado!');
  }
}
