import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IStatus } from '../../../../interfaces/iorder';
@Component({
  selector: 'app-state-flow-order',
  templateUrl: './state-flow-order.component.html',
  styleUrls: ['./state-flow-order.component.scss']
})
export class StateFlowOrderComponent implements OnInit {

  constructor() { }
  @ViewChild('containerStatus') containerStatus: ElementRef;
  @Input() newStatus: string | null = null;
  @Input() statuses: IStatus[] = [
  ];
  ngOnInit() {
  }

  scrollBottom(): void {
    const widthScroll = this.containerStatus.nativeElement.scrollWidth;
    this.containerStatus.nativeElement.scrollTo({ left: widthScroll, top: 0, behavior: "smooth" });
  }
}
