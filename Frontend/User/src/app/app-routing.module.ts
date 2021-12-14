import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewAllTokensComponent } from './components/view-all-tokens/view-all-tokens.component';
import { ProposeTokenComponent } from './components/propose-token/propose-token.component';
import { EditTokenComponent } from './components/edit-token/edit-token.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'view-all-tokens', pathMatch: 'full'},
      {path: 'view-all-tokens', component: ViewAllTokensComponent},
      {path: 'propose-token', component: ProposeTokenComponent},
      {path: 'edit-token', component: EditTokenComponent},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ViewAllTokensComponent,
    ProposeTokenComponent,
    EditTokenComponent
]