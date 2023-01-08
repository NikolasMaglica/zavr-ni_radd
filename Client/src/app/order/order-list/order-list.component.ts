import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { MaterialService } from 'src/app/services/material.service';
import { OrderStatusService } from 'src/app/services/order-status.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  order$!:Observable<any[]>;
  MaterialList$!:Observable<any[]>;
  Order_StatusId$!:Observable<any[]>;
  MaterialTypesMap:Map<number, string> = new Map()
  Order_StatusTypesMap:Map<number, string> = new Map()
  materialList:any=[];
orderList:any=[];
  orders:any;
  addVehicle_TypeRequest: Order={
    id:'',
    date:'',
    quantity:0,
    materialid:'',
    order_statusid:''
  
  }
 
   
  
  constructor(private orderStatusService:OrderStatusService, private materialService:MaterialService, private orderType:OrderService, private router:Router) { }

  ngOnInit(): void {
    this.refreshMaterialMap();
    this.refreshOrder_StatusMap();

    this.order$=this.orderType.getAllOrders();
this.orderType.getAllOrders().subscribe({
  next:(orders)=>{
    this.orders=orders;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li narudžbu pod rednim brojem ${item.id} ?`)) {
      this.orderType.deleteOrder(item.id).subscribe(res => {
        
      this.order$ = this.orderType.getAllOrders();
      })
    }
  }

  refreshMaterialMap() {
    this.materialService.getAllMaterial().subscribe(data => {
      this.materialList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.MaterialTypesMap.set(this.materialList[i].id, this.materialList[i].name);
      }
    })
  }
  refreshOrder_StatusMap() {
    this.orderStatusService.getAllOrder_Status().subscribe(data => {
      this.orderList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.Order_StatusTypesMap.set(this.orderList[i].id, this.orderList[i].status);
      }
    })
  }

}
