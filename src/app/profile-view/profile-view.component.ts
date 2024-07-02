import { Component,OnInit,Output,Input } from '@angular/core';
import { FetchApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
user0:any = JSON.parse(localStorage.getItem("user")||'');
favList:[] = this.user0.Favorites;
favTitles:any = [""];
constructor(public fetchApiData:FetchApiService,public snack:MatSnackBar,private router:Router){
   
}
@Input() confirm = "";
ngOnInit():void{
 
  this.getUserData();
  this.getFavs();
 
}
deleteAccount():void{
  if(this.confirm==="unsubscribe")
    {
  
  const name = this.user0.Username;
  this.fetchApiData.deleteUser(name).subscribe((resp)=>
  {
    console.log(resp);
  })
  }
  this.snack.open("account deleted!","OK",{duration:2000});
  localStorage.clear();
  this.router.navigate(['welcome']);
  if(this.confirm!="unsubscribe"){ alert("please type 'unsubscribe' into the textbox above to unsubscribe...");}
}


getFavs():any{
  this.fetchApiData.getAllMovies().subscribe((resp)=>
  {
   
    this.favList.some((element)=>
    {
      for(let i=0;i<resp.length;i++)
        {
          if(element===resp[i]._id)
            {
              console.log(resp[i].Title);
            
             this.favTitles.push(resp[i].Title);
            }
        }
    })
  })
}

@Output() userData ={Username:this.user0.Username,Password:this.user0.Password, Email:this.user0.Email,Birthday: this.user0.Birthday.slice(0,10),Favorites:this.user0.Favorites};

updateUser():void{
  this.fetchApiData.editUser(this.userData,this.user0.Username).subscribe((Response)=>{
    console.log(Response);
  })
  localStorage.setItem("user",JSON.stringify(this.userData));

  this.snack.open("user details updated","OK",{duration:2000});
  this.user0 = JSON.parse(localStorage.getItem('user')||"");
  console.log(this.userData);
  console.log(this.user0);
}

getUserData():void{
   
   console.log(this.user0);
}


}
