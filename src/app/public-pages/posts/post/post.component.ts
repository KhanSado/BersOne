import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Card } from 'src/app/models/Card';
import { Cult } from 'src/app/models/Cult';
import { Post } from 'src/app/models/Post';
import { CultControlService } from 'src/app/pages/cult-control/service/cult-control.service';
import { PostService } from 'src/app/pages/posts/post-service.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PublicPostsService } from '../posts-service/posts.service';
import { BlogLayoutComponent } from "../../../blog-layout/blog-layout.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, BlogLayoutComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  id!: string;
  post: Post | undefined;
  cards: Card[] = [];

  constructor(private route: ActivatedRoute, private service: PublicPostsService) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('ID:', this.id);
    this.showDetails(this.id)
  }

  async showDetails(id: string) {
    try {
      const post = await this.service.findPostById(id);
      this.post = post;
      console.log(this.post);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
