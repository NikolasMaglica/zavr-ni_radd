import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';
import { ClientsService } from 'src/app/services/clients.service';
import { OfferStatusService } from 'src/app/services/offer-status.service';
import { OffersService } from 'src/app/services/offers.service';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-offers-lists',
  templateUrl: './offers-lists.component.html',
  styleUrls: ['./offers-lists.component.css']
})
export class OffersListsComponent implements OnInit {

  offers:Offer[]=[];
offerList$!:Observable<any[]>;
userList$!:Observable<any[]>;
userList:any=[];

  userTypesMap:Map<number, string> = new Map()
  clientTypesMap:Map<number, string> = new Map()
  vehicleTypesMap:Map<number, string> = new Map()
  offerStatusMap:Map<number, string>= new Map()


  modalTitle:string = '';
  activateAddEditOfferComponent:boolean=false;
  offer:any;
  client:any;
  vehicle:any;
  status:any;
   OfferDetails:Offer={
    id:'',
    price:0,
    userid:'',
    clientid:'',
    vehicleid:'',
    offer_statusid:''
  }
  modalAdd() {
    this.offer = {
      id:'',
      price:null,
      userid:null
    }
    this.modalTitle="Lista zaposlenika";
    this.activateAddEditOfferComponent=true;
  }
  constructor(private offer_statusType:OfferStatusService, private vehicleService:VehicleService,private router:Router,private offerService:OffersService, private userService:UsersService, private clientService:ClientsService) { }

  ngOnInit(): void {
    this.refreshVehicleMap();
  this.refreshUClientMap();
    this.refreshUserMap();
    this.refreshOffer_StatusMap() ;
    this.offerList$=this.offerService.getAllOffers();
this.offerService.getAllOffers().subscribe({
  next:(offers)=>{
    this.offers=offers;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbirsati ponudu pod rednim brojem ${item.id} ?`)) {
      this.offerService.deleteOffer(item.id).subscribe(res => {
        
      this.offerList$ = this.offerService.getAllOffers();
      })
    }
  }
  refreshUserMap() {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.userTypesMap.set(this.userList[i].id, this.userList[i].userName);
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
  refreshVehicleMap() {
    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicle=data;

      for(let i = 0; i < data.length; i++)
      {
        this.vehicleTypesMap.set(this.vehicle[i].id, this.vehicle[i].model);
      }
    })
  }
  refreshOffer_StatusMap() {
    this.offer_statusType.getAllOffers().subscribe(data => {
      this.status=data;

      for(let i = 0; i < data.length; i++)
      {
        this.offerStatusMap.set(this.status[i].id, this.status[i].name);
      }
    })
  }
 
}
