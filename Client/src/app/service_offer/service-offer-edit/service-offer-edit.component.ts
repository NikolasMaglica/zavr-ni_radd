import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service_Offer } from 'src/app/models/service_offer';
import { OffersService } from 'src/app/services/offers.service';
import { ServiceOfferService } from 'src/app/services/service-offer.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-offer-edit',
  templateUrl: './service-offer-edit.component.html',
  styleUrls: ['./service-offer-edit.component.css']
})
export class ServiceOfferEditComponent implements OnInit {
  addService_OfferRequest: Service_Offer={
    id:'',

    offerid:'',
    serviceid:'',
    quantity:0,
    discount:0

  }
  Service$!: Observable<any[]>;
  Offer$!:Observable<any[]>;
  constructor(private offerService:OffersService, private service_serviceList:ServiceService, private serviceList:ServiceOfferService, private router:Router, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.Service$=this.service_serviceList.getAllServices();
    this.Offer$=this.offerService.getAllOffers();
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.serviceList.getService_Offer(id).subscribe({
        next:(response)=>{
this.addService_OfferRequest=response;
        }
      });
    }
      }
    })
  }
    updateService_Offer(id:string){
      this.serviceList.updateService_Offer(this.addService_OfferRequest.id,this.addService_OfferRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['service_offerlist']);
        }
      });
    }
  
  }


