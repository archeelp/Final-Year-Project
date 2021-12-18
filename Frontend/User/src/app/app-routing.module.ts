import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/client/dashboard/dashboard.component';
import { ViewTokenComponent } from './components/client/view-token/view-token.component';
import { ProposeTokenComponent } from './components/client/propose-token/propose-token.component';
import { EditTokenComponent } from './components/client/edit-token/edit-token.component';
import { TokenComponent } from './components/user/token/token.component';
import { AllTokensComponent } from './components/user/all-tokens/all-tokens.component';
import { PollListComponent } from './components/client/poll-list/poll-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tokens', component: AllTokensComponent },
  { path: 'token-details/:id', component: TokenComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'view-token', pathMatch: 'full' },
      { path: 'view-token', component: ViewTokenComponent },
      { path: 'propose-token', component: ProposeTokenComponent },
      { path: 'edit-token', component: EditTokenComponent },
      { path: 'poll-list', component: PollListComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  AllTokensComponent,
  TokenComponent,
  DashboardComponent,
  ViewTokenComponent,
  ProposeTokenComponent,
  EditTokenComponent,
];
