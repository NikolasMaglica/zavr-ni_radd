import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  addServiceRequest: Service={
    id:'',
    name:'',
    price:0,
    description:''
  }
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private serviceType:ServiceService, private router:Router) { }

  ngOnInit(): void {
  
   
  }
  logout(): void {
    this.authenticationService.logout();
  }
  addServiceType(){
    this.serviceType.addServices(this.addServiceRequest).subscribe(
      (result) => {     
          this.snackBar.open('Uspješan unos', 'Zatvori');
          this.router.navigate(['servicelist']);
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
