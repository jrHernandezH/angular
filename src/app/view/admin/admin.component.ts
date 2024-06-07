import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  currentUser: User | null = null;
  items: MenuItem[] = [];
  userItems: MenuItem[] = [];

  constructor(private userS:UsersService, private router:Router, private title:Title){
    title.setTitle('admin')
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
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
      { label: 'Productos', icon: 'pi pi-fw pi-users', routerLink: ['/admin/products'] },
      { label: 'Pedidos', icon: 'pi pi-fw pi-briefcase', routerLink: ['/projects'] },
    ];

    this.userItems = [
      { label: 'Your Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile'] },
      { label: 'Sign out', icon: 'pi pi-fw pi-sign-out', command: () => this.signOut()}
    ];
  }
  signOut() {
    this.userS.clearUser();
    this.router.navigate([''])
  }
}
