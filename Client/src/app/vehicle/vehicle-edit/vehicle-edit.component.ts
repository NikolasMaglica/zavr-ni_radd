import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  Vehicle_TypeId$!: Observable<any[]>;
  ClientId$!: Observable<any[]>;


  VehicleDetalils:Vehicle={
    id:'',
    manufacturer:'',
    model:'',
 productionyear:0,
 kilometerstraveled:0,
 vehicle_typeid:'',
 clientid:''
  }
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private clientType:ClientsService,private vehicleService:VehicleService, private router:Router, private vehicle_type:VehicleTypeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.Vehicle_TypeId$=this.vehicle_type.getAllVehicle_Types();
    this.ClientId$=this.clientType.getAllClients();

    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.vehicleService.getVehicle(id).subscribe({
        next:(response)=>{
this.VehicleDetalils=response;
        }
      });
    }
      }
    })

  }
  logout(): void {
    this.authenticationService.logout();
  }
  updateVehicle(id:string){
    this.vehicleService.updateVehicle(this.VehicleDetalils.id,this.VehicleDetalils).subscribe(
      (result) => {     
          this.snackBar.open('Uspješno ste izmijenili podatke', 'Zatvori');
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
