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
/**the moviecard component, fetches and displays all movies as a list */
export class MovieCardComponent implements OnInit {

  movies:any[] = [];
  favs:any[] = [];
  user:any = localStorage.getItem("user");
  isFaved:boolean=false;
  favList:any[] = [];
  constructor(public fetchMovies:FetchApiService,public dialog:MatDialog,public snack:MatSnackBar){
  
  }
  //-----------------------------------------------------------------------------------------------
/**call getmovies and getfavs right away...*/
ngOnInit():void{
    this.getMovies();
    this.getFavs();
  }
  //---------------------------------------------------------------------------------------
  /**the getfavs function, retrieves a list of the users favorited movies */
getFavs():void{
    
    const ud = JSON.parse(this.user);
    console.log(ud.Favorites)
     this.favList = ud.Favorites;
    
    console.log(this.favList);
  }
/**gets the user */
getUser():void{
    this.user = localStorage.getItem("user");
  }
  //------------------------------------------------------------------------------------
/**gets all movies */
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
  /**compares the favsList and movies list to identify which movies to set as favs */
determineUserFavs(movie:string):any{
 if (this.favList.some((element) => element === movie)) {
    return true;
  } else {
    return false;
  }
}
//----------------------------------------------------------------------------------------------
/**adds a favorite movie to the users account by title */
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
/**removes a favorited movie from the users account by title */
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
  /**opens an info dialog displaying all info regarding the selected movie */
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
