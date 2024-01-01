import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../Objects/VideosObject';
import { Api } from '../Statics/Api.Statics';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  VideoData: Video[] = [];
  VideoPlaying!: Video;
  VideoLink: string = "";
  videoNumber:number = 0;
  CreatedAt!: string;
  Title: string = "";
  UsernameUploaded: string = "";
  UserPage: string = "";
  Description: string = "";


  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.http.get<any>(`${Api.URL}Video/GetVideoList`).subscribe((data:Video[]) => {
    this.VideoData = data;

    this.VideoPlaying = this.VideoData[0];
    this.VideoLink = `${Api.URL}Video/GetVideo?videoId=` + this.VideoPlaying.Id;

    this.Title =  this.VideoPlaying.Title;
    this.CreatedAt =  this.VideoPlaying.Created_At;
    this.Description =  this.VideoPlaying.Description;
    this.UsernameUploaded = this.VideoPlaying.Username;
    this.UserPage = `/accounts/${this.VideoPlaying.User_Id}`;
    });
  }

  Like(){
  }
  
  Dislike(){
  }

  Next(){
    console.log(this.videoNumber)
    console.log(this.VideoData)
    if(this.videoNumber === this.VideoData.length-1)
      this.http.get<any>(`${Api.URL}Video/GetVideoList`).subscribe((data:Video[]) => {
        this.VideoData.push(data[0]);
        this.videoNumber += 1;

        this.SwitchVideo(this.VideoData[this.videoNumber]);

      });
    else{
      this.videoNumber += 1;

      this.SwitchVideo(this.VideoData[this.videoNumber]);

    
    }
  }

  SwitchVideo(NewVideo:Video){
    this.VideoLink = `${Api.URL}Video/GetVideo?videoId=${NewVideo.Id}`;

    console.log(this.VideoLink);

    this.Title =  NewVideo.Title;
    this.CreatedAt =  NewVideo.Created_At;
    this.Description =  NewVideo.Description;
  }

  Back(){
    console.log(this.videoNumber)
    if( this.videoNumber === 0)
     return;

    this.videoNumber -= 1;

    this.VideoPlaying = this.VideoData[this.videoNumber];
    this.VideoLink = `${Api.URL}Video/GetVideo?videoId=${this.VideoPlaying.Id}`;

    this.Title =  this.VideoPlaying.Title;
    this.CreatedAt =  this.VideoPlaying.Created_At;
    this.Description =  this.VideoPlaying.Description;
  }
}