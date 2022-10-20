import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { CreateHostDirective } from '../../directives/create-host.directive';
import { CreateHostService } from '../../services/create-host.service';

@Component({
  standalone: true,
  imports: [CreateHostDirective],
  selector: 'app-spinner-loader-file',
  template: '<ng-template createHost></ng-template>',
})
export class SpinnerLoaderFileComponent implements OnDestroy, AfterViewInit  {

  @Input() show: boolean = true;
  @Input() percent: number = 0;
  @Input() text: string = "Descargando archivo";
  @ViewChild(CreateHostDirective, { static: true }) createHostDirective: CreateHostDirective;
  constructor(private chs: CreateHostService) { }
  ngOnDestroy(): void {
    this.chs.destroyComponent();
  }
  
  ngAfterViewInit(): void {
    this.chs.setCreateHostDirective(this.createHostDirective);
  }
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-spinner-loader-template-file',
  templateUrl: './spinner-loader-file.component.html',
  styleUrls: ['./spinner-loader-file.component.scss']
})
export class SpinnerLoaderFileTemplateComponent   {

  show: boolean = true;
  percent: number = 0;
  text: string = "Descargando archivo";
}
