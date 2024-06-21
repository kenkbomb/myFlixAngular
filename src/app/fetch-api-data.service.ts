
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
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  getMovie(title:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/'+ title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  getUser(userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/'+userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  getGenre(genre:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/'+genre, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  getDirector(director:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/'+director, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  getFavs(userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/'+userName+"/favs", {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  addFav(userName:string,movie_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/'+userName+"/favs/"+movie_id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  editUser(userDetails:any,userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.patch(apiUrl + 'users/'+userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  deleteUser(userName:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/'+userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
  removeFavorite(userName:string,movie_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/'+userName+"/favs/"+movie_id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.toString),
      catchError(this.handleError)
    );
  }
// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}