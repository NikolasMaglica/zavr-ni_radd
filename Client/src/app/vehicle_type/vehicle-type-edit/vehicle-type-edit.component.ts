import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle_Type } from 'src/app/models/vehicle_type';
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
  constructor(private vehicleType:VehicleTypeService,private route: ActivatedRoute, private router:Router) { }
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
      this.vehicleType.updateVehicle_Type(this.addVehicle_TypeRequest.id,this.addVehicle_TypeRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['vehicle_typelist']);
        }
      });
    }
  
  }


