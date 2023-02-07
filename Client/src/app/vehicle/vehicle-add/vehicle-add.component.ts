import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

  Vehicle_TypeId$!: Observable<any[]>;
  ClientId$!: Observable<any[]>;

  
  addVehicleRequest: Vehicle={
    id:'',
    manufacturer:'',
    model:'',
 productionyear:0,
 kilometerstraveled:0,
 vehicle_typeid:'',
 clientid:''
    
  }
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private vehicleService:VehicleService, private router:Router, private vehicletypeService:VehicleTypeService,private clientType:ClientsService) { }

  ngOnInit(): void {
    this.Vehicle_TypeId$=this.vehicletypeService.getAllVehicle_Types();
    this.ClientId$=this.clientType.getAllClients();

  
   
  }
  logout(): void {
    this.authenticationService.logout();
  }
  addVehicle(){
    this.vehicleService.addVehicle(this.addVehicleRequest).subscribe(
      (result) => {     
          this.snackBar.open('Uspješan unos', 'Zatvori');
          this.router.navigate(['vehiclelist']);
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
