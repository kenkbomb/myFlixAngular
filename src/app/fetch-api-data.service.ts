
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb-162c62e51cf6.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}

    );
  }

  public getMovie(title:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/'+ title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  getUser(): Observable<any> {
    //console.log(JSON.stringify(localStorage.getItem('user')));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const ud = JSON.parse("");
    console.log(ud);
    console.log(localStorage.getItem("token"));
    return user;
  }

  refreshUser(userName:string):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/'+ userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getGenre(genre:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/'+genre, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getDirector(director:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/'+director, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public getFavs(userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/'+userName+"/favs", {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public addFav(userName:string,movie_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const favmov = {MovieID:movie_id}
    return this.http.put(apiUrl + 'users/'+userName+"/favs/", favmov, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
   public editUser(userDetails:any,userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    //console.log(JSON.stringify(userDetails) + " are the user details");
    console.log(userDetails.Username);
    let body = userDetails;
    //body =JSON.parse(body);
   // console.log(body) + " this is the body")
   JSON.stringify(body);
   console.log(body);
    return this.http.put<any>(apiUrl + 'users/'+userDetails.Username,body, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
        
        
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 public deleteUser(userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/'+userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //-------------------------------------------------------------------------------------------
   public removeFavorite(userName:string,movie_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    const favmov = {MovieID:movie_id}
    return this.http.delete(apiUrl + 'users/'+userName+"/favs/"+movie_id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //-------------------------------------------------------------------------------------
// Non-typed response extraction
  public extractResponseData(res: Object): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`+error);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}