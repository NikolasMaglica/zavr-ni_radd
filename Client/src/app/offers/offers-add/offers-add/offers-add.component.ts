import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/helpers/error-state-matcher';
import { Offer } from 'src/app/models/offer.model';
import { ClientsService } from 'src/app/services/clients.service';
import { OfferStatusService } from 'src/app/services/offer-status.service';
import { OffersService } from 'src/app/services/offers.service';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-offers-add',
  templateUrl: './offers-add.component.html',
  styleUrls: ['./offers-add.component.css']
})
export class OffersAddComponent implements OnInit {
  UserTypesId$!: Observable<any[]>;
  VehicleTypesId$!: Observable<any[]>;
  ClientTypesId$!: Observable<any[]>;
  Offer_StatusTypesid$!:Observable<any[]>;

  
  addOfferRequest: Offer={
    id:'',
    price:0,
   userid:'',
   clientid:'',
   vehicleid:'',
   offer_statusid:''
  }
  constructor(private offer_statusType:OfferStatusService, private clientService:ClientsService, private offerService:OffersService, private router:Router, private userService:UsersService, private vehicleService:VehicleService) { }

  ngOnInit(): void {
    this.UserTypesId$=this.userService.getAllUsers();
  this.VehicleTypesId$=this.vehicleService.getAllVehicles();
   this.ClientTypesId$=this.clientService.getAllClients();
   this.Offer_StatusTypesid$=this.offer_statusType.getAllOffers();
  }
  addOffer(){
    this.offerService.addOffer(this.addOfferRequest).subscribe({
      next:(offer)=>{
        this.router.navigate(['offerslist']);
      }
    })  }
}

