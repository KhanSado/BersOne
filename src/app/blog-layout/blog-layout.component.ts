import { Component } from '@angular/core';
import { SharedModule } from "../theme/shared/shared.module";

@Component({
  selector: 'app-blog-layout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './blog-layout.component.html',
  styleUrl: './blog-layout.component.scss'
})
export class BlogLayoutComponent {

}
