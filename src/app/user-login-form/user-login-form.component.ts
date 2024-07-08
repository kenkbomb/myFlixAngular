import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

/**used for fetching data and making requests to the db */
import { FetchApiService } from '../fetch-api-data.service';

/**  This import is used to display notifications back to the user*/
import { MatSnackBar } from '@angular/material/snack-bar';
/**used for routing */
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})

export class UserLoginFormComponent {
/**inject the values from the template input text fields as userData object */
  @Input() userData = { Username: '', Password: '' };

  /**constructor, this component makes use of the fetchApiService,snackbar,matdialogs and router */
  constructor(
    public fetchApiData: FetchApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router:Router
  ){}

/**log in, set local storage and then goto the main movies view */
  loginUser():void{
    this.fetchApiData.userLogin(this.userData).subscribe((result)=>{
      
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
    
      localStorage.setItem('user',JSON.stringify(data));
      localStorage.setItem('token',result.token);
      this.router.navigate(['movies']);

    }
  )
  }
}
