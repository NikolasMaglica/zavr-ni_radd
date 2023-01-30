import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Vehicle_Type } from 'src/app/models/vehicle_type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
@Component({
  selector: 'app-vehicle-type-add',
  templateUrl: './vehicle-type-add.component.html',
  styleUrls: ['./vehicle-type-add.component.css']
})
export class VehicleTypeAddComponent implements OnInit {
  public errorMessage: string = '';
  public showError: boolean = false;

  addVehicle_TypeRequest: Vehicle_Type={
    id:'',
    vehicle_typename:'',
  }

  constructor(private snackBar: MatSnackBar, private authenticationService: AuthenticationService, private vehicleType: VehicleTypeService, private router: Router) { }

  ngOnInit(): void {}

  addVehicleType() {
    this.vehicleType.addVehicle_Type(this.addVehicle_TypeRequest)
    .subscribe(
        (result) => {     
            this.snackBar.open('Uspješan unos', 'Zatvori');
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