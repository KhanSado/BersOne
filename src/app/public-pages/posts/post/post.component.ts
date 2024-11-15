import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Card } from 'src/app/models/Card';
import { Post } from 'src/app/models/Post';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PublicPostsService } from '../posts-service/posts.service';
import { BlogLayoutComponent } from "../../../blog-layout/blog-layout.component";
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  sanitizedContent: SafeHtml | undefined;

  constructor(private route: ActivatedRoute, private service: PublicPostsService,  private analytics: AngularFireAnalytics, private sanitizer: DomSanitizer) {
  }

  trackPageView(postId: string): void {
    this.analytics.logEvent('screen_view', {
      screen_name: `Post${postId}`,
      screen_class: `PostComponent`
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.showDetails(this.id)
    this.trackPageView(this.id)
  }

  async showDetails(id: string) {
    try {
      const post = await this.service.findPostById(id);
      this.post = post;
      if (post?.content) {
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(post.content);
      }
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
