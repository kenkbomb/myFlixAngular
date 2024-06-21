import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

// This import brings in the API calls we created in 6.2
import { FetchApiService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})

export class UserLoginFormComponent {

  @Input() userData = { Username: '', Password: '' };//declare the input data to be sent
  constructor(
    public fetchApiData: FetchApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  loginUser():void{
    this.fetchApiData.userLogin(this.userData).subscribe((result)=>{
      console.log(JSON.stringify(result));//log the result to the console.
      this.dialogRef.close();//close the modal
      this.snackBar.open("Logged in " + result.user.Username +"!", 'OK', { duration: 2000});//similar to ALERT message popup
      localStorage.setItem('user',JSON.stringify(result.user.Username));
      localStorage.setItem('token',result.token);
      console.log(result.token);

    }
  )
  }
}
