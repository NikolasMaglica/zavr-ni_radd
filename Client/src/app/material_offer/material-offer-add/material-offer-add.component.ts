import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Material_Offer } from 'src/app/models/material_offer';
import { MaterialOfferService } from 'src/app/services/material-offer.service';
import { MaterialService } from 'src/app/services/material.service';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-material-offer-add',
  templateUrl: './material-offer-add.component.html',
  styleUrls: ['./material-offer-add.component.css']
})
export class MaterialOfferAddComponent implements OnInit {
  Offer$!: Observable<any[]>;
Material$!:Observable<any[]>;
  addMaterial_OfferRequest: Material_Offer={
    id:'',
    offerid:'',
    materialid:'',
    quantity:0,
    discount:0

  }
  constructor(private material_offerList:MaterialOfferService, private router:Router, private materialList:MaterialService, private offerList:OffersService) { }

  ngOnInit(): void {
    this.Material$=this.materialList.getAllMaterial();
    this.Offer$=this.offerList.getAllOffers();
   
  }
  addSMaterial_OfferType(){
    this.material_offerList.addMaterial_Offer(this.addMaterial_OfferRequest).subscribe({
      next:(material_offer)=>{
        this.router.navigate(['material_offerlist']);
      }
    })  }
}
