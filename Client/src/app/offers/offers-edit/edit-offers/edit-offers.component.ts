import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';
import { MaterialService } from 'src/app/services/material.service';
import { OfferStatusService } from 'src/app/services/offer-status.service';
import { OffersService } from 'src/app/services/offers.service';
import { ServiceService } from 'src/app/services/service.service';
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
  MaterialTypesId$!:Observable<any[]>;
  ServiceTypesId$!: Observable<any[]>;
  Offer_StatusTypesid$!:Observable<any[]>;

  addOfferRequest: Offer={
    id:'',
materialquantity:0,
servicequantity:0,
   userid:'',
   clientid:'',
   vehicleid:'',
   offer_statusid:'',
   materialid:'',
   serviceid:''
  }
 
  constructor(private offer_statusType:OfferStatusService, private materialService:MaterialService, private serviceService:ServiceService, private authenticationService:AuthenticationService, private vehicleService:VehicleService,private clientService:ClientsService, private userService:UsersService, private route: ActivatedRoute, private offerService:OffersService, private router:Router ) { }
 
  ngOnInit(): void {
    this.UserTypesId$=this.userService.getAllUsers();
  this.VehicleTypesId$=this.vehicleService.getAllVehicles();
   this.ClientTypesId$=this.clientService.getAllClients();
   this.Offer_StatusTypesid$=this.offer_statusType.getAllOffers();
   this.MaterialTypesId$=this.materialService.getAllMaterial();
   this.ServiceTypesId$=this.serviceService.getAllServices();
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.offerService.getOffer(id).subscribe({
        next:(response)=>{
this.addOfferRequest=response;
        }
      });
    }
      }
    })
  }
    updateOffer(id:string){
      this.offerService.updateOffer(this.addOfferRequest.id,this.addOfferRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['offers']);
        }
      });
    }
    logout(): void {
      this.authenticationService.logout();
    }
      deleteOffer(id:string){
        this.offerService.deleteOffer(id).subscribe({
          next:(response)=>{
            this.router.navigate(['offers']);
          }
        })
  }
  }

