import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Material_Offer } from 'src/app/models/material_offer';
import { MaterialOfferService } from 'src/app/services/material-offer.service';

@Component({
  selector: 'app-material-offer-list',
  templateUrl: './material-offer-list.component.html',
  styleUrls: ['./material-offer-list.component.css']
})
export class MaterialOfferListComponent implements OnInit {

  Material_Offer$!:Observable<any[]>;
  
  addMaterial_OfferRequest: Material_Offer={
    id:'',
    offerid:'',
    materialid:'',
    quantity:0,
    discount:0

  }
  material_offers:any=[];
   
  
  constructor(private material_offerService:MaterialOfferService, private router:Router) { }

  ngOnInit(): void {
    this.Material_Offer$=this.material_offerService.getAllMaterial_Offer();
this.material_offerService.getAllMaterial_Offer().subscribe({
  next:(material_offers)=>{
    this.material_offers=material_offers;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbrisati materijal na ponudi pod rednim brojem ${item.id} ?`)) {
      this.material_offerService.deleteMaterial_Offer(item.id).subscribe(res => {
        
      this.Material_Offer$ = this.material_offerService.getAllMaterial_Offer();
      })
    }
  }

}

