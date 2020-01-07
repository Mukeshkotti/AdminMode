import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_helpers/auth.guards';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'category-addEdit', component: CategoryAddEditComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
