import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard,MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private router:Router){}

 logout():void
{
  localStorage.setItem('user',"");
  localStorage.setItem('token',"");
  alert("logout pressed");
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
