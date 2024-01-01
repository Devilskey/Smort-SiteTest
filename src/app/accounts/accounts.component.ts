import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../Statics/Api.Statics';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  
  UserId: number = 0;
  VideoLink = `${Api.URL}Video/GetThumbnail?videoId=1`;

  constructor(private activatedRoute: ActivatedRoute){
    this.UserId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

}
