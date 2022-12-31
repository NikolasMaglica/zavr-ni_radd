import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';
import { ClientsService } from 'src/app/services/clients.service';
import { OffersService } from 'src/app/services/offers.service';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.css']
})
export class EditOffersComponent implements OnInit {
  UserTypesId$!: Observable<any[]>;
  VehicleTypesId$!: Observable<any[]>;
  ClientTypesId$!: Observable<any[]>;
  addOfferRequests: Offer={
    id:'',
    price:0,
    userid:'',
    clientid:'',
    vehicleid:'',
    offer_statusid:''
   
  }
  OfferDetails:Offer={
    id:'',
    price:0,
    userid:'',
    clientid:'',
    vehicleid:'',
    offer_statusid:''
  }
  constructor(private vehicleService:VehicleService,private clientService:ClientsService, private userService:UsersService, private route: ActivatedRoute, private offerService:OffersService, private router:Router ) { }
 
  ngOnInit(): void {
    this.UserTypesId$=this.userService.getAllUsers();
    this.VehicleTypesId$=this.vehicleService.getAllVehicles();
    this.ClientTypesId$=this.clientService.getAllClients();
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.offerService.getOffer(id).subscribe({
        next:(response)=>{
this.OfferDetails=response;
        }
      });
    }
      }
    })
  }
    updateOffer(id:string){
      this.offerService.updateOffer(this.OfferDetails.id,this.OfferDetails).subscribe({
        next:(response)=>{
          this.router.navigate(['offers']);
        }
      });
    }
      deleteOffer(id:string){
        this.offerService.deleteOffer(id).subscribe({
          next:(response)=>{
            this.router.navigate(['offers']);
          }
        })
  }
  }

