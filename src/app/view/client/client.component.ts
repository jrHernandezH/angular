import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  showCart = false;

  toggleCart() {
    this.showCart = !this.showCart;
  }
  currentUser: User | null = null;
  items: MenuItem[] = [];
  userItems: MenuItem[] = [];

  constructor(private userS:UsersService, private router:Router, private title:Title){
    title.setTitle('Client')
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadNav();
  }

  loadCurrentUser(): void {
    this.userS.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
        console.log(user)
      },
      error => {
        console.error('Error al obtener el usuario actual:', error);
      }
    );
  }

  loadNav(){
    this.items = [
      { label: 'Productos', icon: 'pi pi-fw pi-home', routerLink: ['/client'] },
      { label: 'Pedidos', icon: 'pi pi-fw pi-briefcase', routerLink: ['/client/order'] },
    ];

    this.userItems = [
      { label: 'Your Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile'] },
      { label: 'Carrito', icon: 'pi pi-fw pi-shopping-cart', command: () => this.toggleCart() },
      { label: 'Sign out', icon: 'pi pi-fw pi-sign-out', command: () => this.signOut()}
    ];
  }
  signOut() {
    this.userS.clearUser();
    this.router.navigate([''])
  }
}
