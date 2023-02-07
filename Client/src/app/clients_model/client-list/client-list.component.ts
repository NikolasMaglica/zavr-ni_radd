import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  Clients$!:Observable<any[]>;

  clients:any;
  addVehicle_TypeRequest: Client={
    id:'',
    firstlastname:'',
    email:'',
    adress:'',
    phonenumber:0
  }
 
   
  
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private clientService:ClientsService, private router:Router) { }

  ngOnInit(): void {
    this.Clients$=this.clientService.getAllClients();
this.clientService.getAllClients().subscribe({
  next:(clients)=>{
    this.clients=clients;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbirsati klijenta pod rednim brojem ${item.id} ?`)) {
      this.clientService.deleteClient(item.id).subscribe(
        (result) => {     
          this.Clients$=this.clientService.getAllClients();
            this.snackBar.open('Uspješno ste izbrisali klijenta', 'Zatvori');
            this.router.navigate(['clientlist']);
        },
        (error: HttpErrorResponse) => {
                 this.handleFailedAuthentication(error);

        }
    );
    }
  
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


