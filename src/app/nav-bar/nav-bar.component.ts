import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private router:Router){}

  user:any = localStorage.getItem("user");
  name:any = JSON.parse(this.user);
  
  getUser():string
{
  console.log(this.name.Username);
  return this.name.Username;
}
 logout():void
{
  localStorage.setItem('user',"");
  localStorage.setItem('token',"");
  alert("Logged Out");
  this.router.navigate(['welcome']);
  
}
gotoMovies():void
{
  this.router.navigate(['movies']);
}
gotoProfile():void{
this.router.navigate(['profile']);
}
}
