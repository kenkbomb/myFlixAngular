import { Component,OnInit,Inject,Input, input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent implements OnInit {
  //@Input() Description :string = ""
  constructor(
    
    @Inject(MAT_DIALOG_DATA)
    public data:{
      Title:string,
      Tagline:string,
      Director:string,
      Genre:string,
      Release: string,

    Description:string
  }){
    
  }
ngOnInit(): void {
  
}

}
