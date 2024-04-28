import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../Objects/VideosObject';
import { Api } from '../Statics/Api.Statics';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  VideoData: Video[] = [];
  VideoPlaying!: Video;
  VideoLink: string = "";
  NextVideoLink:String="";
  videoNumber:number = 0;
  CreatedAt!: string;
  Title: string = "";
  UsernameUploaded: string = "";
  UserPage: string = "";
  Description: string = "";
  videoId:number = Number(this.activatedRoute.snapshot.paramMap.get('id'));


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient){
    console.log(`Video Id is ${this.videoId}`);
   }

  ngOnInit(): void {
    if( this.videoId === 0){
      this.http.get<any>(`${Api.URL}Video/GetVideoList`).subscribe((data:Video[]) => {
      this.VideoData = data;

      this.VideoPlaying = this.VideoData[0];
      this.VideoLink = `${Api.URL}Video/GetVideo?videoId=` + this.VideoPlaying.Id;
      this.NextVideoLink = `${Api.URL}Video/GetVideo?videoId=${this.VideoData[1].Id}`


      this.Title =  this.VideoPlaying.Title;
      this.CreatedAt =  this.VideoPlaying.Created_At;
      this.Description =  this.VideoPlaying.Description;
      this.UsernameUploaded = this.VideoPlaying.Username;
      this.UserPage = `/accounts/${this.VideoPlaying.User_Id}`;
      });
    }
    else
    {
        this.http.get<any>(`${Api.URL}Video/GetVideoFromId?id=${this.videoId}`).subscribe((data:Video[]) => {
        this.VideoData = data;

        this.VideoPlaying = this.VideoData[0];
        

        this.VideoLink = `${Api.URL}Video/GetVideo?videoId=` + this.VideoPlaying.Id;
        this.NextVideoLink = `${Api.URL}Video/GetVideo?videoId=${this.VideoData[1].Id}`

        this.Title =  this.VideoPlaying.Title;
        this.CreatedAt =  this.VideoPlaying.Created_At;
        this.Description =  this.VideoPlaying.Description;
        this.UsernameUploaded = this.VideoPlaying.Username;
        this.UserPage = `/accounts/${this.VideoPlaying.User_Id}`;
      });
    }
  }

  Like(){
  }
  
  Dislike(){
  }

  Next(){
    if(this.videoNumber === this.VideoData.length-2)
      this.http.get<any>(`${Api.URL}Video/GetVideoList`).subscribe((data:Video[]) => {
        this.VideoData.push(data[0]);
        this.videoNumber += 1;

        this.SwitchVideo(this.VideoData[this.videoNumber], this.VideoData[this.videoNumber + 1]);

      });
    else{
      this.videoNumber += 1;

      this.SwitchVideo(this.VideoData[this.videoNumber], this.VideoData[this.videoNumber + 1]);

    
    }
  }

  SwitchVideo(NewVideo:Video, NextVideo:Video){
    this.VideoLink = `${Api.URL}Video/GetVideo?videoId=${NewVideo.Id}`;
    this.NextVideoLink = `${Api.URL}Video/GetVideo?videoId=${NextVideo.Id}`

    console.log(this.VideoLink);

    this.Title =  NewVideo.Title;
    this.CreatedAt =  NewVideo.Created_At;
    this.Description =  NewVideo.Description;
    this.UsernameUploaded = NewVideo.Username;
    this.UserPage = `/accounts/${NewVideo.User_Id}`;
  }

  Back(){
    if( this.videoNumber === 0)
     return;

    this.videoNumber -= 1;

    this.VideoPlaying = this.VideoData[this.videoNumber];
    let LastVideo = this.VideoData[this.videoNumber + 1];

    this.VideoLink = `${Api.URL}Video/GetVideo?videoId=${this.VideoPlaying.Id}`;
    this.NextVideoLink = `${Api.URL}Video/GetVideo?videoId=${LastVideo.Id}`


    this.Title =  this.VideoPlaying.Title;
    this.CreatedAt =  this.VideoPlaying.Created_At;
    this.Description =  this.VideoPlaying.Description;
    this.UsernameUploaded = this.VideoPlaying.Username;
    this.UserPage = `/accounts/${this.VideoPlaying.User_Id}`;
  }
}