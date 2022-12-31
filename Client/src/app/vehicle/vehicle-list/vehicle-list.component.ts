import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ClientsService } from 'src/app/services/clients.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  
  vehicles:Vehicle[]=[];
VehicleList$!:Observable<any[]>;
ClientId$!:Observable<any[]>;

Vehicle_TypeList$!:Observable<any[]>;
vehicle_typeList:any=[];
client:any=[];

  VehicleTypesMap:Map<number, string> = new Map()
  clientTypesMap:Map<number, string> = new Map()

  modalTitle:string = '';
  activateAddEditOfferComponent:boolean=false;
   VehicleDetalils:Vehicle={
    id:'',
    manufacturer:'',
    model:'',
 productionyear:0,
 kilometerstraveled:0,
 vehicle_typeid:'',
 clientid:''
  }
  

  
  constructor(private clientService:ClientsService, private router:Router,private vehicleService:VehicleService, private vehicleTypeService:VehicleTypeService) { }

  ngOnInit(): void {
    this.refreshVehicle_TypeMap();
    this.refreshUClientMap();
    this.VehicleList$=this.vehicleService.getAllVehicles();

this.vehicleService.getAllVehicles().subscribe({
  next:(vehicles)=>{
    this.vehicles=vehicles;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbirsati vozilo pod rednim brojem ${item.id} ?`)) {
      this.vehicleService.deleteVehicle(item.id).subscribe(res => {
        
      this.VehicleList$ = this.vehicleService.getAllVehicles();
      })
    }
  }
  refreshVehicle_TypeMap() {
    this.vehicleTypeService.getAllVehicle_Types().subscribe(data => {
      this.vehicle_typeList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.VehicleTypesMap.set(this.vehicle_typeList[i].id, this.vehicle_typeList[i].vehicle_typename);
      }
    })
  }
  refreshUClientMap() {
    this.clientService.getAllClients().subscribe(data => {
      this.client=data;

      for(let i = 0; i < data.length; i++)
      {
        this.clientTypesMap.set(this.client[i].id, this.client[i].firstlastname);
      }
    })
  }

}
