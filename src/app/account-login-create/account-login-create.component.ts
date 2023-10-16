import { Component, inject  } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { empty } from 'rxjs';
import { User } from '../Statics/User.Statics';

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
    profilePicture: null as string | null
  }


   constructor( private Http: HttpClient) { }

  Login() {
    this.Http.post("http://devilskey.nl:7245/users/Login", { email: this.data.email, password: this.data.password }, { responseType: 'text' }).subscribe((data) => {
        if (typeof data === 'string') {
          console.log("Yes " + data);
          User.token = data;
          window.localStorage.setItem('token', data);
        }

          const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data}`
          });

          this.Http.get<any>("http://devilskey.nl:7245/users/GetMyProfile", {headers: header}).subscribe((LoginData) => {
              if(LoginData != empty){
                console.log(LoginData)
                User.UserName = LoginData[0].Username;
                window.localStorage.setItem('Username', LoginData[0].Username);
                const PictureUse = "data:image/png;base64," + LoginData[0].Profile_Picture;
                User.ProfilePicture =  PictureUse;
                window.localStorage.setItem('pic',  PictureUse);

              }
            });
      });
  }
  CreateAccount(){
    console.log(this.data.profilePicture);

   this.Http.post("http://devilskey.nl:7245/users/CreateAccount", this.data, { responseType: 'text' })
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
