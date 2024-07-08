import { Component, OnInit, Input } from '@angular/core';

/**used to view dialogs */
import { MatDialogRef } from '@angular/material/dialog';
/** uses the fetchapi service */
import { FetchApiService } from '../fetch-api-data.service';

/**used to display notifications to the user */
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
/**read in the userName,Password,Email and Birthday and store into userData as an input */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

/**  This is the function responsible for sending the form inputs to the backend*/
registerUser(): void {
  if(this.userData.Username!=""&&this.userData.Password!=""&&this.userData.Email.includes("@")&&this.userData.Birthday!=""){
    if(this.userData.Username.length>=2&&this.userData.Password.length>=4)
      {
      this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("Welcome " +result.Username, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
  else{alert("usernames must be larger than 2 characters, passwords greater than 3!")}
  }
  else{alert("please correctly fill out all fields");}
}
  }