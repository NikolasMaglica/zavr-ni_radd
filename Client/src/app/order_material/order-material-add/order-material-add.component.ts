import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order_Material } from 'src/app/models/order_material.model';
import { MaterialService } from 'src/app/services/material.service';
import { OffersService } from 'src/app/services/offers.service';
import { OrderMaterialService } from 'src/app/services/order-material.service';
import { OrderStatusService } from 'src/app/services/order-status.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-material-add',
  templateUrl: './order-material-add.component.html',
  styleUrls: ['./order-material-add.component.css']
})
export class OrderMaterialAddComponent implements OnInit {
  Order$!: Observable<any[]>;
Material$!:Observable<any[]>;
Order_Status$!:Observable<any[]>;
  addOrder_MaterialRequest: Order_Material={
    id:'',
    orderid:'',
    materialid:'',
    quantity:0,
     order_statusid:''
    

  }
  constructor(private order_status:OrderStatusService, private materialList:MaterialService, private orderList:OrderService,private order_materialList:OrderMaterialService, private router:Router) { }

  ngOnInit(): void {
    this.Order$=this.orderList.getAllOrders();
this.Material$=this.materialList.getAllMaterial();
this.Order_Status$=this.order_status.getAllOrder_Status();

   
  }
  addOrder_MaterialType(){
    this.order_materialList.addOrder_Material(this.addOrder_MaterialRequest).subscribe({
      next:(order_material)=>{
        this.router.navigate(['order_materiallist']);
      }
    })  }
}
