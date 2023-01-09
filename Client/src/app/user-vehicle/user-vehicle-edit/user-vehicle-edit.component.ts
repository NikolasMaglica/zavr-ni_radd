import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User_Vehicle } from 'src/app/models/user_vehicle';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-user-vehicle-edit',
  templateUrl: './user-vehicle-edit.component.html',
  styleUrls: ['./user-vehicle-edit.component.css']
})
export class UserVehicleEditComponent implements OnInit {
  UserId$!: Observable<any[]>;
  VehicleId$!: Observable<any[]>;
  addUser_VehicleRequest: User_Vehicle={
    id:'',
    userid:'',
    vehicleid:'',
    description:'',

  }
  constructor(private route:ActivatedRoute, private vehicleService:VehicleService, private userService:UsersService, private authenticationService:AuthenticationService, private router:Router, private uservehicleService:UserVehicleService) { }

  ngOnInit(): void {
    this.UserId$=this.userService.getAllUsers();
    this.VehicleId$=this.vehicleService.getAllVehicles();

    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.uservehicleService.getUser_Vehicle(id).subscribe({
        next:(response)=>{
this.addUser_VehicleRequest=response;
        }
      });
    }
      }
    })
  }
  updateUser_Vehicle(id:string){
    this.uservehicleService.updateUser_Vehicle(this.addUser_VehicleRequest.id,this.addUser_VehicleRequest).subscribe({
      next:(response)=>{
        this.router.navigate(['uservehiclelist']);
      }
    });
  }
  logout(): void {
    this.authenticationService.logout();
  }


}
