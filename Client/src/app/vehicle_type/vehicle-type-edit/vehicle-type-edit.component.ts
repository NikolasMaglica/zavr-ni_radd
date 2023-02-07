import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle_Type } from 'src/app/models/vehicle_type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-edit',
  templateUrl: './vehicle-type-edit.component.html',
  styleUrls: ['./vehicle-type-edit.component.css']
})
export class VehicleTypeEditComponent implements OnInit {
  addVehicle_TypeRequest: Vehicle_Type={
    id:'',
    vehicle_typename:'',
  }
  constructor(private snackBar: MatSnackBar,private authenticationService:AuthenticationService,private vehicleType:VehicleTypeService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.vehicleType.getVehicle_Type(id).subscribe({
        next:(response)=>{
this.addVehicle_TypeRequest=response;
        }
      });
    }
      }
    })
  }
    updateVehicle_Type(id:string){
      this.vehicleType.updateVehicle_Type(this.addVehicle_TypeRequest.id,this.addVehicle_TypeRequest).subscribe(
        (result) => {     
            this.snackBar.open('Uspješno ste izmijenili podatke', 'Zatvori');
            this.router.navigate(['vehicle_typelist']);
        },
        (error: HttpErrorResponse) => {
                 this.handleFailedAuthentication(error);

        }

      );
    }

  

    logout(): void {
      this.authenticationService.logout();
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


