import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../Statics/Api.Statics';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Statics/User.Statics';
import { ThumbnailObject } from '../Objects/ThumbnailObject';
import { GetProfileObject } from '../Objects/GetProfileObject';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  
  Followers:number = 0;
  userData: typeof User = User;

  Thumbnails!:ThumbnailObject[];

  Account = {
    UserName: "",
    Profilepicture: "",
    FollowerCount: 200,
  }
  token = User.token;

  header = new HttpHeaders({
   'Authorization': `Bearer ${this.token}`
   });
  
  IsFollowing:boolean = false;

  UserId: number = 0;
  ApiUrlGetThumbnail = `${Api.URL}Images/GetImage?ImageId=`;


  constructor(private activatedRoute: ActivatedRoute, private http:HttpClient){
    this.UserId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.UserId === 0){
      this.GetMyFollowers();
      this.getMyAccount();
      this.GetMyThumbnail();
    }else{
      this.getProfile();
      this.GetFollowers();
      this.FollowingOrNot();
      this.GetThumbnail();
    }
  }

  AreFollowButtonsNeeded():boolean{
    if(this.UserId == 0)
        return false;
    if(this.Account.UserName == User.UserName)
      return false;
    return true
  }


  ngOnInit(): void {
  }

  GetThumbnail(){
    this.http.get<ThumbnailObject[]>(`${Api.URL}Video/GetThumbnailUserList?id=${this.UserId}`, { headers: this.header })
    .subscribe((data:any) => {
      this.Thumbnails = data;

    });
  }

  GetMyThumbnail(){
    this.http.get<ThumbnailObject[]>(`${Api.URL}Video/GetMyThumbnail`, { headers: this.header })
    .subscribe((data:any) => {
      this.Thumbnails = data;

    });
  }
  

  GetFollowers(){
    this.http.post<number>(`${Api.URL}users/FollowersAmount?id=${this.UserId}`, { headers: this.header, responseType: 'text' })
    .subscribe((data) => {
      this.Account.FollowerCount = data;
    });
  }

  GetMyFollowers() {
    this.http.get<number>(`${Api.URL}users/MyFollowersAmount`, { headers: this.header })
    .subscribe((data) => {
      this.Account.FollowerCount = data;
    });
  }

  FollowingOrNot(){
    this.http.post<any>(`${Api.URL}users/AlreadyFollowing?id=${this.UserId}`, null, {headers: this.header })
      .subscribe((data) => {
        this.IsFollowing = data;
      });
  }

  FollowUser(){
    console.log(`${this.UserId} ` + this.userData.Id)
    if(this.UserId != 0 && this.userData.UserName != this.Account.UserName)

      this.http.post(`${Api.URL}users/FollowUser?id=${this.UserId}`,null, { headers: this.header, responseType: 'text' })
      .subscribe((data) => {
        this.IsFollowing = true;
        this.Account.FollowerCount += 1;
      });
  }

  UnFollowUser(){
      this.http.delete(`${Api.URL}users/UnFollowUser?creatorId=${this.UserId}`, { headers: this.header, responseType: 'text' })
      .subscribe((data) => {
        this.IsFollowing = false;
        this.Account.FollowerCount -= 1;
      });
  }



  getMyAccount(){
    this.http.get<GetProfileObject>(`${Api.URL}users/GetMyProfile`, {headers: this.header}).subscribe((LoginData:GetProfileObject) => {
      if(LoginData != undefined){
        console.log(LoginData)
        User.UserName = LoginData.username;
        this.Account.UserName = LoginData.username;
        window.localStorage.setItem('Username', LoginData.username);

        if(LoginData.profile_Picture === null || LoginData.profile_Picture === undefined)
        {
          this.Account.Profilepicture = "../../../assets/Smort_Logo.png";
        }
        else
        {
          const PictureUse = `${Api.URL}Images/GetImage?ImageId=${LoginData.profile_Picture}`;
          User.ProfilePicture =  PictureUse;
          this.Account.Profilepicture = PictureUse;
          window.localStorage.setItem('pic',  PictureUse);
        }
      }
    });
  }

  getProfile(){
    const token = User.token;
      this.http.get<any>(`${Api.URL}users/GetUserDataProfile?id=${this.UserId}`)
      .subscribe((data) => {
        if(data != undefined){
          this.Account.UserName = data[0].Username;

          if (data[0].Profile_Picture === null) 
          {
            this.Account.Profilepicture = "../../../assets/Smort_Logo.png";
          }
          else
          {
            const PictureUse = `${Api.URL}Images/GetImage?ImageId=${data[0].Profile_Picture}`;
            this.Account.Profilepicture = PictureUse;
          }
          console.log(data)
        }
      });
  }

}
