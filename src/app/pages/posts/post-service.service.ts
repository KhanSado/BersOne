import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from 'src/app/models/Post';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {

  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();
  
  constructor(private firestore: AngularFirestore,  private auth: AngularFireAuth) { }

  ngOnInit(): void {}

  getCurrentUserId(): Promise<string | null> {
    return this.auth.currentUser.then(user => user ? user.uid : null);
  }
  
  async getUserDocumentId(userId: string): Promise<string> {
    try {
      const querySnapshot = await this.firestore.collection('users', ref => ref.where('userId', '==', userId)).get().toPromise();
      
      if (!querySnapshot || querySnapshot.empty) {
        throw new Error('User document not found');
      }
  
      const userDoc = querySnapshot.docs[0];
      return userDoc.id;
    } catch (error) {
      console.error('Error fetching user document:', error);
      throw new Error('Erro ao recuperar o documento do usuário');
    }
  }
  

  async findPosts(lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null, limit: number=2): Promise<PaginatedPost> {
    try {
      let collectionRef = this.firestore.collection('posts', ref => ref.orderBy('data', 'desc').limit(limit));
  
      // Se houver um último documento visível, continuar a partir desse ponto
      if (lastVisible) {
        collectionRef = this.firestore.collection('posts', ref => ref
          .orderBy('data', 'desc')
          .startAfter(lastVisible)
          .limit(limit));
      }
  
      const querySnapshot = await collectionRef.get().toPromise();
  
      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return { documents: [], lastVisible: null };
      }
  
      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return { documents: [], lastVisible: null };
      }
  
      const documents: Post[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Post);
      });
  
      // Pega o último documento para a próxima paginação
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1] as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  
      return { documents, lastVisible: lastDocument };
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }
  

  async createPost(params: Post): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário não está autenticado."
        });
        throw new Error('Usuário não autenticado');
      }
  
      const userDocId = await this.getUserDocumentId(userId);
  
      if ((params.data.toString().length > 0)
        && (params.autor.length > 0)
        && (params.title.length > 0)
        && (params.content.length > 0)) {

        const postsRef = await this.firestore.collection('posts').add({
          data: params.data,
          title: params.title,
          autor: params.autor,
          content: params.content,
          category: params.category,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`posts/${postsRef.id}`).update({ id: postsRef.id });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novo Post adicionado",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, preencha todos os campos."
        });
        throw new Error('Invalid input');
      }
    } catch (error) {
      console.error('Error creating Post:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o post"
      });
    }
  }

 // Função para carregar os posts
 loadPosts() {
  this.firestore.collection<Post>('posts').valueChanges({ idField: 'id' })
    .subscribe(posts => {
      this.postsSubject.next(posts);
    });
}

// Função de exclusão com confirmação e atualização da lista
async deletePost(docId: string): Promise<void> {
  try {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!"
    });

    if (result.isConfirmed) {
      await this.firestore.collection("posts").doc(docId).delete();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Post excluído com sucesso",
        showConfirmButton: true,
        confirmButtonText: "Ok",
        timer: 1500
      });

      // Recarrega a lista de posts
      this.loadPosts();
    }
  } catch (error) {
    console.error('Erro ao excluir o post:', error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ocorreu um erro ao excluir o post"
    });
  }
}
}

interface PaginatedPost {
  documents: Post[];
  lastVisible: firebase.firestore.DocumentSnapshot | null;
}