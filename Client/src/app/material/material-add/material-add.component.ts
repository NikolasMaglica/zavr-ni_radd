import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.css']
})
export class MaterialAddComponent implements OnInit {

  addMaterialRequest: Material={
    id:'',
    name:'',
    instockquantity:0,
    price:0,
  description:''
  }
  constructor(private materialList:MaterialService, private router:Router) { }

  ngOnInit(): void {
  
   
  }
  addVehicleType(){
    this.materialList.addMaterial(this.addMaterialRequest).subscribe({
      next:(material)=>{
        this.router.navigate(['materiallist']);
      }
    })  }
}
