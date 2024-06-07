import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mobileMenuOpen = false;
  mobileSubMenuOpen = false;

  menuItems = [
    {
      label: 'Product',
      items: [
        { label: 'Estadisticas', icon: 'pi pi-chart-line', routerLink: '/', fragment: 'analytics' },
        { label: 'Chat', icon: 'pi pi-comments', routerLink: '/', fragment: 'engagement' }
      ]
    },
    { label: 'Caracteristicas', routerLink: '/', fragment: 'features' },
    { label: 'Productos', routerLink: '/', fragment: 'marketplace' },
    { label: 'Sobre nosotros', routerLink: '/', fragment: 'company' }
  ];
}
