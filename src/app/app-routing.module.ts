import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions} from '@angular/router';
import { HomeViewComponent } from './view/home-view/home-view.component';
import { ReadMoreComponent } from './view/read-more/read-more.component';
import { SignInComponent } from './view/sign-in/sign-in.component';
import { SignUpComponent } from './view/sign-up/sign-up.component';
import { AdminComponent } from './view/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ClientComponent } from './view/client/client.component';
import { OrderComponent } from './components/order/order.component';
const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent
  },
  {
    path: 'readMore',
    component:ReadMoreComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'products', component: ProductsComponent}
    ]
  },
  {
    path: 'client',
    component: ClientComponent,
    children: [
      {path: '', component: ProductsComponent},
      {path: 'order', component:OrderComponent}
    ]
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
