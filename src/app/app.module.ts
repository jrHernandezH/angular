//Todo Importaciones fundamentales 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//? Importaciones de componentes
import { HeaderComponent } from './components/header/header.component';
import { HomeViewComponent } from './view/home-view/home-view.component';
import { ReadMoreComponent } from './view/read-more/read-more.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './view/sign-in/sign-in.component'
import { SignUpComponent } from './view/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './view/admin/admin.component';
import { ProductsComponent } from './components/products/products.component'

//? Importaciones de componentes de terceros
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'
import { MenubarModule} from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { ClientComponent } from './view/client/client.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeViewComponent,
    ReadMoreComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    AdminComponent,
    DashboardComponent,
    ProductsComponent,
    ClientComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    MenubarModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    MenuModule,
    AvatarModule,
    SplitButtonModule,
    DropdownModule,
    CarouselModule
  ],
  providers: [Title, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
