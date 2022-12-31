import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Material_Offer } from 'src/app/models/material_offer';
import { MaterialOfferService } from 'src/app/services/material-offer.service';
import { MaterialService } from 'src/app/services/material.service';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-material-offer-edit',
  templateUrl: './material-offer-edit.component.html',
  styleUrls: ['./material-offer-edit.component.css']
})
export class MaterialOfferEditComponent implements OnInit {
  Offer$!: Observable<any[]>;
  Material$!:Observable<any[]>;
  addMaterial_OfferRequest: Material_Offer={
    id:'',
    offerid:'',
    materialid:'',
    quantity:0,
    discount:0

  }
  constructor(private material_OfferList:MaterialOfferService, private router:Router, private route: ActivatedRoute, private materialList:MaterialService, private offerList:OffersService) { }
  ngOnInit(): void {
    this.Material$=this.materialList.getAllMaterial();
    this.Offer$=this.offerList.getAllOffers();
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.material_OfferList.getMaterial_Offer(id).subscribe({
        next:(response)=>{
this.addMaterial_OfferRequest=response;
        }
      });
    }
      }
    })
  }
    updateMaterial_Offer(id:string){
      this.material_OfferList.updateMaterial_Offer(this.addMaterial_OfferRequest.id,this.addMaterial_OfferRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['material_offerlist']);
        }
      });
    }
  
  }

