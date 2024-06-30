import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FetchApiService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {

  movies:any[] = [];
  favs:any[] = [];
  user:any = localStorage.getItem("user");
  isFaved:boolean=false;
  favList:any[] = [];
  constructor(public fetchMovies:FetchApiService,public dialog:MatDialog,public snack:MatSnackBar){
  
  }
  //-----------------------------------------------------------------------------------------------
// call getmovies and getfavs right away...
  ngOnInit():void{
    this.getMovies();
    this.getFavs();
  }
  //---------------------------------------------------------------------------------------
  getFavs():void{
    
    const ud = JSON.parse(this.user);
    console.log(ud.Favorites)
     this.favList = ud.Favorites;
    
    console.log(this.favList);
  }
  getUser():void{
    this.user = localStorage.getItem("user");
  }
  //------------------------------------------------------------------------------------
  getMovies():void{
    this.fetchMovies.getAllMovies().subscribe((resp:any)=>
      {
        this.movies = resp;
        console.log(this.movies);
       
        return this.movies;
      }
  
  );
  }
  //--------------------------------------------------------------------------------------
determineUserFavs(movie:string):any{
 if (this.favList.some((element) => element === movie)) {
    return true;
  } else {
    return false;
  }
}
//----------------------------------------------------------------------------------------------
  addFavorite(id:string):void{
    const ud = JSON.parse(this.user);
    this.fetchMovies.addFav(ud.Username,id).subscribe((resp:any)=>
    {
      console.log(resp);
      this.isFaved = true;
      this.favList.push(id);
      localStorage.setItem('user',JSON.stringify(resp));
      
    })
    this.snack.open("Movie Added To Favs!",'OK',{duration:1000});
   
  }
  //-------------------------------------------------------------------------------------------

  removeFavorite(id:string):void{
    const ud = JSON.parse(this.user);
    this.fetchMovies.removeFavorite(ud.Username,id).subscribe((resp)=>
    {
     localStorage.setItem('user',JSON.stringify(resp));
     this.getUser();//reset and reload the user data 
     this.getFavs();//reset and reload the favslist from the new updated user data
    })
    this.snack.open("Movie Removed From Favs",'OK',{duration:1000})
   
   
  }
  //---------------------------------------------------------------------------------------------
  openInfoDialog(title:string,description:String,tagline:string,director:string,genre:string,release:string):void{
   
    this.dialog.open(MovieInfoComponent,{
      width:'500px',
      data:{Title:title,Tagline:tagline,
        Description:description,Director:director,Genre:genre,Release:release}
    });
    }

    openGenreDialog(genre:string):void{
      
    }

}
