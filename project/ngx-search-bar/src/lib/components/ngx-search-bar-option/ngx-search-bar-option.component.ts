import { Component, ElementRef, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-search-bar-option',
  templateUrl: './ngx-search-bar-option.component.html',
  styleUrls: ['./ngx-search-bar-option.component.scss']
})
export class NgxSearchBarOptionComponent implements OnInit {

  @Input() disabled = false;
  @Input() value = null;
  previousSelectedValue: any;
  selected: any;
  constructor(private element: ElementRef) {
    this.selected = false;
    this.previousSelectedValue = this.selected;
  }
  onSelectionChange = new EventEmitter<NgxSearchBarSelectionChange>();


  ngOnInit() {
  }

  emitSelectionChangeEvent(isUserInput = false): void {
    console.log('emitSelectionChangeEvent');
    this.onSelectionChange.emit(new NgxSearchBarSelectionChange(this, isUserInput));
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    // if (this.selected !== this.previousSelectedValue) {
      // this.previousSelectedValue = this.selected;
      console.log('toggle');
      this.emitSelectionChangeEvent(true);
    // }
  }

  getLabel(): any {
    return this.element.nativeElement.textContent.trim();
  }

  getValue(): any {
    return this.value;
  }

  selectOption() {
    this.selected = true;
    this.toggle();
  }
}


export class NgxSearchBarSelectionChange {
  constructor(
    public source: NgxSearchBarOptionComponent,
    public isUserInput = false,
  ) { }
}
