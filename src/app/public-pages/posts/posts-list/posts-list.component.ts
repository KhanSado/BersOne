import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PublicPostsService } from '../posts-service/posts.service';
import firebase from 'firebase/compat/app';
import { BlogLayoutComponent } from "../../../blog-layout/blog-layout.component";
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';


@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, BlogLayoutComponent],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null;

  hasMorePosts: boolean = true;

  newCultForm!: FormGroup;
  posts: Post[] = [];
  filteredPosts: Post[] = [];  // Lista de posts filtrados
  selectedCategory: string = '';  // Categoria selecionada
  isDropdownOpen: boolean = false;

  constructor(private service: PublicPostsService, private router: Router, private analytics: AngularFireAnalytics) { }

  ngOnInit(): void {
    this.trackPageView()
    this.findPosts(); // Carrega posts ao inicializar o componente
  }


  trackPageView(): void {
    this.analytics.logEvent('screen_view', {
      screen_name: 'Blog Home',
      screen_class: 'PostsListComponent'
    });
  }
  
  // Método para buscar posts
  async findPosts(limit: number = 6) {
    try {
      const { documents, lastVisible } = await this.service.findData(this.lastVisible, limit);

      if (documents && documents.length > 0) {
        this.posts = [...this.posts, ...documents];
        this.lastVisible = lastVisible;

        this.updateFilteredPosts();  // Atualiza os posts filtrados
        this.hasMorePosts = true;
      } else {
        console.log('Nenhum documento encontrado');
        this.hasMorePosts = false; 
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  // Método para carregar mais posts
  async loadMorePosts(limit: number) {
    try {
      if (this.lastVisible) {
        await this.findPosts(limit);
      }
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error);
    }
  }

  // Método para exibir os detalhes do post
  async showDetails(id: string) {
    try {
      this.router.navigate(['/blog/post/read/', id]);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }
  }

  // Método para limitar a quantidade de palavras exibidas no conteúdo do post
  limitWords(content: string, limit: number = 20): string {
    if (!content) return '';
    const words = content.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : content;
  }

  // Método que atualiza os posts filtrados
  updateFilteredPosts() {
    if (this.selectedCategory === '') {
      this.filteredPosts = [...this.posts];  // Se não houver categoria selecionada, mostra todos os posts
    } else {
      this.filteredPosts = this.posts.filter(post => post.category === this.selectedCategory);  // Filtra pelos posts da categoria selecionada
    }
  }

  // Método para filtrar os posts pela categoria selecionada
  filterPostsByCategory(category: string) {
    this.selectedCategory = category;
    this.updateFilteredPosts();  // Atualiza os posts filtrados quando a categoria mudar
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
