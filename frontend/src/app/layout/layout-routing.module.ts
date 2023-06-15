import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'main',
          loadChildren: () => import('src/app/layout/main-page/main-page.module').then(m=>m.MainPageModule)
        },
        {
          path: 'not-found',
          loadChildren: () => import('src/app/layout/not-found-page/not-found-page.module').then(m=>m.NotFoundPageModule)
        },
        {
          path: '**',
          redirectTo: 'not-found'
        }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}
