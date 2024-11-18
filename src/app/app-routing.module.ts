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
        redirectTo: '/blog',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin'] }
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
        path: 'blog/',
        loadComponent: () => import('./public-pages/posts/posts-list/posts-list.component').then(m => m.PostsListComponent)
      },

      {
        path: 'blog/service-terms',
        loadComponent: () => import('./public-pages/legals/service-terms/service-terms/service-terms.component').then(m => m.ServiceTermsComponent)
      },
      {
        path: 'blog/privacity-police',
        loadComponent: () => import('./public-pages/legals/privacity-police/privacity-police/privacity-police.component').then(m => m.PrivacityPoliceComponent)
      },

      {
        path: 'blog/about',
        loadComponent: () => import('./public-pages/about/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'blog/contacts',
        loadComponent: () => import('./public-pages/contacts/contacts/contacts.component').then(m => m.ContactsComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


