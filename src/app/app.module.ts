import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountLoginCreateComponent } from './account-login-create/account-login-create.component';
import { FormsModule } from '@angular/forms';
import { UploadVideoComponent } from './upload-video/upload-video.component'; 
import { User } from './Statics/User.Statics';
import { AccountsComponent } from './accounts/accounts.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    AccountLoginCreateComponent,
    UploadVideoComponent,
    AccountsComponent,
    EditAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ],
  providers: [  ],
  bootstrap: [AppComponent, User]
})
export class AppModule { }
