import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from 'src/app/models/Post';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class PublicPostsService implements OnInit {

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

  async findPostById(id: string): Promise<Post | undefined> {
    try {
      const docRef = this.firestore.collection('posts').doc(id);
      const docSnapshot = await docRef.get().toPromise();
  
      if (docSnapshot && docSnapshot.exists) {
        console.log(docSnapshot.data() as Post);
        
        return docSnapshot.data() as Post;
      } else {
        console.log('Documento não encontrado');
        return undefined;
      }
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
      throw error;
    }
  }

  async findData(lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null, limit: number=2): Promise<PaginatedPost> {
    try {
      let collectionRef = this.firestore.collection('posts', ref => ref.orderBy('data', 'desc').limit(limit));
  
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
  
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1] as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  
      return { documents, lastVisible: lastDocument };
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }
}

interface PaginatedPost {
  documents: Post[];
  lastVisible: firebase.firestore.DocumentSnapshot | null;
}