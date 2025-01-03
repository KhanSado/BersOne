export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: '',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: '/home',
        icon: 'feather icon-home'
      },


      // {
      //   path: 'posts/post-details/:id',
      //   loadComponent: () => import('./pages/posts/post-detail/post-detail.component').then(m => m.PostDetailComponent),
      //   canActivate: [AuthGuard, RoleGuard],
      //   data: { roles: ['admin']}
      // },
      // {
      //   path: 'posts/new',
      //   loadComponent: () => import('./pages/posts/new-post/new-post.component').then(m => m.NewPostComponent),
      //   canActivate: [AuthGuard, RoleGuard],
      //   data: { roles: ['admin']}
      // },
      // {
      //   path: 'posts/list',
      //   loadComponent: () => import('./pages/posts/post-list/post-list.component').then(m => m.PostListComponent),
      //   canActivate: [AuthGuard, RoleGuard],
      //   data: { roles: ['admin']}
      // }

      {
                id: 'posts',
                title: 'Postagens',
                type: 'collapse',
                icon: 'feather icon-clipboard',
                children: [
                  {
                    id: 'posts-list',
                    title: 'Posts',
                    type: 'item',
                    url: '/admin/posts/list'
                  },
                  {
                    id: 'post-new',
                    title: 'Novo Post',
                    type: 'item',
                    url: '/admin/posts/new'
                  }
                ]
              }
      // {
      //   id: 'anuncio',
      //   title: 'Anúnciar',
      //   type: 'item',
      //   url: '/announcement',
      //   icon: 'feather icon-box'
      // },
//       {
//         id: 'cult-control',
//         title: 'Controle de Culto',
//         type: 'collapse',
//         icon: 'feather icon-clipboard',
//         children: [
//           {
//             id: 'cults-dashboard',
//             title: 'Cultos',
//             type: 'item',
//             url: '/cult-control/dashboard'
//           },
//           {
//             id: 'visit-dashboard',
//             title: 'Visitas',
//             type: 'item',
//             url: '/cult-control/visitor-list'
//           },
//           {
//             id: 'new-cult',
//             title: 'Novo Culto',
//             type: 'item',
//             url: '/cult-control/new'
//           },
//           {
//             id: 'new-visitor',
//             title: 'Novo Visitante',
//             type: 'item',
//             url: '/cult-control/visitor'
//           },
//           {
//             id: 'new-recep-team',
//             title: 'Nova Equipe de Recepcão',
//             type: 'item',
//             url: '/cult-control/reception-team'
//           }
//         ]
//   },
//   {
//     id: 'ebd-control',
//     title: 'Escola Bíblica Dominical',
//     type: 'collapse',
//     icon: 'feather icon-book',
//     children: [
//       {
//         id: 'classroom-dashboard',
//         title: 'Aulas Registradas',
//         type: 'item',
//         url: 'ebd-control/classroom-dashboard'
//       },
//       {
//         id: 'new-professor',
//         title: 'Novo Professor',
//         type: 'item',
//         url: 'ebd-control/new-professor'
//       },
//       {
//         id: 'new-class',
//         title: 'Nova Turma',
//         type: 'item',
//         url: 'ebd-control/new-class'
//       },
//       {
//         id: 'new-classroom',
//         title: 'Nova Aula',
//         type: 'item',
//         url: 'ebd-control/new-classroom'
//       },
//       {
//         id: 'new-student',
//         title: 'Novo Aluno',
//         type: 'item',
//         url: 'ebd-control/new-student'
//       }
//     ]
// },
    ]
  },
];

