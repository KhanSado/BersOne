import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PostService } from '../post-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, QuillModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit{

  newPostForm!: FormGroup

  editorModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      // Estilos de texto
      ['bold', 'italic', 'underline', 'strike'], 
      // Listas
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // Links e Imagens
      ['link', 'image'],
      // Limpar formatação
      ['clean']
    ]
  };

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      data: new FormControl('', [Validators.required]),
      autor: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    })
  }
  get data() {
    return this.newPostForm.get('data')!
  }
  get autor() {
    return this.newPostForm.get('autor')!
  }
  get title() {
    return this.newPostForm.get('title')!
  }
  get content() {
    return this.newPostForm.get('content')!
  }
  get category() {
    return this.newPostForm.get('category')!
  }



  registeNewPost(){
    this.service.createPost({
      id: "",
      data: this.data.value,
      autor: this.autor.value,
      title: this.title.value,
      content: this.content.value,
      category: this.category.value
    }).then(() => {
      this.data.reset();
      this.autor.reset();
      this.title.reset();
      this.content.reset();
      this.category.reset();
    }).catch((error) => {
      console.error('Erro ao criar Post: ', error);
    });
  }
}
