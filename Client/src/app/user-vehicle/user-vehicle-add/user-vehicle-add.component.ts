import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User_Vehicle } from 'src/app/models/user_vehicle';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-user-vehicle-add',
  templateUrl: './user-vehicle-add.component.html',
  styleUrls: ['./user-vehicle-add.component.css']
})
export class UserVehicleAddComponent implements OnInit {
  User$!: Observable<any[]>;
Vehicle$!:Observable<any[]>;

  addUser_VehicleRequest: User_Vehicle={
    id:'',
    userid:'',
    vehicleid:'',
    description:'',

  }
  constructor(private authenticationService:AuthenticationService, private router:Router, private userService:UsersService, private uservehicleService:UserVehicleService, private vehicleService:VehicleService) { }

  ngOnInit(): void {
    this.User$=this.userService.getAllUsers();
    this.Vehicle$=this.vehicleService.getAllVehicles();
  }
  addUser_VehicleType(){
    this.uservehicleService.addUser_Vehicle(this.addUser_VehicleRequest).subscribe({
      next:(service_offer)=>{
        this.router.navigate(['uservehiclelist']);
      }
    })  }
    logout(): void {
      this.authenticationService.logout();
    }

}
