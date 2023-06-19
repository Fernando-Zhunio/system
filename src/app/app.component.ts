import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CreateHostDirective } from './shared/directives/create-host.directive';
import { SimpleSearchSelectorService } from './shared/standalone-components/simple-search/simple-search-selector.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body',
  template: `
  <router-outlet></router-outlet>
  <ng-template createHost></ng-template>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(CreateHostDirective, { static: true }) createHostDirective: CreateHostDirective;
  constructor(private router: Router, private chs: SimpleSearchSelectorService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  
  ngAfterViewInit(): void {
    this.setCreateHost();
  }

  setCreateHost(): void {
    this.chs.setCreateHostDirective(this.createHostDirective);
  }
}
