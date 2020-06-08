import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodolistComponent} from './components/todolist/todolist.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {BoardUserComponent} from './components/board-user/board-user.component';
import {BoardModeratorComponent} from './components/board-moderator/board-moderator.component';
import {BoardAdminComponent} from './components/board-admin/board-admin.component';
import {DashboardComponent} from './components/home/dashboard.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: TodolistComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
