import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  userList:any=[];
  Service$!:Observable<any[]>;

    services:any;
    constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private serviceList:ServiceService, private router:Router) { }
  
    ngOnInit(): void {
      this.Service$=this.serviceList.getAllServices();

  this.serviceList.getAllServices().subscribe({
    next:(services)=>{
      this.services=services;
    },
    error:(response)=>{
      console.log(response);
    }
  });
    }
    delete(item:any) {
      if(confirm(`Želite li izbirsati uslugu pod rednim brojem ${item.id} ?`)) {
        this.serviceList.deleteServices(item.id).subscribe(
          (result) => {     
            this.Service$=this.serviceList.getAllServices();
              this.snackBar.open('Uspješno ste izbrisali uslugu', 'Zatvori');
              this.router.navigate(['serviceslist']);
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
  
  