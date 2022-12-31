import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order_Material } from 'src/app/models/order_material.model';
import { OrderMaterialService } from 'src/app/services/order-material.service';

@Component({
  selector: 'app-order-material-list',
  templateUrl: './order-material-list.component.html',
  styleUrls: ['./order-material-list.component.css']
})
export class OrderMaterialListComponent implements OnInit {

  Order_Material$!:Observable<any[]>;
  
  addOrder_MaterialRequest: Order_Material={
     id:'',
    orderid:'',
    materialid:'',
    quantity:0,
    order_statusid:''
    

  }
  order_material:any=[];
   
  
  constructor(private order_materialList:OrderMaterialService, private router:Router) { }

  ngOnInit(): void {
    this.Order_Material$=this.order_materialList.getAllOrder_Material();
this.order_materialList.getAllOrder_Material().subscribe({
  next:(order_material)=>{
    this.order_material=order_material;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbrisati ponudu  pod rednim brojem ${item.id} ?`)) {
      this.order_materialList.deleteOrder_Material(item.id).subscribe(res => {
        
      this.Order_Material$ = this.order_materialList.getAllOrder_Material();
      })
    }
  }

}
