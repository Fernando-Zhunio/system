import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-fz',
  templateUrl: './header-fz.component.html',
  styleUrls: ['./header-fz.component.scss']
})
export class HeaderFzComponent implements OnInit {

  constructor() { }
  @Output() isOpenOrCloseMenu = new EventEmitter<boolean>();

  ngOnInit() {
  }

  openOrCloseMenu(): void {
    this.isOpenOrCloseMenu.emit(true);
  }
}
