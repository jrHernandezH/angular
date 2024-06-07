import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL is '/admin' or starts with '/admin/'
        this.showHeader = !(event.urlAfterRedirects.startsWith('/admin') || event.urlAfterRedirects.startsWith('/client'));

      }
    });
  }
}
