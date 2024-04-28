import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Statics/User.Statics';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],

})
export class NavBarComponent implements OnInit{

  userData: typeof User = User;
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    console.log(User.UserName)
  }

  MenuOpen() {
    var x = document.getElementById("dropdown-content")!;
    console.log( x.style.display )
    x.style.display = "flex";

  }

  MenuClose() {
    var x = document.getElementById("dropdown-content")!;
    x.style.display = "none";
  }

  toggleMenu() {
    var x = document.getElementById("dropdown-content")!;
    x.style.display = "flex";
  }

  SignOut(){
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('Username');
    window.localStorage.removeItem('pic');
    User.UserName = "";
    User.token = "";
    User.ProfilePicture = "";
  }
}