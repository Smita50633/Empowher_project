import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// Removed missing AdminDashboardComponent import


@NgModule({
  declarations: [
    DashboardComponent,
  // Removed missing AdminDashboardComponent declaration
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
