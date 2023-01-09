import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User_Vehicle } from 'src/app/models/user_vehicle';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-user-vehicle-list',
  templateUrl: './user-vehicle-list.component.html',
  styleUrls: ['./user-vehicle-list.component.css']
})
export class UserVehicleListComponent implements OnInit {
  User_Vehicle$!:Observable<any[]>;
 UserTypesMap:Map<number, string> = new Map()
 VehicleTypesMap:Map<number, string> = new Map()


  addUser_VehicleRequest: User_Vehicle={
    id:'',
    userid:'',
    vehicleid:'',
    description:'',

  }
  user_vehicle:any=[];
  userList:any=[];
  vehicleList:any=[];


  constructor(private vehicleService:VehicleService, private userService:UsersService,private authenticationService:AuthenticationService, private uservehicleService:UserVehicleService) { }
  ngOnInit(): void {
    this.refreshUserMap();
    this.refreshVehicleMap();


    this.User_Vehicle$=this.uservehicleService.getAllUser_Vehicle();
this.uservehicleService.getAllUser_Vehicle().subscribe({
  next:(user_vehicle)=>{
    this.user_vehicle=user_vehicle;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbrisati zaposlenikovo vozila pod rednim brojem ${item.id} ?`)) {
      this.uservehicleService.deleteUser_Vehicle(item.id).subscribe(res => {
        
      this.User_Vehicle$ = this.uservehicleService.getAllUser_Vehicle();
      })
    }
  }
  logout(): void {
    this.authenticationService.logout();
  }
  refreshUserMap() {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.UserTypesMap.set(this.userList[i].id, this.userList[i].userName);
      }
    })
  }
  refreshVehicleMap() {
    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicleList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.VehicleTypesMap.set(this.vehicleList[i].id, this.vehicleList[i].manufacturer);
      }
    })
  }
}