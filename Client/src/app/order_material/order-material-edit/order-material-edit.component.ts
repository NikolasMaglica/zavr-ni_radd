import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order_Material } from 'src/app/models/order_material.model';
import { MaterialService } from 'src/app/services/material.service';
import { OrderMaterialService } from 'src/app/services/order-material.service';
import { OrderStatusService } from 'src/app/services/order-status.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-material-edit',
  templateUrl: './order-material-edit.component.html',
  styleUrls: ['./order-material-edit.component.css']
})
export class OrderMaterialEditComponent implements OnInit {
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
  constructor(private order_status:OrderStatusService, private materialList:MaterialService, private orderList:OrderService,private order_materialList:OrderMaterialService, private router:Router, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.Order$=this.orderList.getAllOrders();
    this.Material$=this.materialList.getAllMaterial();
    this.Order_Status$=this.order_status.getAllOrder_Status();
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.order_materialList.getOrder_Material(id).subscribe({
        next:(response)=>{
this.addOrder_MaterialRequest=response;
        }
      });
    }
      }
    })
  }
    updateOrder_Material(id:string){
      this.order_materialList.updateOrder_Material(this.addOrder_MaterialRequest.id,this.addOrder_MaterialRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['order_materiallist']);
        }
      });
    }
  
  }


