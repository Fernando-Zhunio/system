import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-fz',
  templateUrl: './header-fz.component.html',
  styleUrls: ['./header-fz.component.scss']
})
export class HeaderFzComponent  {

  constructor() { }
  @Output() isOpenOrCloseMenu = new EventEmitter<boolean>();

  openOrCloseMenu(): void {
    this.isOpenOrCloseMenu.emit(true);
  }
}
