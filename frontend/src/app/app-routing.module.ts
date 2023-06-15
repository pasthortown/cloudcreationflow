import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('src/app/login/login.module').then(m=>m.LoginModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/layout/layout.module').then(m=>m.LayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
