import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PublishNewTokenComponent } from './components/publish-new-token/publish-new-token.component';
import { TokenRequestsComponent } from './components/token-requests/token-requests.component';
import { ViewAllTokensComponent } from './components/view-all-tokens/view-all-tokens.component';


const routes: Routes = [
  {path: '', redirectTo: 'view-token-requests', pathMatch: 'full'},
  {path: 'view-token-requests', component: TokenRequestsComponent},
  {path: 'publish-new-token', component: PublishNewTokenComponent},
  {path: 'view-all-tokens', component: ViewAllTokensComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  TokenRequestsComponent,
  PublishNewTokenComponent,
  ViewAllTokensComponent,
  PageNotFoundComponent
];
