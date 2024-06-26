import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../Statics/User.Statics';
import { Api } from '../Statics/Api.Statics';


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  selectVideo!:File;
  selectImage!: File;
  data = {
    fileName: "",
    mediaData:  null as string | null,
    title: "",
    description: "",
    Thumbnail:  null as string | null,

  }


  constructor( private Http: HttpClient) { }

  PrepareThumbnail(event:any){
    this.selectVideo = event.target.files[0];
    this.encodeFileToBase64Image();
  }

  PrepareVideo(event:any){
      this.selectVideo = event.target.files[0];
      this.encodeFileToBase64Video();
  }

  UploadVideo(){
   const token = User.token;

   console.log(token);

   const header = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });

    console.log(header)

    this.Http.post(`${Api.URL}Videos/UploadVideo`, this.data, { headers: header, responseType: 'text' })
    .subscribe((data) => {
      if (typeof data === 'string') {
        if(data === "Video Saved")  
          return;
      }
    });
  }

  encodeFileToBase64Image() {
    if (this.selectVideo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          this.data.fileName = this.selectVideo.name;
          const Image = event.target.result as string;
          const parts = Image.split(',');
          if (parts.length === 2) {
            this.data.Thumbnail = parts[1];
          }
        }
      };
      reader.readAsDataURL(this.selectVideo);
    }
  }

  encodeFileToBase64Video() {
    if (this.selectVideo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          this.data.fileName = this.selectVideo.name;
          const Image = event.target.result as string;
          const parts = Image.split(',');
          if (parts.length === 2) {
            this.data.mediaData = parts[1];
          }
        }
      };
      reader.readAsDataURL(this.selectVideo);
    }
  }
}


