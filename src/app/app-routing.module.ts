// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//  {
//     path: '',
//     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
//   },
//   {
//     path: 'admin',
//     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
//   },
//   {
//     path: 'customer',
//     loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
//   },
//   { path: '**', redirectTo: '', pathMatch: 'full' }  ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }



// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

