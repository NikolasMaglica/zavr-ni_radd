import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  addClientRequest: Client={
    id:'',
    firstlastname:'',
    email:'',
    adress:'',
    phonenumber:0
  }
 
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private clientType:ClientsService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.clientType.getClient(id).subscribe({
        next:(response)=>{
this.addClientRequest=response;
        }
      });
    }
      }
    })
  }
    updateVehicle_Type(id:string){
      this.clientType.updateClient(this.addClientRequest.id,this.addClientRequest).subscribe(
        (result) => {     
            this.snackBar.open('Uspješno ste izmijenili podatke', 'Zatvori');
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
    logout(): void {
      this.authenticationService.logout();
    }
  }



