import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MaterialService } from 'src/app/services/material.service';
import { OrderStatusService } from 'src/app/services/order-status.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

 
  MaterialId$!: Observable<any[]>;
  Order_StatusId$!: Observable<any[]>;

  
  addOrderRequest: Order={
    id:'',
    date:'',
    quantity:0,
    materialid:'',
    order_statusid:''
  }
  constructor(private snackBar: MatSnackBar,private order_statusService:OrderStatusService, private materialService:MaterialService, private orderService:OrderService, private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.MaterialId$=this.materialService.getAllMaterial();
    this.Order_StatusId$=this.order_statusService.getAllOrder_Status();

  
   
  }
  logout(): void {
    this.authenticationService.logout();
  }
  addOrder(){
    this.orderService.addOrder(this.addOrderRequest).subscribe(
      (result) => {     
          this.snackBar.open('Uspješan unos', 'Zatvori');
          this.router.navigate(['orderlist']);
      },
      (error: HttpErrorResponse) => {
               this.handleFailedAuthentication(error);

      }
  );
  }
  private handleFailedAuthentication(error: HttpErrorResponse): void {
    let errorsMessage = [];

    let validationErrorDictionary = JSON.parse(JSON.stringify(error.error.errors));
    for (let fieldName in validationErrorDictionary) {
      if (validationErrorDictionary.hasOwnProperty(fieldName)) {
        errorsMessage.push(validationErrorDictionary[fieldName]);
      }
    }
    this.snackBar.open(errorsMessage.join(' '), 'Zatvori');
  }

}
