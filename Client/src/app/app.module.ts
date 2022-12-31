import {TokenInterceptor} from './helpers/token.interceptor';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SecretComponent} from './secret/secret.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminSecretPageComponent} from './admin-secret-page/admin-secret-page.component';
import { OffersAddComponent } from './offers/offers-add/offers-add/offers-add.component';
import { MenuComponent } from './menu/menu.component';
import { CommonModule, DatePipe } from '@angular/common';
import { OffersListsComponent } from './offers/offers-lists/offers-lists.component';
import { EditOffersComponent } from './offers/offers-edit/edit-offers/edit-offers.component';
import { VehicleTypeAddComponent } from './vehicle_type/vehicle-type-add/vehicle-type-add.component';
import { VehicleTypeEditComponent } from './vehicle_type/vehicle-type-edit/vehicle-type-edit.component';
import { VehicleTypeListsComponent } from './vehicle_type/vehicle-type-lists/vehicle-type-lists.component';
import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { ClientListComponent } from './clients_model/client-list/client-list.component';
import { ClientsAddComponent } from './clients_model/clients-add/clients-add.component';
import { ClientEditComponent } from './clients_model/client-edit/client-edit.component';
import { ServiceAddComponent } from './service_model/service-add/service-add.component';
import { ServiceEditComponent } from './service_model/service-edit/service-edit.component';
import { ServiceListComponent } from './service_model/service-list/service-list.component';
import { ServiceOfferAddComponent } from './service_offer/service-offer-add/service-offer-add.component';
import { ServiceOfferEditComponent } from './service_offer/service-offer-edit/service-offer-edit.component';
import { ServiceOfferListComponent } from './service_offer/service-offer-list/service-offer-list.component';
import { MaterialAddComponent } from './material/material-add/material-add.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderMaterialAddComponent } from './order_material/order-material-add/order-material-add.component';
import { OrderMaterialEditComponent } from './order_material/order-material-edit/order-material-edit.component';
import { OrderMaterialListComponent } from './order_material/order-material-list/order-material-list.component';
import { MaterialOfferAddComponent } from './material_offer/material-offer-add/material-offer-add.component';
import { MaterialOfferEditComponent } from './material_offer/material-offer-edit/material-offer-edit.component';
import { MaterialOfferListComponent } from './material_offer/material-offer-list/material-offer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminSecretPageComponent,
    OffersAddComponent,
    MenuComponent,
    OffersListsComponent,
    EditOffersComponent,
    VehicleTypeAddComponent,
    VehicleTypeEditComponent,
    VehicleTypeListsComponent,
    VehicleAddComponent,
    VehicleEditComponent,
    VehicleListComponent,
    ClientListComponent,
    ClientsAddComponent,
    ClientEditComponent,
    ServiceAddComponent,
    ServiceEditComponent,
    ServiceListComponent,
    ServiceOfferAddComponent,
    ServiceOfferEditComponent,
    ServiceOfferListComponent,
    MaterialAddComponent,
    MaterialEditComponent,
    MaterialListComponent,
    OrderListComponent,
    OrderEditComponent,
    OrderMaterialAddComponent,
    OrderMaterialEditComponent,
    OrderMaterialListComponent,
    MaterialOfferAddComponent,
    MaterialOfferEditComponent,
    MaterialOfferListComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    
   
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
