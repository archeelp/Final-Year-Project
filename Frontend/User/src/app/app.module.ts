import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PollListComponent } from './components/client/poll-list/poll-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTagsModule} from 'ngx-tags';

@NgModule({
  declarations: [AppComponent, routingComponents, PollListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxTagsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
