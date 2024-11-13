import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PublicPostsService } from '../posts-service/posts.service';
import firebase from 'firebase/compat/app';
import { BlogLayoutComponent } from "../../../blog-layout/blog-layout.component";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, BlogLayoutComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements OnInit{

  lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null;

  hasMoreCults: boolean = true; 

  newCultForm!: FormGroup
  posts: Post[] = [];
  post: Post | undefined;

  filteredPosts: Post[] = [];
  categories = ['Quadrinhos', 'Tecnologia'];
  selectedCategory: string | null = null; // Armazena a categoria selecionada


  constructor(private service: PublicPostsService, private router: Router) { }

  ngOnInit(): void {
    this.findCults()
  }


  async findCults(limit: number = 5) {
    try {
      const { documents, lastVisible } = await this.service.findData(this.lastVisible, limit);
      if (documents && documents.length > 0) {
        this.posts = [...this.posts, ...documents];
        this.lastVisible = lastVisible;
        
        // Atualiza `filteredPosts` para exibir os últimos 6 posts de todas as categorias se nenhuma categoria for selecionada
        this.updateFilteredPosts();
        this.hasMoreCults = true;
      } else {
        console.log('Nenhum documento encontrado');
        this.hasMoreCults = false;
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  async loadMorePosts(limit: number) {
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

  filterByCategory(category: string): void {
    this.filteredPosts = this.posts.filter(post => post.category === category);
  }

  updateFilteredPosts() {
    if (this.selectedCategory) {
      // Se houver uma categoria selecionada, filtra os posts para mostrar apenas os dessa categoria
      this.filteredPosts = this.posts.filter(post => post.category === this.selectedCategory);
    } else {
      // Caso contrário, mostra os 6 posts mais recentes de qualquer categoria
      this.filteredPosts = this.posts.slice(-6);
    }
  }


}
