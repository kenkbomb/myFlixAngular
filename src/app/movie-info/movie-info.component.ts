import { Component,OnInit,Inject } from '@angular/core';
/**used for injection of the data object into the mat dialog */
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
/**the movie info component, which displays all info of the selected movie */
export class MovieInfoComponent implements OnInit {
  
  constructor(
    
    @Inject(MAT_DIALOG_DATA)
    public data:{
      Title:string,
      Tagline:string,
      Director:string,
      Genre:string,
      Release: string,
      Description:string
  }){}
  
ngOnInit(): void {
  
}

}
