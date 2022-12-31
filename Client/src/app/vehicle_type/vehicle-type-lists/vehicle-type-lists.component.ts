import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle_Type } from 'src/app/models/vehicle_type';
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
 
   
  
  constructor(private vehicleType:VehicleTypeService, private router:Router) { }

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
      this.vehicleType.deleteVehicle_Type(item.id).subscribe(res => {
        
      this.vehicle_Type$ = this.vehicleType.getAllVehicle_Types();
      })
    }
  }

}

