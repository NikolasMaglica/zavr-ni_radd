import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service_Offer } from 'src/app/models/service_offer';
import { ServiceOfferService } from 'src/app/services/service-offer.service';

@Component({
  selector: 'app-service-offer-list',
  templateUrl: './service-offer-list.component.html',
  styleUrls: ['./service-offer-list.component.css']
})
export class ServiceOfferListComponent implements OnInit {

  Service_Offer$!:Observable<any[]>;
  
    addService_OfferRequest: Service_Offer={
      id:'',
      offerid:'',
      serviceid:'',
      quantity:0,
      discount:0
  
    }
    service_offers:any=[];
     
    
    constructor(private service_offer:ServiceOfferService, private router:Router) { }
  
    ngOnInit(): void {
      this.Service_Offer$=this.service_offer.getAllService_Offer();
  this.service_offer.getAllService_Offer().subscribe({
    next:(service_offers)=>{
      this.service_offers=service_offers;
    },
    error:(response)=>{
      console.log(response);
    }
  });
    }
    delete(item:any) {
      if(confirm(`Želite li ponudu na materijalu pod rednim brojem ${item.id} ?`)) {
        this.service_offer.deleteService_Offer(item.id).subscribe(res => {
          
        this.Service_Offer$ = this.service_offer.getAllService_Offer();
        })
      }
    }
  
  }
  
  