import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle_Type } from 'src/app/models/vehicle_type';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-add',
  templateUrl: './vehicle-type-add.component.html',
  styleUrls: ['./vehicle-type-add.component.css']
})
export class VehicleTypeAddComponent implements OnInit {
  
  addVehicle_TypeRequest: Vehicle_Type={
    id:'',
    vehicle_typename:'',
  }
  constructor(private vehicleType:VehicleTypeService, private router:Router) { }

  ngOnInit(): void {
  
   
  }
  addVehicleType(){
    this.vehicleType.addVehicle_Type(this.addVehicle_TypeRequest).subscribe({
      next:(offers)=>{
        this.router.navigate(['vehicle_typelist']);
      }
    })  }
}


