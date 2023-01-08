import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';
import { MaterialService } from 'src/app/services/material.service';
import { OrderStatusService } from 'src/app/services/order-status.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  MaterialId$!: Observable<any[]>;
  Order_Status$!: Observable<any[]>;

  addOrderRequest: Order={
    id:'',
    date:'',
    quantity:0,
    materialid:'',
    order_statusid:''
  }
  constructor(private authenticationService:AuthenticationService, private order_StatusType:OrderStatusService, private materialType:MaterialService, private orderType:OrderService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.MaterialId$=this.materialType.getAllMaterial();
    this.Order_Status$=this.order_StatusType.getAllOrder_Status();

    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.orderType.getOrder(id).subscribe({
        next:(response)=>{
this.addOrderRequest=response;
        }
      });
    }
      }
    })
  }
    updateOrder(id:string){
      this.orderType.updateOrder(this.addOrderRequest.id,this.addOrderRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['offers']);
        }
      });
    }
    logout(): void {
      this.authenticationService.logout();
    }
  
  }

