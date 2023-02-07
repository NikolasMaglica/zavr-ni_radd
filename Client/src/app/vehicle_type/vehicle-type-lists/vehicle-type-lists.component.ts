import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle_Type } from 'src/app/models/vehicle_type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-lists',
  templateUrl: './vehicle-type-lists.component.html',
  styleUrls: ['./vehicle-type-lists.component.css']
})
export class VehicleTypeListsComponent implements OnInit {

vehicle_Type$!:Observable<any[]>;
userList:any=[];

  vehicles:any;
  addVehicle_TypeRequest: Vehicle_Type={
    id:'',
    vehicle_typename:'',
  }
 
   
  
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private vehicleType:VehicleTypeService, private router:Router) { }

  ngOnInit(): void {
    this.vehicle_Type$=this.vehicleType.getAllVehicle_Types();
this.vehicleType.getAllVehicle_Types().subscribe({
  next:(vehicles)=>{
    this.vehicles=vehicles;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbirsati vrstu vozila pod rednim brojem ${item.id} ?`)) {
      this.vehicleType.deleteVehicle_Type(item.id) .subscribe(
        (result) => {     
          this.vehicle_Type$=this.vehicleType.getAllVehicle_Types();
            this.snackBar.open('Uspješno ste izbrisali vrstu vozila', 'Zatvori');
            this.router.navigate(['vehicle_typelist']);
        },
        (error: HttpErrorResponse) => {
                 this.handleFailedAuthentication(error);

        }
    );
    }
  
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

