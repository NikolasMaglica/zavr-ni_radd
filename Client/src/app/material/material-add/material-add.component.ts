import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Material } from 'src/app/models/material.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private materialList:MaterialService, private router:Router) { }

  ngOnInit(): void {
  
   
  }
  logout(): void {
    this.authenticationService.logout();
  }
  addMaterial(){
    this.materialList.addMaterial(this.addMaterialRequest).subscribe(
      (result) => {     
          this.snackBar.open('Uspješan unos', 'Zatvori');
          this.router.navigate(['materiallist']);
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
