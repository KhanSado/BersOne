import { Component } from '@angular/core';
import { BlogLayoutComponent } from "../../../blog-layout/blog-layout.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BlogLayoutComponent,RouterModule ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
