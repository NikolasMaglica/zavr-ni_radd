import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
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
  constructor(private clientType:ClientsService,private vehicleService:VehicleService, private router:Router, private vehicle_type:VehicleTypeService, private route: ActivatedRoute) { }

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
  updateVehicle(id:string){
    this.vehicleService.updateVehicle(this.VehicleDetalils.id,this.VehicleDetalils).subscribe({
      next:(response)=>{
        this.router.navigate(['vehiclelist']);
      }
    });
  }

}
