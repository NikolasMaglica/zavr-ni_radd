import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  material$!:Observable<any[]>;
  
  
    materials:any;
    addMaterialRequest: Material={
      id:'',
      name:'',
      instockquantity:0,
      price:0,
    description:''
    }
   
     
    
    constructor(private materialType:MaterialService, private router:Router) { }
  
    ngOnInit(): void {
      this.material$=this.materialType.getAllMaterial();
  this.materialType.getAllMaterial().subscribe({
    next:(materials)=>{
      this.materials=materials;
    },
    error:(response)=>{
      console.log(response);
    }
  });
    }
    delete(item:any) {
      if(confirm(`Želite li izbirsati material pod rednim brojem ${item.id} ?`)) {
        this.materialType.deleteMaterial(item.id).subscribe(res => {
          
        this.material$ = this.materialType.getAllMaterial();
        })
      }
    }
  
  }
  
  