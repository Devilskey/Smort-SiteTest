import { Component, inject  } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { empty } from 'rxjs';
import { User } from '../Statics/User.Statics';
import { Api } from '../Statics/Api.Statics';
import { GetProfileObject } from '../Objects/GetProfileObject';

@Component({
  selector: 'app-account-login-create',
  templateUrl: './account-login-create.component.html',
  styleUrls: ['./account-login-create.component.css']
})
export class AccountLoginCreateComponent {
  LoginScherm: boolean = true;
  selectedFile: File | null = null;
  data = {
    email:  "",
    password:  "",
    username:  "",
    profilePicture: "",
  }

  constructor( private Http: HttpClient) { }

  Login() {
    this.Http.post(`${Api.URL}users/Login`, { email: this.data.email, password: this.data.password }, { responseType: 'text' }).subscribe((data) => {
        if (typeof data === 'string') {
          console.log("Yes " + data);
          User.token = data;
          window.localStorage.setItem('token', data);
        }

          const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data}`
          });

          this.Http.get<GetProfileObject>(`${Api.URL}users/GetMyProfile`, {headers: header}).subscribe((LoginData:GetProfileObject) => {
              if(LoginData != null){
                console.log(LoginData)
                window.localStorage.setItem('id', LoginData.username);
                User.UserName = LoginData.username;
                window.localStorage.setItem('username', LoginData.username);
                const PictureUse = `${Api.URL}Images/GetImage?ImageId=${LoginData.profile_Picture}`;
                User.ProfilePicture =  PictureUse;
                window.localStorage.setItem('pic',  PictureUse);

              }
            });
      });
  }
  CreateAccount(){
    console.log(this.data.profilePicture);

   this.Http.post(`${Api.URL}users/CreateAccount`, this.data, { responseType: 'text' })
    .subscribe((data) => {
      if (typeof data === 'string') {
        if(data === "User Created")  
          this.LoginScherm = true;
      }
    });
  }

  SwitchLogin(Login: boolean){
    this.LoginScherm = Login
  }

  prepareImage(event: any){
    this.selectedFile = event.target.files[0];
    this.encodeFileToBase64();
  }
  encodeFileToBase64() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const Image = e.target.result as string;
          const parts = Image.split(',');
          if (parts.length === 2) {
            this.data.profilePicture = parts[1];
          }
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
