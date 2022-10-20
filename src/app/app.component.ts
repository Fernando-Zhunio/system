import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body',
  template: `<ngx-loading-bar height="5px"></ngx-loading-bar>
  <router-outlet></router-outlet>
  <app-spinner-loader-file></app-spinner-loader-file>`,
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
