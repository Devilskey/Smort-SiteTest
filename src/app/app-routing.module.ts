import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountLoginCreateComponent } from './account-login-create/account-login-create.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { AccountsComponent } from './accounts/accounts.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: 'login', component:AccountLoginCreateComponent},
  {path: 'upload', component:UploadVideoComponent},
  {path: 'accounts/:Id', component:AccountsComponent},
  {path: 'EditAccount', component:EditAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
