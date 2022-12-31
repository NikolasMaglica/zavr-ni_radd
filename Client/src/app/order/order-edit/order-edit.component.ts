import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  addOrderRequest: Order={
    id:'',
  }
  constructor(private orderType:OrderService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
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
    updateVehicle_Type(id:string){
      this.orderType.updateOrder(this.addOrderRequest.id,this.addOrderRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['offers']);
        }
      });
    }
  
  }

