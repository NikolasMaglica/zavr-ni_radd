import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements OnInit {

  addMaterialRequest: Material={
    id:'',
    name:'',
    instockquantity:0,
    price:0,
  description:''
  }
  constructor(private materialType:MaterialService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.materialType.getMaterial(id).subscribe({
        next:(response)=>{
this.addMaterialRequest=response;
        }
      });
    }
      }
    })
  }
    updateVehicle_Type(id:string){
      this.materialType.updateMaterial(this.addMaterialRequest.id,this.addMaterialRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['offers']);
        }
      });
    }
  
  }


