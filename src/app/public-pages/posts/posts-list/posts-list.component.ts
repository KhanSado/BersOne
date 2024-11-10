import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PublicPostsService } from '../posts-service/posts.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit{

  lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null;

  hasMoreCults: boolean = true; 

  newCultForm!: FormGroup
  posts: Post[] = [];
  post: Post | undefined;

  constructor(private service: PublicPostsService, private router: Router) { }

  ngOnInit(): void {
    this.findCults()
  }


  async findCults(limit: number = 5) {
    try {
      // Chama o serviço para buscar os cultos com paginação
      const { documents, lastVisible } = await this.service.findData(this.lastVisible, limit);

      if (documents && documents.length > 0) {
        this.posts = [...this.posts, ...documents]; // Adiciona os novos cultos à lista existente
        this.lastVisible = lastVisible; // Atualiza o último documento visível para paginação
        this.hasMoreCults = true; // Existem mais cultos
      } else {
        console.log('Nenhum documento encontrado');
        this.hasMoreCults = false; // Não há mais cultos para carregar
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  async loadMoreCults(limit: number) {
    try {
      if (this.lastVisible) {
        await this.findCults(limit);
      }
    } catch (error) {
      console.error('Erro ao carregar mais cultos:', error);
    }
  }

  async showDetails(id: string) {
    try {
      this.router.navigate(['/blog/post/read/', id]);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }

  limitWords(content: string, limit: number = 20): string {
    if (!content) return '';
    const words = content.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : content;
  }
}
