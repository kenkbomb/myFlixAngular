import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
/**the navbar component */
export class NavBarComponent {

  constructor(private router:Router){}

  user:any = localStorage.getItem("user");
  name:any = JSON.parse(this.user);
  
  getUser():string
{
  
  return this.name.Username;
}
/**log out and clear local storage and navigate to welcome page */
 logout():void
{
  localStorage.setItem('user',"");
  localStorage.setItem('token',"");
  alert("Logged Out");
  this.router.navigate(['welcome']);
  
}
/**routing functions, goto movies and profile views */
gotoMovies():void
{
  this.router.navigate(['movies']);
}
/**routing functions, goto movies and profile views */
gotoProfile():void{
this.router.navigate(['profile']);
}
}
