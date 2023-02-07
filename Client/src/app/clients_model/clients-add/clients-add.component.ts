import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent implements OnInit {

  addVehicle_TypeRequest: Client={
    id:'',
    firstlastname:'',
    email:'',
    adress:'',
    phonenumber:0
  }
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService,private clientService:ClientsService, private router:Router) { }

  ngOnInit(): void {
  
   
  }
  logout(): void {
    this.authenticationService.logout();
  }
  addClientType(){
    this.clientService.addClient(this.addVehicle_TypeRequest).subscribe(
      (result) => {     
          this.snackBar.open('Uspješan unos', 'Zatvori');
          this.router.navigate(['clientlist']);
      },
      (error: HttpErrorResponse) => {
               this.handleFailedAuthentication(error);

      }
  );
  }

    private handleFailedAuthentication(error: HttpErrorResponse): void {
      let errorsMessage = [];
  
      let validationErrorDictionary = JSON.parse(JSON.stringify(error.error.errors));
      for (let fieldName in validationErrorDictionary) {
        if (validationErrorDictionary.hasOwnProperty(fieldName)) {
          errorsMessage.push(validationErrorDictionary[fieldName]);
        }
      }
      this.snackBar.open(errorsMessage.join(' '), 'Zatvori');
    }
}



