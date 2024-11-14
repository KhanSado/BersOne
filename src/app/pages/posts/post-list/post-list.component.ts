import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PostService } from '../post-service.service';
import { Post } from 'src/app/models/Post';
import { FormGroup } from '@angular/forms';
import 'firebase/compat/firestore'; // Importa Firestore corretamente no modo compat
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{

  lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null;

  hasMorePosts: boolean = true; 


  newCultForm!: FormGroup
  posts: Post[] = [];
  post: Post | undefined;

  constructor(private service: PostService, private router: Router) { }

  ngOnInit(): void {
    this.findPosts()
  }

  deletePost(docId: string) {
    this.service.deletePost(docId)
      .then(() => {
        console.log('Pos excluído com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao excluir documento: ', error);
      });
  }

  async findPosts(limit: number = 5) {
    try {
      const { documents, lastVisible } = await this.service.findPosts(this.lastVisible, limit);

      if (documents && documents.length > 0) {
        this.posts = [...this.posts, ...documents]; 
        this.lastVisible = lastVisible;
        this.hasMorePosts = true;
      } else {
        console.log('Nenhum documento encontrado');
        this.hasMorePosts = false; 
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  async loadMorePosts(limit: number) {
    try {
      if (this.lastVisible) {
        await this.findPosts(limit);
      }
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error);
    }
  }

  async showDetails(id: string) {
    try {
      this.router.navigate(['/admin/posts/post-details/', id]);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
