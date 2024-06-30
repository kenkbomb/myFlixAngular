import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})

export class UserLoginFormComponent {

  //const router = new Router();

  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: FetchApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router:Router
  ){}

  loginUser():void{
    this.fetchApiData.userLogin(this.userData).subscribe((result)=>{
      console.log(JSON.stringify(result.user));//log the result to the console.
      this.dialogRef.close();//close the modal
      this.snackBar.open("Logged in " + result.user.Username +"!", 'OK', { duration: 2000});//similar to ALERT message
      const data = {
        _id:result.user._id,
        Username:result.user.Username,
        Password:this.userData.Password,
        Email:result.user.Email,
        Birthday:result.user.Birthday,
        Favorites:result.user.Favorites
      }
      console.log(data);
      console.log(result);
      localStorage.setItem('user',JSON.stringify(data));//JSON.stringfy here on result.user...
      localStorage.setItem('token',result.token);
      console.log(result.user.Username);
      this.router.navigate(['movies']);

    }
  )
  }
}
