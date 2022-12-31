import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service_Offer } from 'src/app/models/service_offer';
import { OffersService } from 'src/app/services/offers.service';
import { ServiceOfferService } from 'src/app/services/service-offer.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-offer-add',
  templateUrl: './service-offer-add.component.html',
  styleUrls: ['./service-offer-add.component.css']
})
export class ServiceOfferAddComponent implements OnInit {
  Service$!: Observable<any[]>;
Offer$!:Observable<any[]>;
    
  addService_OfferRequest: Service_Offer={
    id:'',

    offerid:'',
    serviceid:'',
    quantity:0,
    discount:0

  }
  constructor(private offerService:OffersService, private service_serviceList:ServiceService, private serviceList:ServiceOfferService, private router:Router) { }

  ngOnInit(): void {
    this.Service$=this.service_serviceList.getAllServices();
this.Offer$=this.offerService.getAllOffers();
   
  }
  addService_OfferType(){
    this.serviceList.addService_Offer(this.addService_OfferRequest).subscribe({
      next:(service_offer)=>{
        this.router.navigate(['service_offerlist']);
      }
    })  }
}
