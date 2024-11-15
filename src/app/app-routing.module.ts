// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/blog/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'ebd', 'cult', 'praise'] } // Adicione as roles permitidas aqui

      },
 


      //Tela de não autoizado
      {
        path: 'route-not-authorized',
        loadComponent: () => import('./pages/not-authorized/not-authorized.component').then(m => m.NotAuthorizedComponent),
        canActivate: [AuthGuard]
      },


      {
        path: 'admin/posts/post-details/:id',
        loadComponent: () => import('./pages/posts/post-detail/post-detail.component').then(m => m.PostDetailComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin']}
      },
      {
        path: 'admin/posts/new',
        loadComponent: () => import('./pages/posts/new-post/new-post.component').then(m => m.NewPostComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin']}
      },
      {
        path: 'admin/posts/list',
        loadComponent: () => import('./pages/posts/post-list/post-list.component').then(m => m.PostListComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin']}
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'admin/auth/signup',
        loadComponent: () => import('./pages/authentication/sign-up/sign-up.component')
      },
      {
        path: 'admin/auth/signin',
        loadComponent: () => import('./pages/authentication/sign-in/sign-in.component')
      },

      //public
      {
        path: 'blog/post/read/:id',
        loadComponent: () => import('./public-pages/posts/post/post.component').then(m => m.PostComponent)
      },
      {
        path: 'blog/home',
        loadComponent: () => import('./public-pages/posts/posts-list/posts-list.component').then(m => m.PostsListComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


