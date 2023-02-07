import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  addServiceRequest: Service={
    id:'',
    name:'',
    price:0,
    description:''
  }
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private serviceType:ServiceService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.serviceType.getServices(id).subscribe({
        next:(response)=>{
this.addServiceRequest=response;
        }
      });
    }
      }
    })
  }
  logout(): void {
    this.authenticationService.logout();
  }
    updateService(id:string){
      this.serviceType.updateServices(this.addServiceRequest.id,this.addServiceRequest).subscribe(
        (result) => {     
            this.snackBar.open('Uspješno ste izmijenili podatke', 'Zatvori');
            this.router.navigate(['vehicle_typelist']);
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


