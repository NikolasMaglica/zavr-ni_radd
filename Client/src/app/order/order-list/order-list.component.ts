import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  order$!:Observable<any[]>;
userList:any=[];

  orders:any;
  addVehicle_TypeRequest: Order={
    id:'',
  
  }
 
   
  
  constructor(private orderType:OrderService, private router:Router) { }

  ngOnInit(): void {
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

}
